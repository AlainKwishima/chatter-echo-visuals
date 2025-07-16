import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ChatApplication } from "./components/ChatApplication";
import Groups from "./pages/Groups";
import Favourites from "./pages/Favourites";
import Calls from "./pages/Calls";
import Files from "./pages/Files";
import Settings from "./pages/Settings";
import VideoCall from "./pages/VideoCall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatApplication />} />
          <Route path="/groups" element={<Layout><Groups /></Layout>} />
          <Route path="/favourites" element={<Layout><Favourites /></Layout>} />
          <Route path="/calls" element={<Layout><Calls /></Layout>} />
          <Route path="/files" element={<Layout><Files /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/video-call" element={<Layout><VideoCall /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
