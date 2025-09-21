import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { 
  LayoutDashboard, 
  Store, 
  Building2, 
  Package, 
  Grid3X3, 
  Settings, 
  HelpCircle, 
  LogOut,
  Plus
} from "lucide-react";

interface SidebarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  onAddRetailer: () => void;
}

const navigationItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'retailers', label: 'Retailers', icon: Store },
  { id: 'stores', label: 'Stores', icon: Building2 },
  { id: 'products', label: 'Categories & Products', icon: Package },
  { id: 'planogram', label: 'Digital Shelf / Planogram', icon: Grid3X3 },
  { id: 'configurations', label: 'Configurations', icon: Settings },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help / Docs', icon: HelpCircle },
  { id: 'logout', label: 'Logout', icon: LogOut },
];

export function Sidebar({ activeScreen, onScreenChange, onAddRetailer }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-[260px] bg-muted border-r border-border flex flex-col">
      {/* Logo & Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Grid3X3 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">RetailVision CMS</span>
        </div>
        
        <Button 
          onClick={onAddRetailer}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Retailer
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Items */}
      <div className="p-3 border-t border-border">
        <nav className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className="w-full flex items-center px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}