import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import logo from "@/assets/logo.svg";
import logout from "@/assets/logout.svg";
import {TOKEN, USER_ROLE} from "../../../constants";
import MonitoringNavbar from "../../../component/MonitoringLayout.tsx";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER_ROLE);
        navigate("/", {replace: true});
    };
    return (
        <div className="AdminLayout LayoutStyle">

            <div className="row">
                <div className="col-lg-2 left">
                    <div className="linkWrapper">
                        <Link to="/" className="logo">
                            <img src={logo} alt=""/>
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/admin-monitoring" && "active"
                            }`}
                            to="/admin-monitoring"
                        >
                            <span className="icon icon-monitoring"></span>Мониторинг
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/admin-user" && "active"
                            }`}
                            to="/admin-user"
                        >
                            <span className="icon icon-user"></span>Пользователи
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/admin-client" && "active"
                            }`}
                            to="/admin-client"
                        >
                            <span className="icon icon-list"></span>Клиенты
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/admin-client-history" && "active"
                            }`}
                            to="/admin-client-history"
                        >
                            <span className="icon icon-history"></span>История клиентов
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/admin-documentation" && "active"
                            }`}
                            to="/admin-documentation"
                        >
                            <span className="icon icon-doc"></span>Документация
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/admin-tool" && "active"
                            }`}
                            to="/admin-tool"
                        >
                            <span className="icon icon-tools"></span>Инструменты
                        </Link>
                    </div>
                    <button onClick={logOut} className="btn">
            <span>
              <img src={logout} alt=""/>
            </span>
                        Выход
                    </button>
                </div>
                <div className="col-lg-10 right">
                    <MonitoringNavbar/>
                    <Outlet/>
                </div>
            </div>

        </div>
    );
};

export default AdminLayout;