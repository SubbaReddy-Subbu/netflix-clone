import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/Prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { email, name, password } = req.body;
        
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(422).json({ error: 'Email taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: " ",
                emailVerified: new Date(),
            },
        });
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error in user creation:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}