import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import ormconfig from './ormconfig';
import { UserResolver } from './resolvers/UserResolver';
import { FacilityResolver } from './resolvers/FacilityResolver';

async function bootstrap() {
  await createConnection(ormconfig);

  const schema = await buildSchema({
    resolvers: [UserResolver, FacilityResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen({ port: 4000 }, () =>
    console.log('Server is running on http://localhost:4000'),
  );
}

bootstrap();
