export interface PostsProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
}

export type AllPosts = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: { name: string };
}[];
