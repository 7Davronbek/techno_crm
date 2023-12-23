import {HashRouter, Route, Routes} from "react-router-dom";
import {
    AdminDocumentation,
    AdminLayout,
    AdminMonitoring,
    AdminTool,
    AdminUser,
    Main,
    ReceiverLayout,
    ReceiverUser
} from "./pages";
import {USER_ROLE} from "@/constants"
import {ToastContainer} from "react-toastify";
import AdminClientList from "./pages/admin/AdminClientList.tsx";
import ReceiverClientHistory from "./pages/receiver/ReceiverClientHistory.tsx";
import SpecialistLayout from "./pages/specialist/component/SpecialistLayout.tsx";
import SpecialistClient from "./pages/specialist/SpecialistClient.tsx";
import AccountantClient from "./pages/accountant/AccountantClient.tsx";
import AccountantLayout from "./pages/accountant/components/AccountantLayout.tsx";
import UserLayout from "./pages/user/components/UserLayout.tsx";
import UserSpecialist from "./pages/user/UserSpecialist.tsx";
import UserAccountant from "./pages/user/UserAccountant.tsx";
import UserPayment from "./pages/user/UserPayment.tsx";

function App() {
    const userRole = localStorage.getItem(USER_ROLE);
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    {userRole === "ROLE_ADMIN" && (
                        <>
                            <Route element={<AdminLayout/>}>
                                <Route path="/admin-monitoring" element={<AdminMonitoring/>}/>
                                <Route path="/admin-user" element={<AdminUser/>}/>
                                <Route path="/admin-client" element={<AdminClientList/>}/>
                                <Route path="/admin-client-history" element={<AdminClientList/>}/>
                                <Route path="/admin-documentation" element={<AdminDocumentation/>}/>
                                <Route path="/admin-tool" element={<AdminTool/>}/>
                            </Route>
                        </>
                    )}

                    {userRole === "ROLE_RECEIVER" && (
                        <>
                            <Route element={<ReceiverLayout/>}>
                                <Route path="/receiver-client" element={<AdminClientList/>}/>
                                <Route path="/add-user" element={<AdminUser/>}/>
                                {/*<Route path="/client-history" element={<ReceiverClientHistory/>}/>*/}
                            </Route>
                        </>
                    )}

                    {userRole === "ROLE_SPECIALIST" && (
                        <>
                            <Route element={<SpecialistLayout/>}>
                                <Route path="/specialist-client" element={<SpecialistClient/>}/>
                            </Route>
                        </>
                    )}

                    {userRole === "ROLE_ACCOUNTANT" && (
                        <>
                        <Route element={<AccountantLayout />}>
                            <Route path="/accountant-client" element={<AccountantClient />} />
                            <Route path="/accountant-tools" element={<AdminTool />} />
                        </Route>
                        </>
                    )}

                    {userRole === "ROLE_CLIENT" && (
                        <>
                            <Route element={<UserLayout />}>
                                <Route path="/client-receiver" element={<UserSpecialist />} />
                                <Route path="/client-accountant" element={<UserAccountant />} />
                                <Route path="/client-accountant" element={<UserPayment />} />
                            </Route>
                        </>
                    )}

                    <Route path="*" element={<Main/>}/>
                </Routes>
                <ToastContainer/>
            </HashRouter>
        </>
    )
}

export default App
