import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Bruiloft from "./pages/Bruiloft";
import Bedrijfsfeesten from "./pages/Bedrijfsfeesten";
import Studentenfeesten from "./pages/Studentenfeesten";
import Prive from "./pages/Prive";
import SocialProofPopup from "./components/SocialProofPopup";
import AnnouncementBanner from "./components/AnnouncementBanner";
import PushNotificationPrompt from "./components/PushNotificationPrompt";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/bruiloft"} component={Bruiloft} />
      <Route path={"/bedrijfsfeesten"} component={Bedrijfsfeesten} />
      <Route path={"/studentenfeesten"} component={Studentenfeesten} />
      <Route path={"/prive"} component={Prive} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <AnnouncementBanner />
          <Toaster />
          <Router />
          <SocialProofPopup />
          <PushNotificationPrompt />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
