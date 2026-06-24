"use server";

import db from "..";
import { posts } from "../schema";
import { revalidatePath } from "next/cache";

export default async function createPosts(formData: FormData) {
  const title = formData.get("title")?.toString();
  if (!title) {
    return { error: "Title required" };
  }

  revalidatePath("/");
  const post = await db.insert(posts).values({
    title: title as string,
  });

  if (!post) {
    return { error: "Failed to create post" };
  }
  return { success: post };
}
