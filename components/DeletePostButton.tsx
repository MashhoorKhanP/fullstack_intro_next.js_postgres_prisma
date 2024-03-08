"use client";

import { PostsProps } from "@/types";
import { useRouter } from "next/navigation";

type DeletePostProps = {
  postId: string;
};
export const DeletePostButton = ({ postId }: DeletePostProps) => {
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      await fetch(`/api/delete-post/${postId}`, { method: "DELETE" }).then(() =>
        router.refresh()
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      type="button"
      onClick={() => handleDeletePost()}
      className="text-bold my-2 py-2 px-4 w-full bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Delete Post
    </button>
  );
};
