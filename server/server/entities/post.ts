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
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn({ type: "date", onUpdate: () => new Date() })
  updatedAt = Date();

  @Field()
  @Column({ type: "text" })
  title!: string;
}
