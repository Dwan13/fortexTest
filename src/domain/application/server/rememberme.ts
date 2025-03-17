'use server';
import { cookies } from 'next/headers';
import { createCipheriv, randomBytes, createDecipheriv, scryptSync } from 'crypto';

const secretKeyRaw = process.env.MEMBERS_TOKEN || '';
const secretKey = scryptSync(secretKeyRaw, 'salt', 32); // Deriva clave de 32 bytes
const algorithm = 'aes-256-cbc';

const setData = async (_email: string, _pass: string) => {
    const credentials = JSON.stringify({ email: _email, pass: _pass });
    const initVector = randomBytes(16);

    const cipher = createCipheriv(algorithm, secretKey, initVector);
    let hash = cipher.update(credentials, 'utf8', 'hex');
    hash += cipher.final('hex');

    const encryptData = hash + initVector.toString('hex');

    await (await cookies()).set({
        name: 'credentials',
        value: encryptData,
        httpOnly: true,
        path: '/',
    });

    return true;
};

const getData = async () => {
    const cookieStore = cookies();
    const data = (await cookieStore).get('credentials');

    if (!data) return null;

    const iv = Buffer.from(data.value.slice(-32), 'hex');
    const encryptedText = data.value.slice(0, -32);

    const decipher = createDecipheriv(algorithm, secretKey, iv);
    let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return JSON.parse(decryptedData);
};

const deleteCredentialCookie = async () => {
    const cookieStore = cookies();
    (await cookieStore).delete('credentials');
};

export { setData, getData, deleteCredentialCookie };
