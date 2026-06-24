"use server";

import db from "..";

export default async function getPosts() {
  const posts = await db.query.posts.findMany();

  if (!posts) {
    return { error: "No posts found" };
  }
  return { success: posts };
}
