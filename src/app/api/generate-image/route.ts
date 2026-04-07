import { NextRequest, NextResponse } from "next/server";
import { generateBlogImage } from "@/lib/generateBlogImage";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { title?: unknown; category?: unknown };
    const { title, category } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const url = await generateBlogImage(
      title,
      typeof category === "string" ? category : null
    );

    if (!url) {
      return NextResponse.json(
        { error: "Image generation unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
