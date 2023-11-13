const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) {
                res.status(403).json("토큰이 유효하지 않습니다");
            }
            req.user = user;
            next();
        });
    } else{
        return res.status(401).json("허용되지 않았습니다.");
    }
};
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("할 수 없습니다.");
        }
    });
};

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res, () =>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("할 수 없습니다.");
        }
    });
};

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,};