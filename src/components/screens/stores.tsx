import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Plus, MapPin, Building2, Package, Calendar } from "lucide-react";

interface StoresProps {
  onScreenChange: (screen: string) => void;
}

const stores = [
  {
    id: "ST001",
    name: "TechMart Downtown",
    location: "123 Main St, New York, NY",
    floors: 3,
    categories: 8,
    products: 1247,
    dateAdded: "2024-08-15",
    status: "Active"
  },
  {
    id: "ST002", 
    name: "FashionPlus Mall",
    location: "456 Shopping Blvd, Los Angeles, CA",
    floors: 2,
    categories: 12,
    products: 2156,
    dateAdded: "2024-08-10",
    status: "Active"
  },
  {
    id: "ST003",
    name: "SportZone Express",
    location: "789 Sports Ave, Chicago, IL",
    floors: 1,
    categories: 6,
    products: 845,
    dateAdded: "2024-07-22",
    status: "Active"
  },
  {
    id: "ST004",
    name: "HomeDecor Outlet",
    location: "321 Decor St, Miami, FL",
    floors: 2,
    categories: 10,
    products: 1678,
    dateAdded: "2024-07-18",
    status: "Setup"
  },
  {
    id: "ST005",
    name: "ElectroHub Central",
    location: "654 Tech Park, Seattle, WA",
    floors: 4,
    categories: 15,
    products: 3429,
    dateAdded: "2024-06-30",
    status: "Active"
  }
];

export function Stores({ onScreenChange }: StoresProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Stores</h2>
          <p className="text-muted-foreground">Manage store locations and their configurations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Store
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">Across all retailers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.filter(s => s.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.products, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Categories</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stores.reduce((sum, store) => sum + store.categories, 0) / stores.length)}
            </div>
            <p className="text-xs text-muted-foreground">Per store</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search stores..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stores List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Floors</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.id}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{store.location}</TableCell>
                  <TableCell>{store.floors}</TableCell>
                  <TableCell>{store.categories}</TableCell>
                  <TableCell>{store.products.toLocaleString()}</TableCell>
                  <TableCell>{store.dateAdded}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={store.status === 'Active' ? 'default' : 'secondary'}
                      className={store.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {store.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onScreenChange('planogram')}
                    >
                      View Planogram
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}