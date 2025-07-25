import { prisma } from "@/utils/prismaDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { status: 400, message: "Both name and email are required" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: { name, email },
    });

    return NextResponse.json({ status: 201, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { status: 500, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      const users = await prisma.user.findMany({
        select: { name: true },
      });
      return NextResponse.json({status:200,users},);
    } catch (error) {
      console.error("Error fetching user names:", error);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
  }