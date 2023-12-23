import {Link, Outlet, useNavigate} from "react-router-dom";
import logo from "@/assets/logo.svg";
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import UserService from "../../../service/UserService.ts";
import MonitoringNavbar from "../../../components/MonitoringLayout.tsx";

const UserLayout = () => {
    const [client, setClient] = useState([]);
    const nav = useNavigate();

    const getClient = useCallback(async () => {
        try {
            await UserService.get()
                .then((res) => {
                    setClient(res.data);
                    if (res.data) {
                        if (res.data.role === "RECEIVER") {
                            nav("/client-receiver");
                        }
                        if (res.data.role === "SPECIALIST") {
                            nav("/client-specialist");
                        }
                        if (res.data.role === "ACCOUNTANT") {
                            nav("/client-accountant");
                        }
                        if (res.data.role === "PAYMENT") {
                            nav("/client-accountant");
                        }
                        // if (res.data.role === "DOC") {
                        //     nav("/client-docs");
                        // }
                        if (res.data.role === "END") {
                            nav("/client-end");
                        }
                    }
                })
        } catch (error) {
            toast.error("Error getting client:", error);
        }
    }, []);

    useEffect(() => {
        getClient();
    }, [getClient]);

    return (
        <div className="ClientLayout LayoutStyle">
            <div className="row">
                <div className="col-lg-2 left">
                    <Link to="/" className="logo">
                        <img src={logo} alt=""/>
                    </Link>

                    <div
                        className={`wrap ${
                            client.status === "RECEIVER" ||
                            client.status === "SPECIALIST" ||
                            client.status === "ACCOUNTANT" ||
                            client.status === "PAYMENT" ||
                            client.status === "DOCS" ||
                            client.status === "END"
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line"></div>
                        <div>
                            <h3>Принимающий</h3>
                            <h4>
                                Происходит внешний осмотр счетчика и отправляется к специалисту
                            </h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${
                            client[0]?.status === "SPECIALIST" ||
                            client[0]?.status === "ACCOUNTANT" ||
                            client[0]?.status === "PAYMENT" ||
                            client[0]?.status === "DOCS" ||
                            client[0]?.status === "END" 
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line h-105"></div>
                        <div>
                            <h3>Специалист</h3>
                            <h4>
                                Специалист производит внутренний осмотр счётчик и заполняет
                                нужные данные (нужные запчасти и другие данные) по форме.
                            </h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${
                            client[0]?.status === "ACCOUNTANT" ||
                            client[0]?.status === "PAYMENT" ||
                            client[0]?.status === "DOCS" ||
                            client[0]?.status === "END"
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line"></div>
                        <div>
                            <h3>Бухгалтер</h3>
                            <h4>Бухгалтер заполняет ценами запчастей и других услуг</h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${
                            client[0]?.status === "PAYMENT" ||
                            client[0]?.status === "DOCS" ||
                            client[0]?.status === "END"
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line"></div>
                        <div>
                            <h3>Оплата</h3>
                            <h4>
                                Оплачитите за услуги в виде онлайн оплаты (Click , Payme) или в
                                виде наличные.
                            </h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${
                            client[0]?.status === "DOCS" ||
                            client[0]?.status === "END"
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line h-105"></div>
                        <div>
                            <h3>Специалист 2</h3>
                            <h4>
                                Специалист производит внутренний осмотр счётчик и заполняет
                                нужные данные (нужные запчасти и другие данные) по форме.
                            </h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${
                            client[0]?.status === "END"
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line"></div>
                        <div>
                            <h3>Pабота над счетчиком</h3>
                            <h4>Pачинается внутренний осмотр и работа над счетчиком</h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${
                            client[0]?.status === "docs" || client[0]?.status === "end"
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div className="line"></div>
                        <div>
                            <h3>B стенд</h3>
                            <h4>Начинается внутренний осмотр и работа над счетчиком</h4>
                        </div>
                    </div>

                    <div
                        className={`wrap ${client[0]?.status === "end" ? "active" : ""}`}
                    >
                        <div className="iconWrap">
                            <span className="icon icon-dot"></span>
                        </div>
                        <div>
                            <h3>Документация</h3>
                            <h4>Начинается внутренний осмотр и работа над счетчиком</h4>
                        </div>
                    </div>
                </div>

                <div className="col-lg-10 right">
                    <MonitoringNavbar/>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
