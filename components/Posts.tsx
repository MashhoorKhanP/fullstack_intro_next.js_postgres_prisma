import { PostsProps } from "../types";
import { DeletePostButton } from "./DeletePostButton";

const Posts = ({ id, title, content, authorName }: PostsProps) => {
  return (
    <div className="border p-1.5 w-1/4 justify-center mt-2 align-middle">
      <h3 className="font-semibold">{authorName}</h3>
      <h4>{title}</h4>
      <p>{content}</p>
      <DeletePostButton postId={id} />
    </div>
  );
};

export default Posts;
