
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ConfirmEmail from "./pages/ConfirmEmail";
import Setup2FA from "./pages/Setup2FA";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import Livestream from "./pages/Livestream";
import LivestreamWatch from "./pages/LivestreamWatch";
import StreamerProfile from "./pages/StreamerProfile";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/setup-2fa" element={<Setup2FA />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/livestream-watch" element={<LivestreamWatch />} />
          <Route path="/streamer-profile" element={<StreamerProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
