import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 6);
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema, 'users');
