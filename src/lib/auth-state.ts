import { isAuthenticated } from '../utils/auth';
import { http, setAccessToken } from './http';

export type CurrentUser = { id: number; email: string; admin: boolean };

let currentUser: CurrentUser | null = null;
let initialized = false;
let initPromise: Promise<void> | null = null;

export function getCurrentUser(): CurrentUser | null {
    return currentUser;
}

export function isInitDone() {
    return initialized;
}

export async function initAuth(force = false): Promise<CurrentUser | null> {
    if (force) {
        initialized = false;
        initPromise = null;
    }

    if (initialized) return currentUser;
    if (initPromise) {
        await initPromise;
        return currentUser;
    }

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

    await initPromise;
    return currentUser;
}

export function setCurrentUser(next: CurrentUser | null) {
    currentUser = next;
}

export function clearAuth() {
    currentUser = null;
    initialized = false;
    setAccessToken(null);
}