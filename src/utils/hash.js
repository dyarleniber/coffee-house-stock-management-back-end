import bcrypt from "bcrypt";

export const hash = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 12);
  return encryptedPassword;
};

export const compare = async (password, encryptedPassword) => {
  const match = await bcrypt.compare(password, encryptedPassword);
  return match;
};
