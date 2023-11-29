import jwt from 'jsonwebtoken'

export const createTokens = async (id: string, role: string) => {
    const token = await jwt.sign({id, role}, process.env.WHOAREYOU!);

    return token
}