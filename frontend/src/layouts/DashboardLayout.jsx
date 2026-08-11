import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = () => {

    return (

        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <main className="flex-1 p-8 overflow-y-auto">

                <Outlet />

            </main>

        </div>

    );

};

export default DashboardLayout;