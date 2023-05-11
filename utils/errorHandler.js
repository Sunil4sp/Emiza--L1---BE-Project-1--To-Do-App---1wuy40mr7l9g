function errorHandler(ctrlFun){
    return async (req, res)=>{
        try{
            await ctrlFun(req, res);
        } catch{
            return res.status(404).json({
                message: 'Something went wrong',
                status: 'fail'
            })
        }
    }
}

module.exports = {
    errorHandler
}