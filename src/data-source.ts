import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Facility } from './entity/Facility';
import { Location } from './entity/Location';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'kloudski',
  password: 'your_password',
  database: 'graphql_server',
  synchronize: true,
  logging: true,
  entities: [User, Facility, Location],
});

export default AppDataSource;