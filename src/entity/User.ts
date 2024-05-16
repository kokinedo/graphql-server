import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Facility } from './Facility';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  role!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => [Facility])
  @ManyToMany(() => Facility, facility => facility.users)
  @JoinTable()
  facilities!: Facility[];
}
