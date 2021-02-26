const config = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "Strict",
  maxAge: 24 * 60 * 60,
  path: "/",
};

export default config;
