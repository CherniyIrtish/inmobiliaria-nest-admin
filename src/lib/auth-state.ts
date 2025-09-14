import { isAuthenticated } from '../utils/auth';
import { http, setAccessToken } from './http';

type CurrentUser = { id: number; email: string; admin: boolean };

let currentUser: CurrentUser | null = null;
let initialized = false;
let initPromise: Promise<void> | null = null;

export function getCurrentUser(): CurrentUser | null {
    return currentUser;
}

export function isInitDone() {
    return initialized;
}

export async function initAuth(): Promise<void> {
    if (initialized) return;
    if (initPromise) return initPromise;

    initPromise = (async () => {
        try {
            if (isAuthenticated()) {
                currentUser = await http.get('/me');
            } else {
                currentUser = null;
            }
        } catch {
            currentUser = null;
            setAccessToken(null);
        } finally {
            initialized = true;
            initPromise = null;
        }
    })();

    return initPromise;
}

export function setMe(next: CurrentUser | null) {
    currentUser = next;
}

export function clearAuth() {
    currentUser = null;
    initialized = false;
    setAccessToken(null);
}