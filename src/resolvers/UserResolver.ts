import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';
import { User } from '../entity/User';
import AppDataSource from '../data-source';

@InputType()
class UserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  role!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Arg('id') id: string) {
    return AppDataSource.getRepository(User).findOneBy({ id });
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: UserInput) {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(data);
    await userRepository.save(user);
    return user;
  }
}