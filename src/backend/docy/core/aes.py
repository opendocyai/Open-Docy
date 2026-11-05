"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/11
Last Modified: 2025/6/11
Last Editor:
Filename: aes
Description: AES encryption algorithm
"""
import base64
from typing import (Tuple, AnyStr, Optional)
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
from Crypto.Cipher._mode_ecb import EcbMode
from Crypto.Hash import HMAC, SHA256
from docy.core.settings import project_settings as settings


def ecb_encrypt(key: AnyStr, content: str) -> Tuple[str, str]:
    """
    Encrypt data using AES in ECB mode.
    """
    if isinstance(key, str):
        key = key.encode('utf-8')
    # Encrypt
    cipher: EcbMode = AES.new(key, AES.MODE_ECB)
    en_content = cipher.encrypt(pad(content.encode('utf-8'), block_size=cipher.block_size))
    return key.hex(), en_content.hex()


def ecb_decrypt(key: AnyStr, en_content: AnyStr) -> str:
    """
    Decrypt data using AES in ECB mode.
    """
    if isinstance(en_content, str):
        en_content = bytes.fromhex(en_content)
    if isinstance(key, str):
        key = bytes.fromhex(key)
    cipher: EcbMode = AES.new(key, AES.MODE_ECB)
    message = cipher.decrypt(en_content)
    return unpad(message, cipher.block_size).decode('utf-8')


def digest(content: str) -> Tuple[str, str]:
    hmac_key = get_random_bytes(16)
    hmac = HMAC.new(hmac_key, digestmod=SHA256)
    tag = hmac.update(content.encode('utf-8')).digest()
    return hmac_key.hex(), tag.hex()


def verify_digest(hmac_key: str, tag: str, content: str) -> bool:
    """
    All values passed in have been processed with bytes.hex().
    """
    tag = bytes.fromhex(tag)
    hmac_key = bytes.fromhex(hmac_key)
    try:
        hmac = HMAC.new(hmac_key, digestmod=SHA256)
        hmac.update(content.encode('utf-8')).verify(tag)
    except ValueError:
        return False
    return True


def decrypt_with_b64_before_aes(content: str, key: Optional[str] = None) -> str:
    if key is None:
        key = settings.default.secret
    value = base64.b64decode(content)
    return ecb_decrypt(key.encode(), value)


def encrypt_with_b64_after_aes(content: str, key: Optional[str] = None) -> Tuple[str, str]:
    if key is None:
        key = settings.default.secret
    key, content = ecb_encrypt(key, content)
    return base64.b64encode(bytes.fromhex(key)).decode(), base64.b64encode(bytes.fromhex(content)).decode()


if __name__ == '__main__':
    # Encrypt the password
    key = settings.default.secret.encode()
    _, content = ecb_encrypt(key, 'zcj$@1021')
    base64_str = base64.b64encode(bytes.fromhex(content)).decode('utf-8')
    print(base64_str)
    print(content)

    # Decrypt
