const notFound = (req,res)=>{
    res.status(404).json({message:"Invalid Request"})
}

module.exports = notFound;