import plus from "@/assets/plus.svg";
import updateIcon from "@/assets/update.svg"
import deleteIcon from "@/assets/delete.svg"
import {Loader} from "../../components/Loader.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import IToolType from "../../types/IToolType.ts";
import ToolService from "../../service/ToolService.ts";

const AdminTool = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTool, setIsTool] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [name, setName] = useState<string>("")
    const [cipherNumber, setCipherNumber] = useState<string>("")
    const [count, setCount] = useState<number>(1)
    const [price, setPrice] = useState<number>(0)
    const [arrivalTime, setArrivalTime] = useState<string>("")
    const [id, setId] = useState<number>()

    const [tools, setTools] = useState<IToolType[]>([]);


    const createTool = async (e: { preventDefault: () => void; }) => {

        e.preventDefault()
        setIsLoading(true)
        const data: IToolType = {
            name,
            cipherNumber,
            count,
            arrivalTime,
            price
        }
        await ToolService.create(data)
            .then((res) => {
                getAllTools()
                setTools(res.data)

                setIsLoading(false)
                setIsOpen(false)
                setIsUpdate(false);

                getAllTools()
                toast.success("Tool created")

                setName("")
                setCipherNumber("")
                setCount(1)
                setPrice(0)
                setArrivalTime("")
            })
            .catch((e: Error) => {
                setIsLoading(false)
                toast.error(e);
            });
    }

    const deleteTool = async (id: number) => {
        setIsLoading(true)
        await ToolService.delete(id)
            .then(() => {
                getAllTools()
                setIsLoading(false)
                toast.info("Tool has been deleted")
            })
            .catch((e: Error) => {
                toast.error(e)
                setIsLoading(false)
            })
    }

    const updateTool = async () => {
        setIsLoading(true)
        const data: IToolType = {
            name,
            price,
            arrivalTime,
            count,
            cipherNumber
        }
        await ToolService.update(data, id)
            .then(() => {
                toast.info("Tool has been update")
                setIsLoading(false)
                setIsOpen(false)
                getAllTools()
            }).catch((e: Error) => {
                toast.error(e);
                setIsLoading(false)
            })
    }

    const handleOpenModal = (item: IToolType) => {
        setIsUpdate(true);
        setIsOpen(true)

        setName(item.name)
        setPrice(item.price)
        setArrivalTime(item.arrivalTime)
        setCount(item.count)
        setCipherNumber(item.cipherNumber)
        setId(item.id)
    }

    const handleClose = () => {
        setIsUpdate(false);
        setIsOpen(false);
        setName("")
        setCipherNumber("")
        setCount(1)
        setPrice(0)
        setArrivalTime("")
    }

    const getAllTools = async () => {
        setIsTool(true)
        await ToolService
            .getAll()
            .then((res) => {
                setIsTool(false)
                return setTools(res.data);
            })
            .catch((e: Error) => {
                setIsTool(false)
                toast.error(e);
            });
    }

    useEffect(() => {
        getAllTools()
    }, [])
    return (
        <>
            <div className="AdminDocumentation AdminUser RightStyle">
                <div className="cards">
                    <div className="btnWrap">
                        <h1>Tools</h1>
                        <button onClick={() => setIsOpen(true)} className="btn myBtn">
                            <span>
                              <img src={plus} alt=""/>
                            </span>
                            Add Tool
                        </button>
                    </div>
                    <div className="cards mt-5">
                        <div className="myTable " style={{height: 400, width: "100%"}}>
                            {isTool ? (
                                <Loader/>
                            ) : (
                                <table className="table TableStyle AdminTable">
                                    <thead>
                                    <tr>
                                        <td>№</td>
                                        <td>Name</td>
                                        <td>Cipher Number</td>
                                        <td>Count</td>
                                        <td>Arrival Time</td>
                                        <td>Price</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tools &&
                                        tools.map((item: IToolType, index: number) => (
                                            <tr
                                                key={index}
                                                // onClick={() => {
                                                //     getSingleOrder(item.id);
                                                // }}
                                                // className={`${item.active ? "active" : "notActive"}`}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.cipherNumber}</td>
                                                <td>{item.arrivalTime}</td>
                                                <td>{item.price}</td>
                                                <td>{item.count}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="btn "><img src={updateIcon} alt=""/>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteTool(item.id)}
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
                    <form onSubmit={createTool} className="AddClientModal h-100 zed">
                        <div className="modalTop">

                            <h1>{isUpdate ? "Update Tool" : "Add Tool"}</h1>
                        </div>
                        <div className="modalBody">
                            <div className="cards">

                                <label className="mb-2" htmlFor="full_name">Name</label>
                                <input
                                    value={name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    required
                                    id="full_name"
                                    className='form-control mb-3' type="text"
                                />

                                <label className="mb-2" htmlFor="full_name">Cipher Number</label>
                                <input
                                    value={cipherNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCipherNumber(e.target.value)}
                                    required
                                    id="full_name"
                                    className='form-control mb-3' type="text"
                                />

                                <label className="mb-2" htmlFor="full_name">Count</label>
                                <input
                                    value={count}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCount(e.target.value)}
                                    required
                                    id="full_name"
                                    className='form-control mb-3' type="number"
                                />

                                <label className="mb-2" htmlFor="full_name">Arrival Time</label>
                                <input
                                    value={arrivalTime}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setArrivalTime(e.target.value)}
                                    required
                                    id="full_name"
                                    className='form-control mb-3' type="date"
                                />

                                <label className="mb-2" htmlFor="full_name">Price</label>
                                <input
                                    value={price}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                                    required
                                    id="full_name"
                                    className='form-control mb-3' type="number"
                                />

                            </div>

                        </div>
                        <div className="modalFooter">

                            {isUpdate ?
                                <button
                                    disabled={isLoading}
                                    onClick={updateTool}
                                    type="button"
                                    className="btn myBtn d-block w-100"
                                >
                                    {isLoading && (
                                        <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                                    )}
                                    <span>
                                  <img src={plus} alt=""/>
                                </span>
                                    Update Document
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
                                    Add Document
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

export default AdminTool;