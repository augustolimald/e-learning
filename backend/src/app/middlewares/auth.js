import { verify } from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../../config/auth';

export default async (request, response, next) => {
  const header = request.headers.authorization;
  if (!header) {
    return response.status(401).json({ err: 'Usuário não autenticado' });
  }

  try {
    const [, token] = header.split(' ');
    const { id } = await promisify(verify)(token, config.secret);
    request.headers.userId = id;

    return next();
  } catch (err) {
    return response.status(401).json({ err: 'Usuário não autenticado' });
  }
};
