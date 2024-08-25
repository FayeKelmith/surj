import jwt from "jsonwebtoken";

export const createJWT = (email: string): string => {
  //const expirationTime = new Date();
  // expirationTime.setDate(expirationTime.getDay() + 15); // 15 days before it expires
  return jwt.sign({ email: email }, process.env.JWT_SECRET);
};

export const compareOTP = (sentOTP: string, savedOTP: string) => {
  return sentOTP === savedOTP;
};
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  const token = bearer.split("Bearer ")[1].trim();

  if (!token) {
    res.status(401);
    res.json({ message: "Invalid Token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(`Error verifying token: ${err}`);
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }
};
