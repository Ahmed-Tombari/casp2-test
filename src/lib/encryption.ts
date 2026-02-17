import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Standard for GCM
const AUTH_TAG_LENGTH = 16;
const KEY = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');

/**
 * Encrypts a string using AES-256-GCM
 */
export function encrypt(text: string): string {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not defined');
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  // Combine IV + AuthTag + EncryptedText
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a string using AES-256-GCM
 */
export function decrypt(encryptedText: string): string {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not defined');
  }

  try {
    const [ivHex, authTagHex, encryptedHex] = encryptedText.split(':');
    
    if (!ivHex || !authTagHex || !encryptedHex) {
      throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    // If decryption fails, it might be because the code is not encrypted (legacy)
    // or the key is wrong. For now, returned the raw text if it doesn't match format.
    return encryptedText; 
  }
}
