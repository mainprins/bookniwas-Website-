export const isBorrower = (req,res,next)=>{
    try {
        if(!req.user.role){
            return res.status(401).json({message:"Unauthorized:No role defined."});
        }

        if(req.user.role != 'borrower'){
            return res.status(401).json({message:"Unauthorized:you cannot acces this route as you are not borrower."});
        }

        next();
    } catch (error) {
        console.log("Error in isBorrower middleware",error);
        return res.status(404).json({message:"Internal Server Error."})
    }
}