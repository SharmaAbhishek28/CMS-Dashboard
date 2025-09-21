import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Eye, Plus, QrCode, BarChart3, Grid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RetailersProps {
  onAddRetailer: () => void;
}

const retailers = [
  {
    id: 1,
    name: "TechMart",
    country: "United States",
    dateAdded: "2024-09-15",
    stores: 47,
    products: 2847,
    status: "Active"
  },
  {
    id: 2,
    name: "FashionPlus",
    country: "Canada",
    dateAdded: "2024-08-22",
    stores: 23,
    products: 1456,
    status: "Active"
  },
  {
    id: 3,
    name: "SportZone",
    country: "United Kingdom", 
    dateAdded: "2024-08-10",
    stores: 34,
    products: 987,
    status: "Active"
  },
  {
    id: 4,
    name: "HomeDecor Co",
    country: "Australia",
    dateAdded: "2024-07-28",
    stores: 18,
    products: 756,
    status: "Pending"
  },
  {
    id: 5,
    name: "ElectroHub",
    country: "Germany",
    dateAdded: "2024-07-15",
    stores: 52,
    products: 3241,
    status: "Active"
  }
];

export function Retailers({ onAddRetailer }: RetailersProps) {
  const [viewMode, setViewMode] = useState<'table' | 'graph'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filteredRetailers = retailers.filter(retailer => {
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || retailer.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const countries = [...new Set(retailers.map(r => r.country))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Retailers</h2>
          <p className="text-muted-foreground">Manage your retail partners and their data</p>
        </div>
        <Button onClick={onAddRetailer} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Retailer
        </Button>
      </div>

      {/* Filters & Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search retailers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'graph' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('graph')}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>Retailers List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Retailer Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead># Stores</TableHead>
                  <TableHead># Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRetailers.map((retailer) => (
                  <TableRow key={retailer.id}>
                    <TableCell className="font-medium">{retailer.name}</TableCell>
                    <TableCell>{retailer.country}</TableCell>
                    <TableCell>{retailer.dateAdded}</TableCell>
                    <TableCell>{retailer.stores}</TableCell>
                    <TableCell>{retailer.products.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={retailer.status === 'Active' ? 'default' : 'secondary'}
                        className={retailer.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {retailer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Retailers Graph View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Graph visualization would be implemented here</p>
                <p className="text-sm">Showing retailer distribution and metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}