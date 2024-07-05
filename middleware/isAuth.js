import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};


const isAuthAdmin = (req, res, next) => {
  if(req.user && req.user.role){
    next()
  }else{
    res.status(401).json({message: "Not autherized as an admin"})
  }
}


export  {isAuth, isAuthAdmin};
