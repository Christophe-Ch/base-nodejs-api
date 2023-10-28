import fs from 'fs';
import path from 'path';

const CERTS_PATH = 'certs';

const loadKey = (keyName: string): string => {
    const keyPath = path.join(CERTS_PATH, keyName);
    try {
        return fs.readFileSync(keyPath, 'utf8');
    } catch (error) {
        throw new Error(`Failed to load ${keyName}`);
    }
};

export const PRIVATE_KEY = loadKey('private.pem');
export const PUBLIC_KEY = loadKey('public.pem');
