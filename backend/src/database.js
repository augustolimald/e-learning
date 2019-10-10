import 'dotenv/config';
import mongoose from 'mongoose';

import './app/schemas';
import { url, options } from './config/mongo';

class Database {
  constructor() {
    this.connection = mongoose.connect(url, options);
  }
}

export default new Database();
