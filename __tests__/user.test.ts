import { createConnection, getConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../src/resolvers/UserResolver';
import ormconfig from '../src/ormconfig';

let server: ApolloServer;

beforeAll(async () => {
  await createConnection(ormconfig);
  const schema = await buildSchema({ resolvers: [UserResolver] });
  server = new ApolloServer({ schema });
});

afterAll(async () => {
  const conn = getConnection();
  await conn.close();
});

describe('User Resolver', () => {
  it('creates a new user', async () => {
    const CREATE_USER = `
      mutation {
        createUser(data: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          role: "Doctor"
        }) {
          id
          firstName
          lastName
          email
          role
          createdAt
        }
      }
    `;

    const result = await server.executeOperation({ query: CREATE_USER });
    expect(result.data?.createUser).toHaveProperty('id');
    expect(result.data?.createUser.firstName).toBe('John');
    expect(result.data?.createUser.lastName).toBe('Doe');
    expect(result.data?.createUser.email).toBe('john@example.com');
    expect(result.data?.createUser.role).toBe('Doctor');
  });

  it('retrieves a user by ID', async () => {
    const CREATE_USER = `
      mutation {
        createUser(data: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          role: "Administrator"
        }) {
          id
          firstName
          lastName
          email
          role
          createdAt
        }
      }
    `;

    const createResult = await server.executeOperation({ query: CREATE_USER });
    const userId = createResult.data?.createUser.id;

    const GET_USER = `
      query {
        user(id: "${userId}") {
          id
          firstName
          lastName
          email
          role
          createdAt
          facilities {
            id
            name
            createdAt
            locations {
              id
              state
              zip
              address
            }
          }
        }
      }
    `;

    const getResult = await server.executeOperation({ query: GET_USER });
    expect(getResult.data?.user.id).toBe(userId);
    expect(getResult.data?.user.firstName).toBe('Jane');
    expect(getResult.data?.user.lastName).toBe('Doe');
    expect(getResult.data?.user.email).toBe('jane@example.com');
    expect(getResult.data?.user.role).toBe('Administrator');
  });
});