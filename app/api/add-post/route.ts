import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log({ req });
  const { title, content } = req;
  const res = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: true,
      author: {
        create: {
          name: "Mashhoor",
        },
      },
    },
  });
  return NextResponse.json({ res });
};
