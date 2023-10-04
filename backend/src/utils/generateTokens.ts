import jwt from 'jsonwebtoken'

const generateToken = (res: any, userId: any) => {
    const token = jwt.sign({id: userId}, process.env.WHOAREYOU!, {
        expiresIn: '2d'
    })

    res?.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        // samSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    console.log('the res: ',res)
}

export default generateToken;