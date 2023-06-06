import prisma from "@/app/utls/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
  try {
    await prisma.post.delete({ where: { id: params.id }})
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
