import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from '../config';

// Storage abstraction: try React Native AsyncStorage, fallback to browser localStorage
let AsyncStorageImpl = null;
try {
  // require is used so bundlers that don't have the package won't crash until runtime
  // (install @react-native-async-storage/async-storage for native apps)
  // eslint-disable-next-line global-require
  AsyncStorageImpl = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorageImpl = null;
}

const STORAGE_KEY = 'AUTH_TOKEN';

const storageGet = async (key) => {
  if (AsyncStorageImpl) return AsyncStorageImpl.getItem(key);
  if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
  return null;
};

const storageSet = async (key, value) => {
  if (AsyncStorageImpl) return AsyncStorageImpl.setItem(key, value);
  if (typeof localStorage !== 'undefined') return localStorage.setItem(key, value);
  return null;
};

const storageRemove = async (key) => {
  if (AsyncStorageImpl) return AsyncStorageImpl.removeItem(key);
  if (typeof localStorage !== 'undefined') return localStorage.removeItem(key);
  return null;
};

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  clearToken: () => {},
  authFetch: async () => {},
  login: async () => {},
  register: async () => {},
  getProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const clearToken = () => setToken(null);

  useEffect(() => {
    // load persisted token (if any) when provider mounts
    (async () => {
      try {
        const t = await storageGet(STORAGE_KEY);
        if (t) setToken(t);
      } catch (e) {
        // ignore load errors
      }
    })();
  }, []);

  const authFetch = async (pathOrUrl, init = {}) => {
    const url = typeof pathOrUrl === 'string' && pathOrUrl.startsWith('http') ? pathOrUrl : `${BASE_URL}${pathOrUrl}`;
    const headers = init.headers ? { ...init.headers } : {};

    // ensure we have a token; if not in memory, try to load from storage
    let effectiveToken = token;
    if (!effectiveToken) {
      try {
        effectiveToken = await storageGet(STORAGE_KEY);
        if (effectiveToken) setToken(effectiveToken);
      } catch (e) {
        // ignore storage read errors
      }
    }

    // attach bearer token when available
    if (effectiveToken) headers['Authorization'] = `Bearer ${effectiveToken}`;

    // if body is an object and not FormData, stringify and set content-type
    let body = init.body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
      try {
        body = JSON.stringify(body);
      } catch (e) {
        // leave body as-is if stringify fails
      }
    } else if (body && typeof body === 'string') {
      // caller already stringified the body (e.g. JSON.stringify);
      // ensure we still send the content-type so server accepts JSON
      if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
    }

    // debug logging (dev only) — show method and whether Authorization present
    if (typeof __DEV__ !== 'undefined' ? __DEV__ : true) {
      try {
        console.log('authFetch ->', init.method || 'GET', url, 'Authorization=', headers['Authorization'] ? 'yes' : 'no');
        // also log content-type for debugging
        console.log('  Content-Type=', headers['Content-Type'] || 'none');
      } catch (e) {}
    }

    const response = await fetch(url, { ...init, headers, body });

    // auto-logout on 401 to keep client state consistent
    if (response.status === 401) {
      // clear stored token
      try {
        await storageRemove(STORAGE_KEY);
      } catch (e) {}
      setToken(null);
    }

    return response;
  };

  const login = async (email, password) => {
    const res = await authFetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.token) {
      setToken(data.token);
      try {
        await storageSet(STORAGE_KEY, data.token);
      } catch (e) {
        // ignore storage errors
      }
    }
    return { ok: res.ok, data };
  };

  const register = async (payload) => {
    const res = await authFetch('/api/auth/register', { method: 'POST', body: payload });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  };

  const logout = async () => {
    setToken(null);
    try {
      await storageRemove(STORAGE_KEY);
    } catch (e) {}
  };

  const getProfile = async () => {
    const res = await authFetch('/api/auth/profile');
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, authFetch, login, register, getProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
