const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    let token = false;

    const authType = process.env.AUTH_TYPE || "bearer";

    console.log("Verify:", authType);
    
    if (authType === "bearer") {
        token = req.headers["authorization"]?.split(" ")[1];
    }

    if (authType === "cookie") {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}