
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/sidebar/SidebarContext";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { CmcProvider } from "./contexts/CmcContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TokenManagement from "./pages/TokenManagement";
import InvestorManagement from "./pages/InvestorManagement";
import IcoSettings from "./pages/IcoSettings";
import TransactionHistory from "./pages/TransactionHistory";
import SecuritySettings from "./pages/SecuritySettings";
import CampaignManagement from "./pages/CampaignManagement";
import Notifications from "./pages/Notifications";
import KycManagement from "./pages/KycManagement";
import LegalCompliance from "./pages/LegalCompliance";
import Settings from "./pages/Settings";
import TokenomicsAdmin from "./pages/cms/TokenomicsAdmin";
import RoadmapAdmin from "./pages/cms/RoadmapAdmin";
import FaqAdmin from "./pages/cms/FaqAdmin";
import DividendAirdrop from "./pages/airdrop/DividendAirdrop";
import InstantAirdrop from "./pages/airdrop/InstantAirdrop";
import TokenomicsPage from "./pages/landing/Tokenomics";
import RoadmapPage from "./pages/landing/Roadmap";
import FaqPage from "./pages/landing/Faq";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <CmcProvider>
              <SidebarProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  
                  {/* Public Landing Pages */}
                  <Route path="/tokenomics" element={<TokenomicsPage />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  
                  {/* Protected Admin Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="token-management" element={<TokenManagement />} />
                      <Route path="investor-management" element={<InvestorManagement />} />
                      <Route path="ico-settings" element={<IcoSettings />} />
                      <Route path="transaction-history" element={<TransactionHistory />} />
                      <Route path="security-settings" element={<SecuritySettings />} />
                      <Route path="campaign-management" element={<CampaignManagement />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="kyc-management" element={<KycManagement />} />
                      <Route path="legal-compliance" element={<LegalCompliance />} />
                      
                      {/* Airdrop Pages */}
                      <Route path="airdrop/dividend" element={<DividendAirdrop />} />
                      <Route path="airdrop/instant" element={<InstantAirdrop />} />
                      
                      {/* CMS Menu Pages */}
                      <Route path="cms/tokenomics" element={<TokenomicsAdmin />} />
                      <Route path="cms/roadmap" element={<RoadmapAdmin />} />
                      <Route path="cms/faq" element={<FaqAdmin />} />
                      
                      <Route path="settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Route>
                </Routes>
              </SidebarProvider>
            </CmcProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
