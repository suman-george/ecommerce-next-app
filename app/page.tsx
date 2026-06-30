import Image from "next/image";
import getPosts from "@/server/actions/get-posts";
import createPosts from "@/server/actions/create-posts";
import PostButton from "@/components/post-button";

export default async function Home() {
  // const { error, success } = await getPosts();
  // if (error) {
  //   console.log(error);
  //   return;
  // }
  // if (success) {
  //   return (
  //     <main className="">
  //       {success.map((post) => (
  //         <div key={post.id}>{post.title}</div>
  //       ))}
  //       <form
  //         action={async (formData) => {
  //           "use server";
  //           await createPosts(formData);
  //         }}
  //       >
  //         <input type="text" name="title" className="bg-black" />
  //         <PostButton />
  //       </form>
  //     </main>
  //   );
  // }
}
