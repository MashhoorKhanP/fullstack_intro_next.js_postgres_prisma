import { Posts } from "@/components";
import prisma from "@/lib/prisma";
import { AllPosts } from "@/types";
import Link from "next/link";

const getPosts = async (): Promise<AllPosts> => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { id: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const formattedPosts: AllPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content || "",
    authorId: post.authorId || "",
    author: { name: post.author?.name || "" },
  }));

  return formattedPosts;
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="flex flex-col justify-center items-center p-10 mx-auto">
      <h1 className="text-2xl font-medium p-2">Feed</h1>
      <Link
        className="text-bold py-2 px-4 w-1/4 text-center bg-green-500 text-white rounded-md hover:bg-green-600"
        href="/add-post"
      >
        Add Post
      </Link>
      {!posts.length && (
        <h1 className="text-2xl text-emerald-500 font-semibold p-2">
          Nothing posted yet!
        </h1>
      )}
      {posts.map((post) => (
        <Posts
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          authorName={post.author.name}
        />
      ))}
    </main>
  );
}
