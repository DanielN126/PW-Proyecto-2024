import jwt from 'jsonwebtoken'
import 'dotenv/config'

const SECRET_KEY=process.env.SECRET_KEY_TOKEN

export const generateToken =(id)=>{
    const token = jwt.sign({id}, SECRET_KEY, {expiresIn:'1h'})

    return {token};
}