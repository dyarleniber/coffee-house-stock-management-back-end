import { MANAGER_ROLE, EMPLOYEE_ROLE } from "../constants/role";

const roles = [
  {
    id: MANAGER_ROLE,
    name: "Manager",
    description: "The manager is allowed to manage all application data.",
  },
  {
    id: EMPLOYEE_ROLE,
    name: "Employee",
    description:
      "The employee is only allowed to update the quantity of a product.",
  },
];

export default roles;
