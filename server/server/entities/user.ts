import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field(() => String)
  @Column({ unique: true })
  userName!: string;

  @Field(() => String)
  @Column()
  userPassword!: string;

  @Field(() => String)
  @Column({ unique: true })
  userEmail!: string;
}
