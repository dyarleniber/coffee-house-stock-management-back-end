import cookieConfig from "../config/cookie";

export const sendCookie = async (name, value, res) => {
  const { httpOnly, secure, sameSite, maxAge, path } = cookieConfig;

  res.cookie(name, value, { httpOnly, secure, sameSite, maxAge, path });
};

export const clearCookie = async (name, res) => {
  res.clearCookie(name);
};
