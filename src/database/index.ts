import { connect, set } from 'mongoose';
import { NODE_ENV, MONGODB_HOST, MONGODB_COLLECTION } from '@config';

export const dbConnection = async (): Promise<void> => {
  const dbConfig = {
    url: `${MONGODB_HOST}/${MONGODB_COLLECTION}`,
  };

  if (NODE_ENV !== 'production') {
  }

  set('debug', false);
  set('strictQuery', true);
  await connect(dbConfig.url);
};
