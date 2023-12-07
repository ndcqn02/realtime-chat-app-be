import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://admin:12345@cluster0.jdvhvax.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
