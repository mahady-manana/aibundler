import { FC, ReactNode } from "react";
import Sidebar from "./SidebarLeft";
interface DashboardLayoutProps {
  children: ReactNode;
}
export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background2 text-foreground">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
