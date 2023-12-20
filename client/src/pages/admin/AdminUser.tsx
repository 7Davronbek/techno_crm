import plus from "@/assets/plus.svg";
import document from "@/assets/document.svg";
import closeEye from "@/assets/closeEye.svg";
import openEye from "@/assets/opneEye.svg";
import {useState} from "react";
import http from "../../config";
import {toast} from "react-toastify";

const AdminUser = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [isPassword, setIsPassword] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("ROLE_RECEIVER");

    const createUser = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
        e.preventDefault();
        await http.post("/user", {
            username,
            password,
            role,
            full_name: fullName,
            is_active: true
        })
            .then(() => {
                toast.success("User registered successfully.")
                setUsername("")
                setPassword("")
                setFullName("")
                setRole("receiver")
                setIsLoading(false)
                setIsOpen(false)
            })
            .catch(() => {
                toast.error("Username is already exist. Network error")
                setIsLoading(false)
            })
    }

    const getAllUsers = async () => {
    }

    return (
        <>
            <div className="AdminUser RightStyle">
                <div className="cards">
                    <div className="btnWrap">
                        <h1>Пользователи</h1>
                        <button onClick={() => setIsOpen(true)} className="btn myBtn">
            <span>
              <img src={plus} alt=""/>
            </span>
                            Добавить клиент
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={`myModal ModalStyle ${isOpen && "active"}`}>
                    <form onSubmit={createUser} className="AddClientModal h-100 zed">
                        <div className="modalTop">
                            <h1>Добавить пользователя</h1>
                        </div>
                        <div className="modalBody">
                            <div className="cards">

                                <label className="mb-2" htmlFor="full_name">Full name*</label>
                                <input value={fullName} onChange={e => setFullName(e.target.value)} required
                                       id="full_name"
                                       className='form-control mb-3' type="text"/>

                                <label className="mb-2" htmlFor="username">Username*</label>
                                <input value={username} onChange={e => setUsername(e.target.value)} required
                                       id="username"
                                       className='form-control mb-3' type="text"/>

                                <label className="mb-2" htmlFor="password">Password*</label>

                                <div className="inputWrap mb-3">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        type={isPassword ? "password" : "text"}
                                        id="password"
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

                                <label className="mb-2" htmlFor="role">Role</label>
                                <select defaultValue="receiver" onChange={e => setRole(e.target.value)} id="role"
                                        className="form-control">
                                    <option value="ROLE_RECEIVER">Принимающий</option>
                                    <option value="specialist">Специалист</option>
                                    <option value="accountant">Бухгалтер</option>
                                    <option value="client">Client</option>
                                    <option value="uz_standard">Uz Standard</option>
                                    <option value="inspector_1">Inspector 1</option>
                                    <option value="inspector_2">Inspector 2</option>
                                    <option value="sten">в стенд</option>
                                </select>
                            </div>

                        </div>
                        <div className="modalFooter">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="btn myBtn d-block w-100"
                            >
                                {isLoading && (
                                    <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                                )}
                                <span>
                  <img src={plus} alt=""/>
                </span>
                                Добавить клиент
                            </button>
                        </div>
                    </form>
                    <div onClick={() => setIsOpen(false)} className="close"></div>
                </div>
            )}
        </>
    );
};

export default AdminUser;