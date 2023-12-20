import plus from "@/assets/plus.svg";
import {Loader} from "../../components/Loader.tsx";
import IUserType from "../../types/IUserType.ts";
import {useState} from "react";
import {toast} from "react-toastify";
import IDocumentType from "@/types/IDocumentType.ts";

const AdminDocumentation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDoc, setIsDoc] = useState<boolean>(false);

    const [docs, setDocs] = useState<IDocumentType[]>([]);

    const handleClose = () => {
        setIsOpen(false);
    }

    const createDoc = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="AdminDocumentation AdminUser RightStyle">
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
                            {isDoc ? (
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
                                    {docs &&
                                        docs.map((item: IDocumentType, index: number) => (
                                            <tr
                                                key={index}
                                                // onClick={() => {
                                                //     getSingleOrder(item.id);
                                                // }}
                                                // className={`${item.active ? "active" : "notActive"}`}
                                            >
                                                <th>{index + 1}</th>
                                                {/*<td>{item.username}</td>*/}
                                                {/*<td>{item.fullName}</td>*/}
                                                {/*<td>{item.created}</td>*/}
                                                {/*<td>{item.role}</td>*/}
                                                <td>
                                                    <button
                                                        // onClick={() => handleModal(item)}
                                                        className="btn myBtn btn-update">Update
                                                    </button>
                                                    <button
                                                        // onClick={() => handleDelete(item.id)}
                                                        className="btn myBtn btn-delete">Delete
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
                    <form onSubmit={createDoc} className="AddClientModal h-100 zed">
                        <div className="modalTop">

                            <h1>Add Document</h1>
                        </div>
                        <div className="modalBody">
                            <div className="cards">

                                <label className="mb-2" htmlFor="full_name">Full name*</label>
                                <input
                                    // value={fullName}
                                    // onChange={e => setFullName(e.target.value)}
                                    required
                                    id="full_name"
                                    className='form-control mb-3' type="text"
                                />

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
                                Add Document
                            </button>
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

export default AdminDocumentation;