import { auth } from "@/server/auth";
import UserButton from "./user-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Nav() {
  const session = await auth();
  console.log("user", session);
  return (
    <header className="py-8">
      <nav className=" ">
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/">Ecommerce App</Link>
          </li>
          {session?.user ? (
            <li>
              <UserButton user={session.user} />
            </li>
          ) : (
            <li>
              <Button asChild>
                <Link href="/auth/login" className="flex gap-2">
                  <LogIn />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
