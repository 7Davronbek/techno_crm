import plus from "@/assets/plus.svg";
import closeEye from "@/assets/closeEye.svg";
import openEye from "@/assets/opneEye.svg";
import  {useEffect, useState} from "react";
import http from "../../config";
import {toast} from "react-toastify";
import UserService from "../../service/UserService.tsx";
import updateIcon from "@/assets/update.svg"
import deleteIcon from "@/assets/delete.svg"
import IUserType from "../../types/IUserType.ts";
import {Loader} from "../../components/Loader.tsx";

const AdminUser = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);


    const [isPassword, setIsPassword] = useState<boolean>(true);
    const [active, setActive] = useState<boolean >(true);
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("ROLE_RECEIVER");
    const [id, setId] = useState<number>()

    const [users, setUsers] = useState<IUserType[]>([]);

    const createUser = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
        setIsUpdate(false)
        e.preventDefault();
        await http.post("/user", {
            username,
            password,
            role,
            fullName,
        })
            .then(() => {
                toast.success("User registered successfully.")
                setUsername("")
                setPassword("")
                setFullName("")
                setRole("ROLE_RECEIVER")
                setIsLoading(false)
                setIsOpen(false)
                setIsUpdate(false)
                getAllUsers()
            })
            .catch(() => {
                toast.error("Username is already exist. Network error")
                setIsLoading(false)
            })
    }

    const handleDelete = async (id: number | undefined) => {
        await UserService.delete(id)
            .then(() => {
                getAllUsers();

                toast.success("User has been deleted")
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    const getAllUsers = async () => {
        setIsUser(true)
        await UserService
            .getAll()
            .then((res) => {
                setIsUser(false)
                return setUsers(res.data);
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    const updateUser = async () => {
        setIsUser(true)
        const data: IUserType ={
            fullName,
            username,
            password,
            role,
            active
        }
        await UserService.update(data, id)
            .then(() => {
                setIsUser(false)
                getAllUsers()
                setIsOpen(false)

                setIsUpdate(false)
                toast.update("User has been updated")
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    const handleOpenModal = (user: IUserType) => {
        setIsOpen(true)
        setIsUpdate(true)

        setPassword(user.password)
        setRole(String(user.role))
        setUsername(user.username)
        setFullName(user.fullName)
        setActive(user.active)
        setId(user.id)
    }

    const handleClose = () => {
        setIsOpen(false);
        setIsUpdate(false);

        setUsername("")
        setPassword("")
        setFullName("")
        setRole("ROLE_RECEIVER")
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
            <div className="AdminUser RightStyle">
                <div className="cards">
                    <div className="btnWrap">
                        <h1>Users</h1>
                        <button onClick={() => setIsOpen(true)} className="btn myBtn">
            <span>
              <img src={plus} alt=""/>
            </span>
                            Add User
                        </button>
                    </div>
                    <div className="cards mt-5">
                        <div className="myTable " style={{height: 400, width: "100%"}}>
                            {isUser ? (
                                <Loader/>
                            ) : (
                                <table className="table TableStyle AdminTable">
                                    <thead>
                                    <tr>
                                        <td>№</td>
                                        <td>Username</td>
                                        <td>Full Name</td>
                                        <td>Created Date</td>
                                        <td>Role</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users &&
                                        users.map((item: IUserType, index: number) => (
                                            <tr
                                                key={item.id}
                                                // onClick={() => {
                                                //     getSingleOrder(item.id);
                                                // }}
                                                className={`${item.active ? "active" : "notActive"}`}
                                            >
                                                <th>{index + 1}</th>
                                                <td>@{item.username}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.created}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button onClick={() => handleOpenModal(item)}
                                                            className="btn "><img src={updateIcon} alt=""/>
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)}
                                                            className="btn "><img src={deleteIcon} alt=""/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {isOpen && (
                <div className={`myModal ModalStyle ${isOpen && "active"}`}>
                    <form onSubmit={createUser} className="AddClientModal h-100 zed">
                        <div className="modalTop">

                            <h1>{isUpdate ? "Update User" : "Add User"}</h1>
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

                                {isUpdate && (
                                    <>
                                        <label className="mb-2" htmlFor="active">Active</label>

                                        <input value={active}
                                               checked={active}
                                               className="form-check d-flex mb-3"
                                               onChange={e => setActive(e.target.checked)}
                                               type="checkbox" name="" id="active"/>
                                    </>
                                )}

                                {!isUpdate && (
                                    <>

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
                                    </>
                                )}

                                <label className="mb-2" htmlFor="role">Role</label>
                                <select value={role} onChange={e => setRole(e.target.value)} id="role"
                                        className="form-control">
                                    <option value="ROLE_RECEIVER">Receiver</option>
                                    <option value="ROLE_SPECIALIST">Specialist</option>
                                    <option value="ROLE_ACCOUNTANT">Accountant</option>
                                    {/*<option value="ROLE_DOC">Docs</option>*/}
                                    {/*<option value="ROLE_STANDARD">Uz Standard</option>*/}
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                            </div>

                        </div>
                        <div className="modalFooter">
                            {isUpdate ?
                                <button
                                    disabled={isLoading}
                                    onClick={updateUser}
                                    type="button"
                                    className="btn myBtn d-block w-100"
                                >
                                    {isLoading && (
                                        <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                                    )}
                                    <span>
                  <img src={plus} alt=""/>
                </span>
                                    Update
                                </button>
                                :
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
                            }
                        </div>
                    </form>
                    <div onClick={() => {
                        handleClose()
                    }} className="close"></div>
                </div>
            )}
        </>
    );
};

export default AdminUser;