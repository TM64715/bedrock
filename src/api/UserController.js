import UsersDAO from '../../dao/usersDAO';

export default class UserController {
  static async register(req, res) {
    const { email, password, name } = req.body;
    if (!email) {
      res.json({ error: 'Missing required field: Email', data: null });
      return;
    } if (!password) {
      res.json({ error: 'Missing required field: Password', data: null });
      return;
    }
    const { result: emailResult } = await UsersDAO.findByEmail(email);
    if (emailResult) {
      res.json({ error: 'Email already in use', data: null });
      return;
    }

    try {
      const { result, error } = await UsersDAO.createUser({ email, name, password });
      if (error) {
        res.status(500).json({ error, result: null, message: 'An error occurred' });
      }
      req.login(result, (err) => {
        if (err) {
          res.json({ error: err.toString(), data: null });
          return;
        }
        res.json({ error: null, result: { email, name } });
      });
    } catch (e) {
      res.json({ error: e.toString(), result: null });
    }
  }
}
