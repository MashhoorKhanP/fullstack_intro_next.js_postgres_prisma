import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  const id = params.id;
  const post = await prisma.post.delete({
    where:{id:id}
  })
  return NextResponse.json(post);
};
