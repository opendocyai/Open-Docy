export declare const useJwtToken: () => {
    isValid: (token: string | null) => boolean;
    isExpiringSoon: (token: string | null) => boolean;
    getExpirationTime: (token: string | null) => number | null;
    getRemainingTime: (token: string | null) => number | null;
    getUserFromToken: (token: string | null) => any;
};
