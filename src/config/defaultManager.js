import { MANAGER_ROLE } from "../constants/role";

const defaultManager = {
  name: process.env.DEFAULT_MANAGER_NAME,
  email: process.env.DEFAULT_MANAGER_EMAIL,
  password: process.env.DEFAULT_MANAGER_PASSWORD,
  roleId: MANAGER_ROLE,
};

export default defaultManager;
