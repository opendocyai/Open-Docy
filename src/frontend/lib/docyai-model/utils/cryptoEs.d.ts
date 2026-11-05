declare class CryptoEsClass {
    key: string;
    encrypt: (encryptContent: string, encryptKey?: string, isHex?: boolean) => string;
    decrypt: (encrypted: string, encryptKey?: string) => string;
    base64AES: (data: string) => string;
    base64DAes: (data: string) => string;
}
declare const cryptoEs: CryptoEsClass;
export declare const encrypt: (encryptContent: string, encryptKey?: string, isHex?: boolean) => string;
export declare const decrypt: (encrypted: string, encryptKey?: string) => string;
export declare const base64AES: (data: string) => string;
export declare const base64DAes: (data: string) => string;
export default cryptoEs;
