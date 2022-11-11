import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import Sidebar from "./Sidebar";

export default function DefaultLayout({ children }: { children?: any }): any {
  const [loading, setLoding] = useState(false);

  return (
    <div className="flex w-screen h-screen overflow-y-auto">
      {loading ? <Loading loading={true} /> : <Loading loading={false} />}
      <div className="w-64 h-fullß bg-gray-800">
        <Sidebar />
      </div>
      {/* <div className="block md:ml-64 bg-gray-100 overflow-y-auto"> */}
      <div className="w-full bg-slate-100 overflow-x-auto lg:px-10 py-10 px-5">
        {/* {children} */}
        <Outlet />
      </div>
    </div>
  );
}
