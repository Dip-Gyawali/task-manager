const handleError = (err,req,res,next)=>{
  return res.status(err.status).json({message:err.message})
}

module.exports = handleError