import { sign } from 'jsonwebtoken';
import Joi from '@hapi/joi';

import config from '../../config/auth';
import User from '../schemas/User';

class LoginController {
  async login(request, response) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(request.body);

    if (error) {
      return response.status(400).json({ err: 'Erro de validação' });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ err: 'Usuário não encontrado' });
    }

    if (!user.comparePassword(password)) {
      return response.status(401).json({ err: 'Senha inválida' });
    }

    return response.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/image/${user.image}`,
      token: sign(
        { id: user.id },
        config.secret,
        { expiresIn: config.expiresIn },
      ),
    });
  }
}

export default new LoginController();
