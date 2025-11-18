import jwt from 'jsonwebtoken'

const generateToken = async (userId, res)=>{
    try {

        const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn: '7d'});

        res.cookie("jwt", token,{
            httpOnly: true,
            sameSite:process.env.NODE_ENV ==='development' ? "lax": "none",
            secure: process.env.NODE_ENV !=='development',
            maxAge: 7*24*60*60*1000
        })
        
    } catch (error) {
        console.error(`Error occured in generate token: ${error.message}`);
        res.status(500).json({success: false, message:"Internal server error"})
    }
}

export default generateToken