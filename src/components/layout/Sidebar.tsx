
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Activity, 
  Coins, 
  Users, 
  Settings, 
  Calendar, 
  ListOrdered,
  Shield, 
  Bell, 
  FileText, 
  FileMinus,
  Settings as SettingsIcon,
  BarChart,
  HelpCircle
} from "lucide-react";
import { useSidebar } from "../sidebar/SidebarContext";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ElementType;
}

interface SubNavItemProps {
  to: string;
  label: string;
  parentOpen: boolean;
}

const NavItem = ({ to, label, icon: Icon }: NavItemProps) => {
  const { isSidebarOpen } = useSidebar();
  
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center py-3 px-4 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-primary" 
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
          !isSidebarOpen && "justify-center"
        )
      }
    >
      <Icon size={20} className="min-w-[20px]" />
      {isSidebarOpen && <span className="ml-3">{label}</span>}
    </NavLink>
  );
};

const SubNavItem = ({ to, label, parentOpen }: SubNavItemProps) => {
  const { isSidebarOpen } = useSidebar();
  
  if (!isSidebarOpen || !parentOpen) return null;
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center py-2 px-4 pl-10 rounded-md transition-colors text-sm",
          isActive 
            ? "bg-sidebar-accent/70 text-primary" 
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
        )
      }
    >
      {label}
    </NavLink>
  );
};

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  const [cmsMenuOpen, setCmsMenuOpen] = React.useState(false);
  
  const toggleCmsMenu = () => {
    setCmsMenuOpen(!cmsMenuOpen);
  };
  
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar overflow-y-auto transition-all duration-300 ease-in-out z-30 border-r border-border/20",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4">
        <nav className="space-y-1">
          <NavItem to="/" label="Dashboard" icon={Activity} />
          <NavItem to="/token-management" label="Token Management" icon={Coins} />
          <NavItem to="/investor-management" label="Investors" icon={Users} />
          <NavItem to="/ico-settings" label="ICO Settings" icon={Settings} />
          <NavItem to="/transaction-history" label="Transactions" icon={ListOrdered} />
          <NavItem to="/security-settings" label="Security" icon={Shield} />
          <NavItem to="/campaign-management" label="Campaigns" icon={Calendar} />
          <NavItem to="/notifications" label="Notifications" icon={Bell} />
          <NavItem to="/kyc-management" label="KYC/AML" icon={FileText} />
          <NavItem to="/legal-compliance" label="Legal" icon={FileMinus} />
          
          {/* CMS Menu Item */}
          <div className="relative">
            <button
              onClick={toggleCmsMenu}
              className={cn(
                "flex items-center w-full py-3 px-4 rounded-md transition-colors",
                cmsMenuOpen 
                  ? "bg-sidebar-accent text-primary" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                !isSidebarOpen && "justify-center"
              )}
            >
              <BarChart size={20} className="min-w-[20px]" />
              {isSidebarOpen && (
                <>
                  <span className="ml-3">CMS</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={cn("ml-auto transition-transform", cmsMenuOpen && "transform rotate-180")}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </>
              )}
            </button>
            
            {/* CMS Submenu */}
            <div className={cn("pl-2 mt-1 space-y-1", !cmsMenuOpen && "hidden")}>
              <SubNavItem to="/cms/tokenomics" label="Tokenomics" parentOpen={cmsMenuOpen} />
              <SubNavItem to="/cms/roadmap" label="Roadmap" parentOpen={cmsMenuOpen} />
              <SubNavItem to="/cms/faq" label="FAQ" parentOpen={cmsMenuOpen} />
            </div>
          </div>
          
          <NavItem to="/settings" label="Settings" icon={SettingsIcon} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
