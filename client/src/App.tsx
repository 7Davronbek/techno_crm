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
import {ToastContainer} from "react-toastify";

function App() {
    const userRole = "ROLE_RECEIVER";
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
                                <Route path="/admin-documentation" element={<AdminDocumentation/>}/>
                                <Route path="/admin-tool" element={<AdminTool/>}/>
                            </Route>
                        </>
                    )}

                    {userRole === "ROLE_RECEIVER" && (
                        <>
                            <Route element={<ReceiverLayout/>}>
                                <Route path="/receiver-client" element={<ReceiverUser/>}/>
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
