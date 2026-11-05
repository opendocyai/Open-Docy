import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "@/shared/types/jwtToken";

export const useJwtToken = () => {
  const isValid = (token: string | null): boolean => {
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("decoded :", decoded);
      const currentTime = Date.now() / 1000;
      return !decoded.exp || decoded.exp > currentTime + 30;
    } catch (error) {
      return false;
    }
  };

  const isExpiringSoon = (token: string | null): boolean => {
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      const fiveMinutes = 5 * 60;

      if (!decoded.exp) return false;

      return decoded.exp - currentTime < fiveMinutes;
    } catch (error) {
      console.error("Token parsing failed:", error);
      return true;
    }
  };

  const getExpirationTime = (token: string | null): number | null => {
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp || null;
    } catch (error) {
      console.error("Token parsing failed:", error);
      return null;
    }
  };

  const getRemainingTime = (token: string | null): number | null => {
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? Math.max(0, decoded.exp - currentTime) : Infinity;
    } catch (error) {
      console.error("Token parsing failed:", error);
      return null;
    }
  };

  const getUserFromToken = (token: string | null): any => {
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const { exp, sub, iat, type, utype, ...userData } = decoded;
      return userData;
    } catch (error) {
      console.error("Token parsing failed:", error);
      return null;
    }
  };

  return {
    isValid,
    isExpiringSoon,
    getExpirationTime,
    getRemainingTime,
    getUserFromToken,
  };
};
