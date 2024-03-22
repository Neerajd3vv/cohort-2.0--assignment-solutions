import jwt, { JwtPayload } from "jsonwebtoken";
import jwt_key from "./config";

function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Token not correct" });
  }
  const actualToken = token.split(" ")[1];
  try {
    const decoded = jwt.verify(actualToken, jwt_key.JWT_TOKEN) as JwtPayload;
    req.email = decoded.email; // Assuming the decoded payload has an 'email' property
    next(); // Call next to continue the request processing chain
  } catch (error) {
    if (typeof error === "string") {
      return res.status(401).json({ msg: "Invalid token format" });
    } else {
      return res.status(401).json({ msg: "Invalid token" });
    }
  }
}

export default authMiddleware;
