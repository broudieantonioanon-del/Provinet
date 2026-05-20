import { useIpFilter } from '@/hooks/useIpFilter';
import { Navigate } from 'react-router-dom';

export default function IpFilterGuard({ children }) {
  const status = useIpFilter();

  if (status === 'loading') return <div style={{ position: 'fixed', inset: 0, background: '#fff' }} />;
  if (status === 'blocked') return <Navigate to="/rio-provincial" replace />;
  return children;
}
