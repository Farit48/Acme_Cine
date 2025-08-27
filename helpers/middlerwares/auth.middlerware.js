import jwt from 'jsonwebtoken'

const verifyToken = (req,res,next)=>{
    const token = req.header('Authorization')
    if(!token) return res.status(401).json({message:'Acceso denegado'})
    try{
        const verified = jwt.verify( token, process.env.CLAVE_SEGURA)
        req.user = verified;
        next()
    }catch (err){
        res.status(400).json({message:'Token Invalido'})
    }
}

export default verifyToken;