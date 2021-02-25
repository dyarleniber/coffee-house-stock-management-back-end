class AuthController {
  async login(req, res) {
    return res.status(200).end();
  }

  async logout(req, res) {
    return res.status(200).end();
  }
}

export default new AuthController();
