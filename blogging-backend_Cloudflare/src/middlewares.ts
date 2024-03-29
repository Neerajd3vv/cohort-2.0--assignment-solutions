import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

async function authmiddleware(c: Context, next: Next) {
  const rawToken = c.req.header("Authorization");
  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    return c.text("Token format is incorrect");
  }
  const finalToken = rawToken.split(" ")[1];
  try {
    const decoded = await Jwt.verify(finalToken, c.env.JWT_SECRET);
    c.set("userid", decoded.userid);
    await next()
  } catch (error) {
    return c.json({ msg: "Unauthorized" }, 401);
  }
}

export default authmiddleware;
