import jwt from 'jsonwebtoken'

export const createTokens = async (id: string) => {
    const token = await jwt.sign({id}, process.env.WHOAREYOU!);

    return token
}