import logo from "@/assets/logo.svg";
import closeEye from "@/assets/closeEye.svg";
import openEye from "@/assets/opneEye.svg";
import {useState} from "react";

// import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import "@/style/second.scss";
import axios from "@/config"
import {TOKEN, USER_ROLE} from "@/constants"
import {NavigateFunction, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Main = () => {
    // const pdfExportComponent = useRef(null);
    // const [layoutSelection, setLayoutSelection] = useState({
    //     text: "A4",
    //     value: "size-a4",
    // });
    //
    // const handleExportWithComponent = (event) => {
    //     pdfExportComponent.current.save();
    // };

    const [password, setPassword] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();

    const logIn = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
        e.preventDefault();
        const data = {
            username: login,
            password
        }
        await axios.post("/user/login", data)
            .then((res: any) => {
                setIsLoading(false)
                localStorage.setItem(TOKEN, res.data.id)
                localStorage.setItem(USER_ROLE, res.data.role);
                if(res.data.role === "ROLE_ADMIN") {
                    navigate("/admin-monitoring", {replace: true})
                    window.location.reload();
                } else if(res.data.role === "ROLE_RECEIVER"){
                    navigate("/receiver-client", {replace: true})
                    window.location.reload();
                }else if(res.data.role === "ROLE_SPECIALIST"){
                    navigate("/specialist-client", {replace: true})
                    window.location.reload();
                }else if(res.data.role === "ROLE_ACCOUNTANT"){
                    navigate("/accountant-client", {replace: true})
                    window.location.reload();
                }else if(res.data.role === "ROLE_CLIENT"){
                    navigate("/client-receiver", {replace: true})
                    window.location.reload();
                }

            }).catch(() => {
                toast.error("Username or password is wrong.")
                setIsLoading(false)
            })
    }

    return (
        <>
            {/*<div className="page-container hidden-on-narrow">*/}

            {/*    <button className="btn" onClick={handleExportWithComponent}>*/}
            {/*        Export PDF*/}
            {/*    </button>*/}
            {/*<PDFExport ref={pdfExportComponent}>*/}
            {/*    <div className={`pdf-page ${layoutSelection.value}`}>*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid autem eaque, facere harum molestias obcaecati perferendis sunt unde voluptas! Accusantium aliquid culpa dolore, excepturi harum labore omnis sit temporibus!*/}
            {/*        <div className="inner-page">*/}
            {/*            <div className="in_top">*/}
            {/*                <div className="in_top_box">*/}
            {/*                    <img className="in_logo" src="/img/logo.png" alt="" />*/}
            {/*                    <div className="in_top_box_main">*/}
            {/*                        <div className="in_top_item">*/}
            {/*                            <div className="in_top_item_h">Здание</div>*/}
            {/*                            <div className="in_top_item_p">1</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="in_top_item ">*/}
            {/*                            <div className="in_top_item_h">подъезд</div>*/}
            {/*                            <div className="in_top_item_p">1</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="in_top_item">*/}
            {/*                            <div className="in_top_item_h">Этаж</div>*/}
            {/*                            <div className="in_top_item_p">8</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="in_top_item ">*/}
            {/*                            <div className="in_top_item_h">Дом</div>*/}
            {/*                            <div className="in_top_item_p">№ 40</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="in_top_item">*/}
            {/*                            <div className="in_top_item_h">Состояние</div>*/}
            {/*                            <div className="in_top_item_p">Без ремонта</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <img className="in_logo_2" src="/img/logo_2.png" alt="" />*/}
            {/*            </div>*/}

            {/*            <div className="in_box_text">*/}
            {/*                <div className="in_box_img">*/}
            {/*                    <div className="mt-1 in_box_images  w-100">*/}
            {/*                        <img*/}
            {/*                            className="in_box_in_img w-50"*/}
            {/*                            src="/img/26.1.png"*/}
            {/*                            alt=""*/}
            {/*                        />*/}
            {/*                        <img className="in_box_in_img " src="/img/26.png" alt="" />*/}
            {/*                    </div>*/}
            {/*                    <div className="in_box_text_2">*/}
            {/*                        <div className="in_text_2_h">Адрес:</div>*/}
            {/*                        <div className="in_text_2_p_2">*/}
            {/*                            {" "}*/}
            {/*                            111018, Ташкентский область, Ташкентский район, ул. Куйи*/}
            {/*                            Кук-Терак 95*/}
            {/*                        </div>*/}
            {/*                        <div className="in_text_2_h">Колл-центр :</div>*/}
            {/*                        <div className="in_text_2_p">+ 998 (88) 113 00 50</div>*/}
            {/*                        <div className="in_text_2_p">+ 998 (88) 202 00 05</div>*/}
            {/*                        <div className="in_text_2_h">Уважаемый клиент:</div>*/}
            {/*                        <div className="in_text_2_p">Миржалол</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="in_text">*/}
            {/*                    <div className="in_text_main">*/}
            {/*                        <div className="in_text_h">Количество комнат:</div>*/}
            {/*                        <div className="in_text_p in_text_p_active">1x</div>*/}
            {/*                        <div className="in_text_h">Общая площадь:</div>*/}
            {/*                        <div className="in_text_p in_text_p_active">37.4 м2</div>*/}
            {/*                        /!* <div className={`in_text_h`}>Площадь Террасы:</div>*/}
            {/*        <div className={`in_text_p `}>2.6 м2</div> *!/*/}
            {/*                        <div className="in_text_h">Цена за м2:</div>*/}
            {/*                        <div className="in_text_p">630 $</div>*/}
            {/*                        /!* <div className={`in_text_h`}>Цена за м2 террасы:</div> *!/*/}
            {/*                        /!* <div className={`in_text_p `}>310 $</div> *!/*/}
            {/*                    </div>*/}

            {/*                    <div className="in_text_main_2">*/}
            {/*                        <div className="in_text_h_2">Первоначaльный платеж:</div>*/}
            {/*                        <div className="in_text_p_2">0 $</div>*/}
            {/*                        <div className="in_text_h_2">Сумма остатка:</div>*/}
            {/*                        <div className="in_text_p_2">23,562 $ </div>*/}
            {/*                        <div className="in_text_h_2">Ежемесячно оплата:</div>*/}
            {/*                        <div className="in_text_p_2"> 1 - месяц - 1712 $</div>*/}
            {/*                        <div className="in_text_p_2 mt-1">23 - месяц - 950 $</div>*/}
            {/*                        <div className="in_text_h_2 mt-5">Cумма продажи:</div>*/}
            {/*                        <div className="in_text_p_2 in_text_p_3">23,562 $</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</PDFExport>*/}
            {/*</div>*/}


            <div className="Main">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-12 ">
                            <div className="logo">
                                <img src={logo} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-5 mx-auto h-100 myCol">
                            <form onSubmit={logIn} className="cards">
                                <h1>Вход</h1>
                                <label htmlFor="Логин">Логин</label>
                                <input
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    required
                                    type="text"
                                    id="Логин"
                                    className="form-control mb-3"
                                />

                                <div className="inputWrap">
                                    <label htmlFor="Пароль">Пароль</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        type={isPassword ? "password" : "text"}
                                        id="Пароль"
                                        className="form-control"
                                    />
                                    {isPassword ? (
                                        <div
                                            onClick={() => setIsPassword(false)}
                                            className="openEye eye"
                                        >
                                            <img src={openEye} alt=""/>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => setIsPassword(true)}
                                            className="closeEye eye"
                                        >
                                            <img src={closeEye} alt=""/>
                                        </div>
                                    )}
                                </div>

                                <button className="btn myBtn" type="submit">
                                    {isLoading && (
                                        <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                                    )}
                                    Войти
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;