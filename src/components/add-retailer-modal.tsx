import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, ChevronLeft, ChevronRight, Database, FileSpreadsheet, Cloud, Zap } from "lucide-react";
import { cn } from "./ui/utils";

interface AddRetailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: "Retailer Details", description: "Basic information" },
  { id: 2, title: "ERP/Connector Setup", description: "Data source configuration" },
  { id: 3, title: "Data Mapper", description: "Field mapping" },
  { id: 4, title: "Store Linking", description: "Associate stores" },
  { id: 5, title: "Review & Confirm", description: "Final review" }
];

const connectors = [
  { id: 'sheets', name: 'Google Sheets', icon: FileSpreadsheet, description: 'Connect to Google Sheets' },
  { id: 'bigquery', name: 'BigQuery', icon: Database, description: 'Google BigQuery integration' },
  { id: 'aws', name: 'AWS', icon: Cloud, description: 'Amazon Web Services' },
  { id: 'firebase', name: 'Firebase', icon: Zap, description: 'Firebase Realtime Database' }
];

const sourceColumns = ['product_name', 'price', 'category', 'brand', 'sku', 'description'];
const cmsFields = ['Product Name', 'Price', 'Category', 'Brand', 'SKU', 'Description'];

const availableStores = [
  'TechMart Downtown', 'TechMart Mall', 'TechMart Express', 'TechMart Outlet'
];

export function AddRetailerModal({ isOpen, onClose }: AddRetailerModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    retailerName: '',
    adminEmail: '',
    metadata: '',
    selectedConnector: '',
    apiKey: '',
    mappings: {} as Record<string, string>,
    selectedStores: [] as string[]
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Handle completion
    onClose();
    setCurrentStep(1);
    setFormData({
      retailerName: '',
      adminEmail: '',
      metadata: '',
      selectedConnector: '',
      apiKey: '',
      mappings: {},
      selectedStores: []
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="retailer">Retailer Name</Label>
              <Select value={formData.retailerName} onValueChange={(value) => setFormData({...formData, retailerName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select retailer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techmart">TechMart</SelectItem>
                  <SelectItem value="fashionplus">FashionPlus</SelectItem>
                  <SelectItem value="sportzone">SportZone</SelectItem>
                  <SelectItem value="homedecor">HomeDecor Co</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@retailer.com"
                value={formData.adminEmail}
                onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metadata">Metadata</Label>
              <Input 
                id="metadata" 
                placeholder="Additional information"
                value={formData.metadata}
                onChange={(e) => setFormData({...formData, metadata: e.target.value})}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-4">Choose your data connector</h3>
              <div className="grid grid-cols-2 gap-4">
                {connectors.map((connector) => {
                  const Icon = connector.icon;
                  return (
                    <Card 
                      key={connector.id}
                      className={cn(
                        "cursor-pointer transition-colors hover:bg-accent",
                        formData.selectedConnector === connector.id && "border-primary bg-primary/5"
                      )}
                      onClick={() => setFormData({...formData, selectedConnector: connector.id})}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-medium">{connector.name}</h4>
                        <p className="text-sm text-muted-foreground">{connector.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            {formData.selectedConnector && (
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key / Connection String</Label>
                <Input 
                  id="apiKey" 
                  type="password"
                  placeholder="Enter your API key"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Map your data fields</h3>
            <p className="text-sm text-muted-foreground">Drag source columns to CMS fields or use the dropdowns</p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-3">Source Columns</h4>
                <div className="space-y-2">
                  {sourceColumns.map((column) => (
                    <div key={column} className="p-3 bg-accent rounded-lg text-sm">
                      {column}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">CMS Fields</h4>
                <div className="space-y-2">
                  {cmsFields.map((field, index) => (
                    <div key={field} className="space-y-1">
                      <Label className="text-sm">{field}</Label>
                      <Select 
                        value={formData.mappings[field] || ''} 
                        onValueChange={(value) => setFormData({
                          ...formData, 
                          mappings: {...formData.mappings, [field]: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source column" />
                        </SelectTrigger>
                        <SelectContent>
                          {sourceColumns.map((column) => (
                            <SelectItem key={column} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Link stores</h3>
            <p className="text-sm text-muted-foreground">Select which stores this retailer should be associated with</p>
            
            <div className="space-y-2">
              {availableStores.map((store) => (
                <label key={store} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selectedStores.includes(store)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, selectedStores: [...formData.selectedStores, store]});
                      } else {
                        setFormData({...formData, selectedStores: formData.selectedStores.filter(s => s !== store)});
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span>{store}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review & Confirm</h3>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Retailer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><span className="font-medium">Name:</span> {formData.retailerName}</p>
                  <p><span className="font-medium">Email:</span> {formData.adminEmail}</p>
                  <p><span className="font-medium">Metadata:</span> {formData.metadata}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Connector</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{connectors.find(c => c.id === formData.selectedConnector)?.name}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Field Mappings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {Object.entries(formData.mappings).map(([field, source]) => (
                    <p key={field} className="text-sm">
                      <span className="font-medium">{field}:</span> {source}
                    </p>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Linked Stores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{formData.selectedStores.join(', ')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Retailer</DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep > step.id 
                      ? "bg-primary text-primary-foreground" 
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 h-0.5 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="py-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <Button onClick={handleFinish} className="bg-primary hover:bg-primary/90">
              Finish & Add Retailer
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}