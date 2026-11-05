import {
  AES,
  ECB,
  Pkcs7,
  Utf8,
  Hex,
  Base64 as CryptoBase64,
  CipherParams,
} from "crypto-es";
import { Base64 } from "js-base64";
import { isHex } from "./efficacy";

class CryptoEsClass {
  key = "1234123412ABCDEF";

  encrypt = (
    encryptContent: string,
    encryptKey: string = this.key,
    isHex = false,
  ) => {
    const key = Utf8.parse(encryptKey);
    const decryptData = Utf8.parse(encryptContent);

    const encrypted = AES.encrypt(decryptData, key, {
      mode: ECB,
      padding: Pkcs7,
    });

    return isHex
      ? Hex.stringify(encrypted.ciphertext!)
      : CryptoBase64.stringify(encrypted.ciphertext!);
  };

  decrypt = (encrypted: string, encryptKey: string = this.key) => {
    const key = Utf8.parse(encryptKey);

    const stringEncryptData = CipherParams.create({
      ciphertext: isHex(encrypted)
        ? Hex.parse(encrypted)
        : CryptoBase64.parse(encrypted),
    });

    const decrypt = AES.decrypt(stringEncryptData, key, {
      mode: ECB,
      padding: Pkcs7,
    });

    return Utf8.stringify(decrypt);
  };

  base64AES = (data: string) => {
    return Base64.encode(data);
  };

  base64DAes = (data: string) => {
    return Base64.decode(data);
  };
}

const cryptoEs = new CryptoEsClass();

export const encrypt = cryptoEs.encrypt.bind(cryptoEs);
export const decrypt = cryptoEs.decrypt.bind(cryptoEs);
export const base64AES = cryptoEs.base64AES.bind(cryptoEs);
export const base64DAes = cryptoEs.base64DAes.bind(cryptoEs);

export default cryptoEs;
