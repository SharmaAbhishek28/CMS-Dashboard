import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { TopBar } from "./components/top-bar";
import { AddRetailerModal } from "./components/add-retailer-modal";
import { DashboardOverview } from "./components/screens/dashboard-overview";
import { Retailers } from "./components/screens/retailers";
import { Stores } from "./components/screens/stores";
import { Planogram } from "./components/screens/planogram";
import { Products } from "./components/screens/products";
import { Configurations } from "./components/screens/configurations";

const screenTitles = {
  overview: "Dashboard Overview",
  retailers: "Retailers",
  stores: "Stores", 
  products: "Categories & Products",
  planogram: "Digital Shelf / Planogram",
  configurations: "Configurations",
  settings: "Settings",
  help: "Help & Documentation",
  logout: "Logout"
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState('overview');
  const [isAddRetailerModalOpen, setIsAddRetailerModalOpen] = useState(false);

  const handleScreenChange = (screen: string) => {
    if (screen === 'logout') {
      // Handle logout logic
      console.log('Logout clicked');
      return;
    }
    setActiveScreen(screen);
  };

  const handleAddRetailer = () => {
    setIsAddRetailerModalOpen(true);
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'overview':
        return <DashboardOverview onAddRetailer={handleAddRetailer} />;
      case 'retailers':
        return <Retailers onAddRetailer={handleAddRetailer} />;
      case 'stores':
        return <Stores onScreenChange={setActiveScreen} />;
      case 'products':
        return <Products />;
      case 'planogram':
        return <Planogram />;
      case 'configurations':
        return <Configurations />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-muted-foreground">Configure your CMS preferences and account settings</p>
            </div>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">⚙️</div>
                <p>Settings panel would be implemented here</p>
                <p className="text-sm">Account preferences, API keys, notifications, etc.</p>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Help & Documentation</h2>
              <p className="text-muted-foreground">Find answers and learn how to use RetailVision CMS</p>
            </div>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p>Help documentation would be implemented here</p>
                <p className="text-sm">User guides, API docs, video tutorials, FAQ</p>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardOverview onAddRetailer={handleAddRetailer} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeScreen={activeScreen}
        onScreenChange={handleScreenChange}
        onAddRetailer={handleAddRetailer}
      />

      {/* Top Bar */}
      <TopBar title={screenTitles[activeScreen as keyof typeof screenTitles] || "Dashboard"} />

      {/* Main Content */}
      <main className="ml-[260px] mt-16 p-6">
        {renderActiveScreen()}
      </main>

      {/* Add Retailer Modal */}
      <AddRetailerModal 
        isOpen={isAddRetailerModalOpen}
        onClose={() => setIsAddRetailerModalOpen(false)}
      />
    </div>
  );
}