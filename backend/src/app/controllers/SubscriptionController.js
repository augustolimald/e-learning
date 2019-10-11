import Joi from '@hapi/joi';
import Course from '../schemas/Course';
import Subscription from '../schemas/Subscription';

class SubscriptionController {
  async index(request, response) {
    const subscriptions = await Subscription.find({ user: request.headers.userId });

    return response.status(200).json(subscriptions);
  }

  async store(request, response) {
    const course = await Course.findById(request.params.id);
    if (!course) {
      return response.status(404).json({ err: 'Curso não encontrado' });
    }

    const prevSubscription = await Subscription.findOne({
      user: request.headers.userId,
      course: course.id,
    });
    if (prevSubscription) {
      return response.status(400).json({ err: 'Esse usuário já está inscrito nesse curso' });
    }

    const subscription = new Subscription({
      user: request.headers.userId,
      course: course.id,
      lastClass: course.classes[0].id,
      done: false,
      testGrade: 0,
    });
    await subscription.save();

    return response.status(201).json(subscription);
  }

  async submit(request, response) {
    const course = await Course.findById(request.params.id);
    if (!course) {
      return response.status(404).json({ err: 'Curso não encontrado' });
    }

    const subscription = await Subscription.findOne({
      user: request.headers.userId,
      course: course.id,
    });
    if (!subscription) {
      return response.status(400).json({ err: 'Esse usuário não está inscrito nesse curso' });
    }

    const schema = Joi.object({
      questions: Joi.array()
        .min(course.final_test.length)
        .max(course.final_test.length)
        .items(Joi.number())
        .required(),
    });
    const { error, value } = schema.validate(request.body);
    if (error) {
      return response.status(400).json({ err: 'Erro de validação' });
    }

    const answersCorrect = value.questions.reduce(
      (ans, question, index) => (question === course.final_test[index].correct ? ans + 1 : ans),
      0,
    );

    const percent = (answersCorrect / course.final_test.length) * 100;
    if (percent > subscription.lastGrade) {
      subscription.lastGrade = percent;
    }
    if (percent > 60) {
      subscription.done = true;
    }

    await subscription.save();
    return response.status(200).json({
      answersCorrect,
      totalAnswers: value.questions.length,
      percent,
      status: (percent > 60) ? 'Aprovado' : 'Reprovado',
    });
  }

  async progress(request, response) {
    const course = await Course.findById(request.params.id);
    if (!course) {
      return response.status(404).json({ err: 'Curso não encontrado' });
    }

    const subscription = await Subscription.findOne({
      user: request.headers.userId,
      course: course.id,
    });
    if (!subscription) {
      return response.status(400).json({ err: 'Esse usuário não está inscrito nesse curso' });
    }

    const { courseClass } = request.body;
    const { id: courseId } = course.classes.find((cClass) => cClass.id === courseClass);
    if (!courseClass || !courseId) {
      return response.status(404).json({ err: 'Esse curso não possui essa aula' });
    }

    subscription.lastClass = courseId;
    await subscription.save();
    return response.status(200).json(subscription);
  }
}

export default new SubscriptionController();
