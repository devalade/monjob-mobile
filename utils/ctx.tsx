import React, { useState } from 'react';
import { useStorageState } from './use-storage-state';
import { router } from 'expo-router';

const AuthContext = React.createContext<{
  signIn: (data: Record<string, any>) => void;
  signUp: (data: Record<string, any>) => void;
  signOut: () => void;
  session?: string | null;
  errors: any;
  isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [errors, setErrors] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: (data) => {
          fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
          })
            .then((res) => {
              setSession('auth');
              router.push('/(app)/(tabs)/');
            })
            .catch((e) => {
              setErrors(e);
            });
        },
        signUp: (data) => {
          fetch('http://localhost:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
          })
            .then((res) => {
              setSession('auth');
              router.push('/(app)/(tabs)/');
            })
            .catch((e) => {
              setErrors(e);
            });
        },
        signOut: () => {
          fetch('http://localhost:8000/api/logout', {
            method: 'POST',
          })
            .then(() => {
              setSession(null);
            })
            .catch((e) => {
              setErrors(e);
            });
        },
        errors,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
