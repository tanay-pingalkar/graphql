import { Post } from "../entities/post";
import { MyContext } from "server/utils/types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    const res = await em.find(Post, {});
    console.log(res);
    return res;
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: number,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    await em.nativeUpdate(Post, id, { title });
    const post = await em.findOne(Post, { id });
    return post;
  }

  @Mutation(() => String)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<String> {
    await em.nativeDelete(Post, { id });
    if ((await em.findOne(Post, { id })) === null) {
      return "deleted";
    } else {
      return "ops";
    }
  }
}
