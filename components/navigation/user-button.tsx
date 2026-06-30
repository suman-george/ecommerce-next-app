"use client";

import { Session } from "next-auth";

import { signOut } from "next-auth/react";

const UserButton = ({ user }: { user: Session["user"] }) => {
  console.log(user);

  return (
    <div>
      {user?.email}
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserButton;
