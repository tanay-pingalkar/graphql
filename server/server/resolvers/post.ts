import { Post } from "../entities/post";
import { MyContext } from "server/utils/types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const res = await Post.find();
    console.log(res);
    return res;
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | null> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Arg("title", () => String) title: string): Promise<Post> {
    return Post.create({ title }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string
  ): Promise<Post | null> {
    const exist = Post.findOne(id);
    if (exist) {
      await Post.update({ id }, { title });
    }
    else{
      return null
    }
    return exist;
  }

  @Mutation(() => String)
  async deletePost(
    @Arg("id") id: number,
  ): Promise<String> {
    const exist = Post.findOne(id);
    if (exist) {
      await Post.delete(id);
      return "deleted"
    }
    else{
      return null
    }
  }
    
  }
}
