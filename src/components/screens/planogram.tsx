import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Save, Eye, Grid, Package, GripVertical } from "lucide-react";
import { cn } from "../ui/utils";

const products = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: "$999", image: "📱" },
  { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: "$799", image: "📱" },
  { id: 3, name: "MacBook Air", category: "Electronics", price: "$1299", image: "💻" },
  { id: 4, name: "AirPods Pro", category: "Electronics", price: "$249", image: "🎧" },
  { id: 5, name: "Nike Air Max", category: "Footwear", price: "$129", image: "👟" },
  { id: 6, name: "Adidas Ultraboost", category: "Footwear", price: "$159", image: "👟" },
  { id: 7, name: "Levi's Jeans", category: "Clothing", price: "$79", image: "👖" },
  { id: 8, name: "H&M T-Shirt", category: "Clothing", price: "$19", image: "👕" },
];

const floorZones = [
  { id: 'A1', name: 'Electronics - Left', x: 50, y: 100, width: 150, height: 100 },
  { id: 'A2', name: 'Electronics - Right', x: 250, y: 100, width: 150, height: 100 },
  { id: 'B1', name: 'Clothing - Front', x: 50, y: 250, width: 200, height: 120 },
  { id: 'B2', name: 'Footwear', x: 300, y: 250, width: 150, height: 120 },
  { id: 'C1', name: 'Accessories', x: 150, y: 400, width: 180, height: 80 },
];

export function Planogram() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [placements, setPlacements] = useState<Record<string, typeof products[0]>>({});
  const [draggedProduct, setDraggedProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (product: typeof products[0]) => {
    setDraggedProduct(product);
  };

  const handleDrop = (zoneId: string) => {
    if (draggedProduct) {
      setPlacements(prev => ({
        ...prev,
        [zoneId]: draggedProduct
      }));
      setDraggedProduct(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Digital Shelf / Planogram</h2>
          <p className="text-muted-foreground">Design and manage store layout and product placement</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview in Graph
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Layout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[600px]">
        {/* Left Panel - Product List */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Products</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)] overflow-y-auto">
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    draggable
                    onDragStart={() => handleDragStart(product)}
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      "p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-colors",
                      selectedProduct?.id === product.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{product.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                        <p className="text-xs font-medium">{product.price}</p>
                      </div>
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Canvas - Floor Plan */}
        <div className="col-span-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Store Floor Plan</CardTitle>
              <p className="text-sm text-muted-foreground">Drag products from the left panel to place them in zones</p>
            </CardHeader>
            <CardContent className="h-[calc(100%-100px)]">
              <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden">
                {/* Floor Plan Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
                
                {/* Store Zones */}
                {floorZones.map((zone) => (
                  <div
                    key={zone.id}
                    onDrop={() => handleDrop(zone.id)}
                    onDragOver={handleDragOver}
                    className={cn(
                      "absolute border-2 border-dashed rounded-lg transition-colors",
                      placements[zone.id] 
                        ? "border-primary bg-primary/10" 
                        : "border-gray-300 bg-white/50 hover:border-primary/50"
                    )}
                    style={{
                      left: `${zone.x}px`,
                      top: `${zone.y}px`,
                      width: `${zone.width}px`,
                      height: `${zone.height}px`,
                    }}
                  >
                    <div className="p-2 h-full flex flex-col">
                      <div className="text-xs font-medium text-gray-600 mb-2">
                        {zone.id} - {zone.name}
                      </div>
                      
                      {placements[zone.id] && (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-1">{placements[zone.id].image}</div>
                            <div className="text-xs font-medium">{placements[zone.id].name}</div>
                            <div className="text-xs text-muted-foreground">{placements[zone.id].price}</div>
                          </div>
                        </div>
                      )}
                      
                      {!placements[zone.id] && (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <Package className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <div className="text-xs">Drop product here</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Product Details */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              {selectedProduct ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{selectedProduct.image}</div>
                    <h3 className="font-semibold">{selectedProduct.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {selectedProduct.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Price</label>
                      <p className="text-lg font-bold text-primary">{selectedProduct.price}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Current Placement</label>
                      <p className="text-sm text-muted-foreground">
                        {Object.entries(placements).find(([_, product]) => product.id === selectedProduct.id)?.[0] || 'Not placed'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Placement Info</label>
                      <p className="text-sm text-muted-foreground">
                        Drag this product to any zone on the floor plan to place it.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        // Remove from all placements
                        setPlacements(prev => {
                          const newPlacements = { ...prev };
                          Object.keys(newPlacements).forEach(key => {
                            if (newPlacements[key].id === selectedProduct.id) {
                              delete newPlacements[key];
                            }
                          });
                          return newPlacements;
                        });
                      }}
                    >
                      Remove from Floor Plan
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                  <div>
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a product to view details</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}