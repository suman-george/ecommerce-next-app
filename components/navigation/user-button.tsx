"use client";

import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserButton = ({ user }: { user: Session["user"] }) => {
  console.log(user);
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setChecked(!checked);
  };
  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="w-7 h-7">
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {user.image && (
              <div className="mb-4 p-4 flex flex-col gap-1 items-center rounded-lg  bg-primary/10">
                <Image
                  src={user.image}
                  alt={user.name!}
                  className="rounded-full"
                  width={36}
                  height={36}
                />
                <p className="font-bold text-xs">{user.name}</p>
                <span className="text-xs font-medium text-secondary-foreground">
                  {user.email}
                </span>
              </div>
            )}

            <DropdownMenuItem
              onClick={() => router.push("/dashboard/orders")}
              className="py-2 group font-medium cursor-pointer"
            >
              <TruckIcon
                size={14}
                className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
              />
              My orders
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="py-2 group font-medium cursor-pointer"
            >
              <Settings
                size={14}
                className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out"
              />
              Settings
            </DropdownMenuItem>
            {theme && (
              <DropdownMenuItem className="py-2 group font-medium cursor-pointer">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex item-center gap-2"
                >
                  {checked ? (
                    <Sun size={14} className="mt-1" />
                  ) : (
                    <Moon size={14} className="mt-1" />
                  )}

                  <p className=" mr-3 text-secondary-foreground/75   ">
                    {theme[0].toUpperCase() + theme.slice(1)} Mode
                  </p>
                  <Switch
                    className="scale-75"
                    checked={checked}
                    onCheckedChange={handleChangeTheme}
                  />
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="py-2 group focus:bg-destructive/30 font-medium cursor-pointer "
          >
            <LogOut
              size={14}
              className="mr-3  group-hover:scale-75 transition-all duration-300 ease-in-out"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default UserButton;
