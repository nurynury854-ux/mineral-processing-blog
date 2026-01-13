import "server-only";
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts.server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  const posts = getAllPosts();

  const results = posts.filter(post =>
    (post.title ?? "").toLowerCase().includes(q)
  );

  return NextResponse.json(results);
}