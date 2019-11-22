import Joi from '@hapi/joi';
import Course from '../schemas/Course';

class CourseController {
  async index(request, response) {
    const options = {};
    if (request.query.search) {
      options.title = new RegExp(request.query.search, 'i');
    }

    const courses = await Course.find(options);

    return response.status(200).json(courses.map((course) => ({
      id: course.id,
      title: course.title,
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/image/${course.image}`,
    })));
  }

  async show(request, response) {
    const { id } = request.params;
    const course = await Course.findById(id);

    if (!course) {
      return response.status(404).json({ err: 'Curso não encontrado' });
    }

    return response.status(200).json({
      id: course.id,
      title: course.title,
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/image/${course.image}`,
      classes: course.classes,
      creator: course.creator,
      final_test: course.final_test.map(ft => ({description: ft.description, options: ft.options}))
    });
  }

  async store(request, response) {
    const { userId } = request.headers;

    const schema = Joi.object({
      title: Joi.string().required(),
      image: Joi.string().default('default-course.jpeg'),

      classes: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        video_url: Joi.string().uri().required(),
        text: Joi.string().required(),
      })).required(),

      final_test: Joi.array().items(Joi.object({
        description: Joi.string().required(),
        options: Joi.array().items(Joi.string()).required(),
        correct: Joi.number().required(),
      })).required(),
    });

    const { error, value } = schema.validate(request.body);
    if (error) {
      return response.status(400).json({ err: 'Erro de validação' });
    }

    const course = new Course({ ...value, creator: userId });
    await course.save();

    return response.status(201).json(course);
  }
}

export default new CourseController();
