import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { FacilityResolver } from './resolvers/FacilityResolver';
import AppDataSource from './data-source';

async function startServer() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, FacilityResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen({ port: 4000 }, () =>
    console.log(`Server is running on http://localhost:4000`)
  );
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});