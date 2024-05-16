import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Facility } from './Facility';

@ObjectType()
@Entity()
export class Location {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  state!: string;

  @Field()
  @Column()
  zip!: string;

  @Field()
  @Column()
  address!: string;

  @Field(() => Facility)
  @ManyToOne(() => Facility, facility => facility.locations)
  facility!: Facility;
}
