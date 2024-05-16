import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';
import { Facility } from '../entity/Facility';
import AppDataSource from '../data-source';

@InputType()
class FacilityInput {
  @Field()
  name!: string;
}

@Resolver()
export class FacilityResolver {
  @Query(() => Facility)
  async facility(@Arg('id') id: string) {
    return AppDataSource.getRepository(Facility).findOne({
      where: { id },
      relations: ['locations', 'users'],
    });
  }

  @Mutation(() => Facility)
  async createFacility(@Arg('data') data: FacilityInput) {
    const facilityRepository = AppDataSource.getRepository(Facility);
    const facility = facilityRepository.create(data);
    await facilityRepository.save(facility);
    return facility;
  }
}