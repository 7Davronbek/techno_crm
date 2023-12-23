import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import logo from "@/assets/logo.svg";
import logout from "@/assets/logout.svg";
import {TOKEN, USER_ROLE} from "@/constants/index.js";
import MonitoringNavbar from "@/components/MonitoringLayout.tsx";

const SpecialistLayout = () => {
    const location: void = useLocation();
    const navigate: void = useNavigate();
    const logOut = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER_ROLE);
        navigate("/", {replace: true});
    };
    return (
        <div className="ReceivingLayout LayoutStyle">
            <div className="row">
                <div className="col-lg-2 left">
                    <div className="linkWrapper">
                        <Link to="/" className="logo">
                            <img src={logo} alt=""/>
                        </Link>
                        <Link
                            className={`link ${
                                location.pathname === "/specialist-client" && "active"
                            }`}
                            to="/specialist-client"
                        >
                            <span className="icon icon-list"></span>Список клиентов
                        </Link>
                        {/*<Link*/}
                        {/*    className={`link ${*/}
                        {/*        location.pathname === "/add-user" && "active"*/}
                        {/*    }`}*/}
                        {/*    to="/add-user"*/}
                        {/*>*/}
                        {/*    <span className="icon icon-user"></span>Добавить пользователя*/}
                        {/*</Link>*/}
                        {/*<Link*/}
                        {/*    className={`link ${*/}
                        {/*        location.pathname === "/client-history" && "active"*/}
                        {/*    }`}*/}
                        {/*    to="/client-history"*/}
                        {/*>*/}
                        {/*    <span className="icon icon-history"></span>История клиентов*/}
                        {/*</Link>*/}
                        {/*<Link*/}
                        {/*    className={`link ${*/}
                        {/*        location.pathname === "/documentation" && "active"*/}
                        {/*    }`}*/}
                        {/*    to="/documentation"*/}
                        {/*>*/}
                        {/*    <span className="icon icon-doc"></span>Документация*/}
                        {/*</Link>*/}
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

export default SpecialistLayout;
