import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';


export const seed = async (knex) => {
  await knex('users').del()
  await knex('users').insert([
    {
      name: faker.name.fullName(), login: 'admin', password: await bcrypt.hash('admin', 10), role: 'admin'
    },
    {
      name: faker.name.fullName(), login: 'moderator', password: await bcrypt.hash('moderator', 10), role: 'moderator'
    },
    {
      name: faker.name.fullName(), login: 'member', password: await bcrypt.hash('member', 10), role: 'member'
    }
  ]);
};
