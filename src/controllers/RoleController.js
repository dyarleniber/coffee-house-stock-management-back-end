class RoleController {
  async index(req, res) {
    return res.status(200).end();
  }
}

export default new RoleController();
