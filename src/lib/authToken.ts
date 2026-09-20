const TOKEN_KEY = "shagriha.accessToken";
const IDENTITY_KEY = "shagriha.identity";

let accessToken: string | null = null;

export type StoredAuthIdentity = {
  userId: string;
  username?: string;
};

export const getAccessToken = () => {
  if (!accessToken && typeof window !== "undefined") {
    accessToken = window.localStorage.getItem(TOKEN_KEY);
  }
  if (accessToken && isExpired(accessToken)) {
    accessToken = null;
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(IDENTITY_KEY);
    }
  }
  return accessToken;
};

function isExpired(token: string) {
  const expiresAt = getAccessTokenExpiration(token);
  return expiresAt === null || expiresAt <= Date.now();
}

export function getAccessTokenExpiration(token = getAccessToken()) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const claims = JSON.parse(atob(normalized)) as { exp?: number };
    return typeof claims.exp === "number" ? claims.exp * 1000 : null;
  } catch {
    return null;
  }
}
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (typeof window === "undefined") return;

  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
};

export const getStoredAuthIdentity = (): StoredAuthIdentity | null => {
  if (typeof window === "undefined") return null;
  if (!getAccessToken()) return null;
  const value = window.localStorage.getItem(IDENTITY_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as StoredAuthIdentity;
  } catch {
    window.localStorage.removeItem(IDENTITY_KEY);
    return null;
  }
};

export const setStoredAuthIdentity = (identity: StoredAuthIdentity | null) => {
  if (typeof window === "undefined") return;
  if (identity) window.localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
  else window.localStorage.removeItem(IDENTITY_KEY);
};
