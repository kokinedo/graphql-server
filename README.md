# GraphQL Server with TypeScript
This project utilizes Apollo Server with TypeScript and TypeORM for database management. The following business objects and relationships are modeled:

-   **Facility**: Represents a healthcare facility.
-   **Location**: Represents a geographical location associated with a facility.
-   **User**: Represents a user who can be associated with multiple facilities.
-   **Role**: Defines the role of the user (e.g., Doctor, Administrator).
-   **UserFacilities**: Represents a many-to-many relationship between users and facilities.
-   **FacilityLocations**: Represents a one-to-many relationship between facilities and locations.

## Entities

### User

-   **id**: Unique identifier (UUID).
-   **firstName**: First name of the user.
-   **lastName**: Last name of the user.
-   **email**: Email address of the user.
-   **role**: Role of the user.
-   **createdAt**: Timestamp when the user was created.
-   **facilities**: Associated facilities.

### Facility

-   **id**: Unique identifier (UUID).
-   **name**: Name of the facility.
-   **createdAt**: Timestamp when the facility was created.
-   **locations**: Associated locations.
-   **users**: Associated users.

### Location

-   **id**: Unique identifier (UUID).
-   **state**: State of the location.
-   **zip**: ZIP code of the location.
-   **address**: Address of the location.
-   **facility**: Associated facility.

## Resolvers

### UserResolver

#### Query

-   **user(id: UUID!)**: Retrieves a user by ID.

#### Mutation

-   **createUser(data: UserInput)**: Creates a new user.

### FacilityResolver

#### Query

-   **facility(id: UUID!)**: Retrieves a facility by ID.

#### Mutation

-   **createFacility(data: FacilityInput)**: Creates a new facility.

## Project Structure

- **src/entity**: Contains the TypeORM entities (User, Facility, Location).
- **src/resolvers**: Contains the GraphQL resolvers for the entities.
- **__tests__**: Contains the test cases for the GraphQL resolvers.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/graphql-server.git
    cd graphql-server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up PostgreSQL:**

    Create a PostgreSQL database and update the `src/ormconfig.ts` file with your database credentials.

    ```typescript
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
    ```

4. **Run the server:**

    ```bash
    npm run dev
    ```

    The server will be running at `http://localhost:4000`.

### Testing

Run the test suite:

```bash
npm test
```
## GraphQL Example Queries
### Get User by ID
```graphql
query {
  user(id: "user-id") {
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
```
#### Get Users by Location
```graphql
query {
  usersByLocation(input: { state: "CA", zip: "90001" }) {
    location {
      id
      state
      zip
      address
      facility {
        id
        name
        createdAt
      }
      users {
        id
        firstName
        lastName
        email
        role
        createdAt
      }
    }
  }
}
```
