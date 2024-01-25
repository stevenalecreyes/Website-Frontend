import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../userContext';

export default function Logout() {
  const { unsetUser } = useUser();

  useEffect(() => {
    unsetUser();
  }, [unsetUser]);

  return <Navigate to="/login" />;
}
