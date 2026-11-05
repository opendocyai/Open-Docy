export declare const useAuth: () => {
    setTokens: (newToken: string, newRefreshToken: string) => void;
    clearTokens: () => void;
    refreshAuthToken: () => Promise<boolean>;
    checkAndRefreshToken: () => Promise<boolean>;
};
