import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
  creator: 'ObjectId',
  title: String,
  image: String,

  classes: [{
    title: String,
    video_url: String,
    text: String,
  }],

  final_test: [{
    description: String,
    options: [String],
    correct: Number,
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Course', CourseSchema, 'courses');
