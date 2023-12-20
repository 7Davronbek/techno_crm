import logo from "@/assets/logo.svg";
import closeEye from "@/assets/closeEye.svg";
import openEye from "@/assets/opneEye.svg";
import {useState} from "react";
import {Link} from "react-router-dom";

const Main = () => {

    const [password, setPassword] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logIn = async (e) => {
        e.preventDefault();
    }

    return (
        <>
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

                                <Link to="/admin-monitoring" className="btn myBtn" type="submit">
                                    {isLoading && (
                                        <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                                    )}
                                    Войти
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;