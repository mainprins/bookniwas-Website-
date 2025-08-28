import jwt from "jsonwebtoken"

export const generateToken = async (email,fullname,id,role)=>{
   const token = jwt.sign({id:id,email:email,role:role,fullname:fullname},process.env.JWT_SECRET,{
      expiresIn: '7h',
   });
   return token;
}