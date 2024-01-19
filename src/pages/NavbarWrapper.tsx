import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/6 lg:w-1/4 md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="w-full md:w-5/6 lg:w-3/4 flex-shrink-0">
        <Outlet />
      </div>
    </div>
  );
}
