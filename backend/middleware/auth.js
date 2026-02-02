import jwt from "jsonwebtoken";
// auth middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token1 = req?.headers?.authorization;
    if (!token1) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = token1.split(" ")[1];
    try {
        // Verify token and extract user information
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;