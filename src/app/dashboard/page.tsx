"use client";
import { api } from "../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

function Dashboard() {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();

  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div className="p-8">
      <Header />

      <FileList />
    </div>
  );
}

export default Dashboard;
