import Joi from '@hapi/joi';
import User from '../schemas/User';

class UserController {
  async show(request, response) {
    const { id } = request.params;

    const user = await User.findById(id);
    if (!user) {
      return response.status(404).json({ err: 'Usuário não encontrado' });
    }

    return response.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/image/${user.image}`,
    });
  }

  async store(request, response) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      image: Joi.string().default('default-user.png'),
    });
    const { error, value } = schema.validate(request.body);

    if (error) {
      return response.status(400).json({ err: 'Erro de validação' });
    }

    const emailExists = await User.findOne({ email: value.email });
    if (emailExists) {
      return response.status(400).json({ erro: 'Esse usuário já está cadastrado' });
    }

    const user = new User(value);
    await user.save();

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/image/${user.image}`,
    });
  }
}

export default new UserController();
