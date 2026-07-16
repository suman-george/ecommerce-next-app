import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingCard from "./settings-card";

const Settings = async () => {
  const session = await auth();
  console.log("sessions", session);
  if (!session) redirect("/");

  return (
    <div className="py-8 space-y-6">
      <p>Welcome, {session.user?.name || session.user?.email}!</p>
      <SettingCard session={session} />
    </div>
  );
};

export default Settings;
