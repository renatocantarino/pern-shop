import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import httpHandler from "../lib/httpHandler";


let isInterceptorRegistered = false;

function useAuthReq() {
    const { isSignedIn, getToken, isLoaded } = useAuth();

    useEffect(() => {
        if (isInterceptorRegistered) return;
        isInterceptorRegistered = true;

        const interceptor = httpHandler.interceptors.request.use(async (config) => {
            if (isSignedIn) {
                const token = await getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        });

        return () => {
            httpHandler.interceptors.request.eject(interceptor);
            isInterceptorRegistered = false;
        };
    }, [isSignedIn, getToken]);

    return { isSignedIn, isClerkLoaded: isLoaded };
}


export default useAuthReq;