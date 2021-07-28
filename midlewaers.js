import colors from "colors"

export function requestTime(req,res,next){
    req.requestTime = Date.now();

    next();
}

export function logger(req,res,next){
    console.log()
    next();
}