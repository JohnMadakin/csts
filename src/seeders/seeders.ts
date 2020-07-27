import mongoose from 'mongoose';
import models from '../models';
import {hashPassword} from '../helpers/authhelper';

import config from '../config/app';
import { ENVIRONMENT, MONGODB_URI } from '../utils/app.secrets';
const connectionString = `${MONGODB_URI}?retryWrites=true&w=majority`;


(async () => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  if (ENVIRONMENT === 'test') {
    await models.CategoryModel.deleteMany({});
    await models.UserModel.deleteMany({});
  }

    const categories = await models.CategoryModel.find({});
    if (!categories || categories.length === 0) {
      await models.CategoryModel.insertMany([
        { name: 'General Enquiry', requests: [] },
        { name: 'Hardware Request', requests: []},
        { name: 'Access failure', requests: [] },
        { name: 'Application failure', requests: [] },
        { name: 'Password issue', requests: [] },
        { name: 'Hardware issue', requests: [] }
      ]);
      // tslint:disable-next-line:no-console
      console.log('Seeding categories in the database');
    }

    const users = await models.UserModel.find({});
    if (!users || users.length === 0){
      await models.UserModel.insertMany([{
        email: 'admin@admin.com',
        password: hashPassword(config.seederPassword),
        name: 'admin',
        verified: true,
        role: { name: 'admin' },
      }, {
        email: 'agent1@admin.com',
        password: hashPassword('password123'),
        name: 'agent1',
        verified: true,
        role: { name: 'agent' },
      }]);
      // tslint:disable-next-line:no-console
      console.log('Seeding users in the database');
    }
  await mongoose.connection.close();
})();

