import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  redirect("/dashboard/settings");
};

export default DashboardPage;
