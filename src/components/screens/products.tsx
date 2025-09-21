import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Search, Plus, Grid, List, Package, Tag, DollarSign, MapPin } from "lucide-react";
import { cn } from "../ui/utils";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: "$999",
    image: "📱",
    category: "Electronics",
    placement: "Zone A1",
    sku: "IPH15P-128",
    stock: 45
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: "$799",
    image: "📱",
    category: "Electronics", 
    placement: "Zone A2",
    sku: "SGS24-256",
    stock: 32
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: "$1299",
    image: "💻",
    category: "Electronics",
    placement: "Zone A1",
    sku: "MBA-M3-512",
    stock: 18
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: "$249",
    image: "🎧",
    category: "Electronics",
    placement: "Zone A2",
    sku: "APP-2ND",
    stock: 67
  },
  {
    id: 5,
    name: "Nike Air Max 270",
    price: "$129",
    image: "👟",
    category: "Footwear",
    placement: "Zone B2",
    sku: "NAM270-9",
    stock: 23
  },
  {
    id: 6,
    name: "Adidas Ultraboost 22",
    price: "$159",
    image: "👟",
    category: "Footwear",
    placement: "Zone B2",
    sku: "AUB22-10",
    stock: 19
  },
  {
    id: 7,
    name: "Levi's 501 Jeans",
    price: "$79",
    image: "👖",
    category: "Clothing",
    placement: "Zone B1",
    sku: "LEV501-32",
    stock: 41
  },
  {
    id: 8,
    name: "H&M Cotton T-Shirt",
    price: "$19",
    image: "👕",
    category: "Clothing",
    placement: "Zone B1",
    sku: "HM-TEE-M",
    stock: 89
  }
];

const categories = [
  { name: "Electronics", count: 4, color: "bg-blue-100 text-blue-800" },
  { name: "Footwear", count: 2, color: "bg-green-100 text-green-800" },
  { name: "Clothing", count: 2, color: "bg-purple-100 text-purple-800" },
];

export function Products() {
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-muted-foreground">TechMart</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-muted-foreground">Downtown Store</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories & Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Categories & Products</h2>
          <p className="text-muted-foreground">Manage product catalog and category organization</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Active in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Product categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$347</div>
            <p className="text-xs text-muted-foreground">Across all products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placed Products</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">100% placement rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div 
                key={category.name}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-colors",
                  selectedCategory === category.name 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:bg-accent"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{category.name}</h3>
                  <Badge className={category.color}>
                    {category.count} products
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters & Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:bg-accent rounded-full p-1"
                  >
                    ×
                  </button>
                </Badge>
              )}
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
                variant={viewMode === 'gallery' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('gallery')}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Content */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Placement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.price}</TableCell>
                    <TableCell>
                      <Badge className={categories.find(c => c.name === product.category)?.color}>
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.placement}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
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
            <CardTitle>Products Gallery ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <div className="text-4xl mb-2">{product.image}</div>
                      <h3 className="font-medium text-sm">{product.name}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <Badge className={categories.find(c => c.name === product.category)?.color}>
                          {product.category}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <p>SKU: {product.sku}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Placement: {product.placement}</p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Edit Product
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}