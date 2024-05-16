import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';
import { User } from '../entity/User';
import { getRepository, FindOneOptions } from 'typeorm';
import { Facility } from '../entity/Facility';

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
    const repository = getRepository(User);
    const options: FindOneOptions<User> = {
      where: { id },
      relations: ['facilities'],
    };
    return repository.findOneOrFail(options);
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: UserInput) {
    const repository = getRepository(User);
    const user = repository.create(data);
    await repository.save(user);
    return user;
  }
}