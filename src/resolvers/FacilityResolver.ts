import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';
import { Facility } from '../entity/Facility';
import { getRepository, FindOneOptions } from 'typeorm';

@InputType()
class FacilityInput {
  @Field()
  name!: string;
}

@Resolver()
export class FacilityResolver {
  private facilityRepository = getRepository(Facility);

  @Query(() => Facility)
  async facility(@Arg('id') id: string) {
    const repository = getRepository(Facility);
    const options: FindOneOptions<Facility> = {
      where: { id },
      relations: ['locations', 'users'],
    };
    return repository.findOne(options);
  }

  @Mutation(() => Facility)
  async createFacility(@Arg('data') data: FacilityInput) {
    const repository = getRepository(Facility);
    const facility = repository.create(data);
    await repository.save(facility);
    return facility;
  }
}