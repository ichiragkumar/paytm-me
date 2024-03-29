const JWT_SECRET  = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("1st 403");
        return res.status(403).json({});
    }
    
    const token = authHeader.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, JWT_SECRET);
      

        if(decoded.userId){
            req.userId = decoded.userId;
            console.log(req.userId);
            next();
        }else{
            console.log("2nd 403");
        return res.status(403).json({});

        }


    } catch (err) {
        console.log("3 rd : 403");
        return res.status(403).json({});
    }
};


module.exports = {
    authMiddleware
}