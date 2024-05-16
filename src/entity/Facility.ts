import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Location } from './Location';
import { User } from './User';

@ObjectType()
@Entity()
export class Facility {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => [Location])
  @OneToMany(() => Location, location => location.facility)
  locations!: Location[];

  @Field(() => [User])
  @ManyToMany(() => User, user => user.facilities)
  users!: User[];
}
