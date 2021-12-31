// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Post, Comment } = initSchema(schema);

export {
  Category,
  Post,
  Comment
};