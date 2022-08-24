
module.exports.sendRes =(res,data,statusCode,isError = false) => {
    if(!isError){
        res.status(statusCode).json({
            status:"succses",
            statusCode,
            data,
            length:data.length,
        });
    }else{
        res.status(statusCode).json({
            status:"failure",
            statusCode:statusCode,
            error:data.message,
        });
    }
};