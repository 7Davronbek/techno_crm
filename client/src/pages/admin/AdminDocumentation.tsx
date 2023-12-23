import plus from "@/assets/plus.svg";
import update from "@/assets/update.svg";
import deleteIcon from "@/assets/delete.svg";
import {Loader} from "../../components/Loader.tsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import IDocumentType from "@/types/IDocumentType.ts";
import DocService from "../../service/DocService.ts";

const AdminDocumentation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDoc, setIsDoc] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    const [image, setImage] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<number>()

    const [docs, setDocs] = useState<IDocumentType[]>([]);

    const handleClose = () => {
        setIsUpdate(false);
        setIsOpen(false);
        setName("")
        setImage("")
    }

    const createDoc = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
        e.preventDefault()
        const data: IDocumentType = {
            imageUrl1: image,
            name
        }
        await DocService.create(data)
            .then(() => {
                toast.success("Document created.")
                getAllDocs();
                setIsOpen(false)
                setIsLoading(false)
                setIsUpdate(false);
                setImage("")
                setName("")
            })
            .catch((err: Error) => {
                toast.error(err);
                setIsLoading(false)
            })
    }

    const updateDoc = async () => {
        setIsLoading(true)
        const data: IDocumentType = {
            name,
            imageUrl1: image
        }
        await DocService.update(data, id)
            .then(() => {
                toast.info("Doc has been update")
                setIsLoading(false)
                setIsOpen(false)
                getAllDocs()
            }).catch((e: Error) => {
                toast.error(e);
                setIsLoading(false)
            })
    }

    const deleteDoc = async (id: number) => {
        setIsLoading(true)
        await DocService.delete(id)
            .then(() => {
                getAllDocs()
                setIsLoading(false)
                toast.info("Tool has been deleted")
            })
            .catch((e: Error) => {
                toast.error(e)
                setIsLoading(false)
            })
    }

    const getAllDocs = async () => {
        setIsDoc(true)
        await DocService.getAll()
            .then((res) => {
                setDocs(res.data);
                setIsDoc(false)
            })
            .catch((err: Error) => {
                toast.error(err);
                setIsDoc(false)
            })
    }

    const handleOpenModal = (item: IDocumentType) => {
        setIsUpdate(true);
        setIsOpen(true)

        setName(item.name)
        setImage(item.imageUrl1)
        setId(item.id)
    }

    useEffect(() => {
        getAllDocs();
    }, [])

    return (
        <>
            <div className="AdminDocumentation AdminUser RightStyle">
                <div className="cards">
                    <div className="btnWrap">
                        <h1>Documents</h1>
                        <span onClick={() => setIsOpen(true)} className="btn myBtn">
                            <span>
                              <img src={plus} alt=""/>
                            </span>
                            Add Document
                        </span>
                    </div>
                    <div className="cards mt-5">
                        <div className="row ">
                            {isDoc ? (
                                <Loader/>
                            ) : (
                                <>
                                    {docs &&
                                        docs.map((item: IDocumentType, index: number) => (
                                            <div key={index} className="cards col-lg-2 mb-3">
                                                <img src={item.imageUrl1} className="w-100" alt=""/>
                                                <h5 className="mt-2">{item.name}</h5>
                                                <div className="mt-3 text-end">
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="btn  "><img src={update} alt=""/>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDoc(item.id)}
                                                        className="btn "><img src={deleteIcon} alt=""/>
                                                    </button>

                                                </div>
                                            </div>
                                        ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {
                isOpen && (
                    <div className={`myModal ModalStyle ${isOpen && "active"}`}>
                        <form onSubmit={createDoc} className="AddClientModal h-100 zed">
                            <div className="modalTop">

                                <h1>Add Document</h1>
                            </div>
                            <div className="modalBody">
                                <div className="cards">

                                    <label className="mb-2" htmlFor="full_name">Name*</label>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        id="full_name"
                                        className='form-control mb-3' type="text"
                                    />

                                    <label className="mb-2" htmlFor="image">Image*</label>
                                    <input
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                        required
                                        id="image"
                                        className='form-control mb-3' type="text"
                                    />

                                </div>

                            </div>
                            <div className="modalFooter">

                                {isUpdate ?
                                    <button
                                        disabled={isLoading}
                                        onClick={updateDoc}
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
                )
            }
        </>
    )
        ;
};

export default AdminDocumentation;