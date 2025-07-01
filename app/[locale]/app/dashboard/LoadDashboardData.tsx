/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { getUser } from "@/services/auth/getUser";
import { useUser } from "@/stores/user.store";
import { UserType } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import { LoadingDashboard } from "./LoadingDashboard";

export const LoadDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const userStore = useUser((s) => s.user);
  const updateUser = useUser((s) => s.updateUser);
  const loadUser = useCallback(async () => {
    if (userStore?.id) {
      setLoading(false);
      return;
    }
    const user = (await getUser()) as UserType | null;
    if (user?.id) {
      updateUser(user);
    }
    setLoading(false);
  }, [userStore.id]);
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div>
      {loading ? (
        <LoadingDashboard></LoadingDashboard>
      ) : (
        <Dashboard></Dashboard>
      )}
    </div>
  );
};
