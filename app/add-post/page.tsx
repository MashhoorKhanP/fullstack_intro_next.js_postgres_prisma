"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      router.refresh();
      setIsSubmitted(true);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex flex-col justify-center p-10">
      <h1 className="font-bold p-2 text-center">Add Post</h1>
      {isSubmitted ? (
        <div className="max-w-md mx-auto mt-6">
          <p className="text-green-500 font-semibold">
            Posted successfully!
            <Link
              href="/"
              className="text-blue-500 underline cursor-pointer mx-1"
            >
              Go Back to Feeds!
            </Link>
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-bold my-2 py-2 px-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Another Post
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-6 text-black "
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-400"
            >
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="text-bold py-2 px-4 w-full bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
          <Link href="/">
            <button
              type="submit"
              className="text-bold my-2 py-2 px-4 w-full bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </Link>
        </form>
      )}
    </main>
  );
};

export default AddPost;
