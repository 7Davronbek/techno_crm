import plus from "@/assets/plus.svg";
// import document from "@/assets/document.svg";
import closeEye from "@/assets/closeEye.svg";
import openEye from "@/assets/opneEye.svg";
import React, {useEffect, useState} from "react";
import http from "../../config";
import {toast} from "react-toastify";
import UserService from "../../service/UserService.tsx";
import IUserType from "../../types/IUserType.ts";
import {Loader} from "../../components/Loader.tsx";

const AdminUser = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);


    const [isPassword, setIsPassword] = useState<boolean>(true);
    const [active, setActive] = useState<boolean | undefined>(true);
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("ROLE_RECEIVER");

    const [users, setUsers] = useState<IUserType[]>([]);

    const createUser = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
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

    const updateUser = async (user: IUserType, id: number | undefined) => {
        setIsUser(true)
        await UserService.update(user, id)
            .then(() => {
                setIsUser(false)
                getAllUsers()

                setIsUpdate(false)
                toast.update(user.username + " has been updated")
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    const handleModal = (user: IUserType) => {
        setIsOpen(true)
        setIsUpdate(true)

        setPassword(user.password)
        setRole(String(user.role))
        setUsername(user.username)
        setFullName(user.fullName)
        setActive(user.active)

        // updateUser(user, user.id)
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
                        <h1>Пользователи</h1>
                        <button onClick={() => setIsOpen(true)} className="btn myBtn">
            <span>
              <img src={plus} alt=""/>
            </span>
                            Добавить клиент
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
                                                    <button onClick={() => handleModal(item)}
                                                            className="btn myBtn btn-update">Update
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)}
                                                            className="btn myBtn btn-delete">Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {/*<DataGrid*/}
                            {/*    rows={rows}*/}
                            {/*    columns={columns}*/}
                            {/*    pageSize={5}*/}
                            {/*    rowsPerPageOptions={[5]}*/}
                            {/*    disableSelectionOnClick*/}
                            {/*/>*/}
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

                                        <input value={active && "checked"}
                                               className="form-check d-flex mb-3"
                                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActive(e.target.value)}
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
                                <select defaultValue="receiver" onChange={e => setRole(e.target.value)} id="role"
                                        className="form-control">
                                    <option value="ROLE_RECEIVER">Receiver</option>
                                    <option value="ROLE_ACCOUNTANT">Accountant</option>
                                    <option value="ROLE_STAFF">Staff</option>
                                    <option value="ROLE_STANDARD">Uz Standard</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                            </div>

                        </div>
                        <div className="modalFooter">
                            {isUpdate ?
                                <button
                                    disabled={isLoading}
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