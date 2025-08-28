export const isLibrarian = (req,res,next)=>{
    try {
        if(!req.user.role){
            return res.status(401).json({message:"Unauthorized:No role defined."});
        }

        if(req.user.role != 'librarian'){
            return res.status(401).json({message:"Unauthorized:you cannot acces this route as you are not librarian."});
        }

        next();
    } catch (error) {
        console.log("Error in isLibrarian middleware",error);
        return res.status(404).json({message:"Internal Server Error."})
    }
}