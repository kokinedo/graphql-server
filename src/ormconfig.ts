import { ConnectionOptions } from 'typeorm';
import { User } from './entity/User';
import { Facility } from './entity/Facility';
import { Location } from './entity/Location';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
  synchronize: true,
  logging: true,
  entities: [User, Facility, Location],
};

export default config;
