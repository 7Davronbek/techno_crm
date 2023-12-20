import {HashRouter, Route, Routes} from "react-router-dom";
import {AdminLayout, AdminMonitoring, AdminUser, Main} from "./pages";
import {ToastContainer} from "react-toastify";

function App() {
    const userRole = "ADMIN";
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    {userRole === "ADMIN" && (
                        <>
                            <Route element={<AdminLayout/>}>
                                <Route path="/admin-monitoring" element={<AdminMonitoring/>}/>
                                <Route path="/admin-user" element={<AdminUser/>}/>
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
