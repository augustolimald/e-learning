import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = new Schema({
  user: 'ObjectId',
  course: 'ObjectId',
  lastClass: 'ObjectId',
  done: Boolean,
  testGrade: Number,
}, {
  timestamps: true,
});

export default mongoose.model('Subscription', SubscriptionSchema, 'subscriptions');
