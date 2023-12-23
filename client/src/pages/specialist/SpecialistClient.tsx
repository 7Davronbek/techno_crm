import plus from "@/assets/plus.svg";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Loader} from "../../components/Loader.tsx";
import ClientService from "../../service/ClientService.ts";
import IClientType from "../../types/IClientType.ts";
import ToolService from "../../service/ToolService.ts";
import IToolType from "../../types/IToolType.ts";

interface Item {
    name: number;
}

const SpecialistClient: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);


    const [clients, setClients] = useState<IClientType[]>([]);
    const [tools, setTools] = useState<IToolType[]>([]);
    const [client, setClient] = useState<IClientType>();

    const [items, setItems] = useState<Item[]>([]);

    const addItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newItem: Item = {
            name: Number(e.target.value),
        };

        setItems(prevItems => [...prevItems, newItem]);
    };

    const getSingle = (item: IClientType) => {
        setClient(item);
        setIsOpen(true)
    }

    const createClient = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
        e.preventDefault();
        const numbers = items.map(item => item.name);
        await ClientService.createTool(numbers, client?.id)
            .then(() => {
                toast.success("Client registered successfully.")

                setIsLoading(false)
                setIsOpen(false)
                getAllClients()
            })
            .catch(() => {
                toast.error("Network error")
                setIsLoading(false)
            })
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const getAllTool = async () => {
        await ToolService.getAll()
            .then((res) => {
                setTools(res.data)
            })
            .catch(() => {
                toast.error("Network error")
            })
    }

    const getAllClients = async () => {
        setIsUser(true)
        await ClientService
            .getAllSpecialist()
            .then((res) => {
                setIsUser(false)
                return setClients(res.data);
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    useEffect(() => {
        getAllClients()
        getAllTool()
    }, [])

    return (
        <>
            <div className="AdminUser RightStyle">
                <div className="cards">
                    <div className="btnWrap">
                        <h1>Clients</h1>
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
                                        <td>Organisation</td>
                                        <td>Date</td>
                                        <td>Phone number</td>
                                        <td>Counting mechanism</td>
                                        <td>Serial Number</td>
                                        <td>Status</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {clients &&
                                        clients.map((item: IClientType, index: number) => (
                                            <tr
                                                key={item.id}
                                                className={`${item.paid ? "active" : "notActive"}`}
                                                onClick={() => getSingle(item)}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{item.orgName}</td>
                                                <td>{item.date}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.countingMechanism}</td>
                                                <td>{item.serialNumber}</td>
                                                <td>{item.status}</td>
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
                    <form className="AddClientModal h-100 zed">
                        <div className="modalTop">

                            <h1>Update Client</h1>
                        </div>
                        <div className="modalBody">
                            <div className="formWrap">
                                <label htmlFor="Наименование организации:">
                                    Наименование организации:
                                </label>
                                <input
                                    required
                                    value={client?.orgName}
                                    disabled
                                    type="text"
                                    id="Наименование организации:"
                                    className="form-control"
                                />
                            </div>
                            <div className="formWrap">
                                <label htmlFor="Дата">Дата</label>
                                <input
                                    required
                                    value={client?.date}
                                    disabled
                                    id="Дата"
                                    type="datetime-local"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Заводские номера: датчик давления:">
                                    Заводские номера: датчик давления:
                                </label>
                                <input
                                    required
                                    value={client?.serialNumber}
                                    disabled
                                    type="text"
                                    id="Заводские номера: датчик давления:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="датчик температуры:">Датчик температуры:</label>
                                <input
                                    required
                                    value={client?.temperature}
                                    disabled
                                    type="text"
                                    id="датчик температуры:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Сертификат последней поверки:">
                                    Сертификат последней поверки:
                                </label>
                                <select
                                    defaultChecked={client?.lastVerification}
                                    disabled
                                    id="Сертификат последней поверки:"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Паспорта газового счетчика:">
                                    Паспорта газового счетчика:
                                </label>
                                <select
                                    defaultChecked={client?.gasPassport}
                                    disabled
                                    id="Паспорта газового счетчика:"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Паспорт блока коррекции:">
                                    Паспорт блока коррекции:
                                </label>
                                <select
                                    defaultChecked={client?.correctionPassport}
                                    disabled
                                    id="Паспорт блока коррекции:"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label
                                    htmlFor="Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос. поверку с показаниями
счетчика, печатью или штампом:"
                                >
                                    Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос.
                                    поверку с показаниями счетчика, печатью или штампом:
                                </label>
                                <select
                                    defaultChecked={client?.lastVerification}
                                    disabled
                                    id="Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос. поверку с показаниями
счетчика, печатью или штампом:"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label
                                    htmlFor="Техническое состояние счетчика при поступлении в метрологический центр «GAZ TEXNO PRIBOR» МЧЖ.
Наличие пломб: счетный механизм"
                                >
                                    Техническое состояние счетчика при поступлении в
                                    метрологический центр «GAZ TEXNO PRIBOR» МЧЖ. Наличие пломб:
                                    счетный механизм
                                </label>
                                <select
                                    id="Техническое состояние счетчика при поступлении в метрологический центр «GAZ TEXNO PRIBOR» МЧЖ.
Наличие пломб: счетный механизм"
                                    className="form-control"
                                    defaultChecked={client?.emergencySituations}
                                    disabled
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="блок коррекции ДР">блок коррекции ДР</label>
                                <select
                                    defaultChecked={client?.lastVerification}
                                    disabled
                                    id="блок коррекции ДР"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="ДТ">ДТ</label>
                                <select
                                    defaultChecked={client?.DT}
                                    disabled
                                    id="ДТ"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="ДД">ДД</label>
                                <select
                                    defaultChecked={client?.DD}
                                    disabled
                                    id="ДД"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label
                                    htmlFor="Er 3000000
Внештатные ситуации:"
                                >
                                    Er 3000000 Внештатные ситуации:
                                </label>
                                <select
                                    id="Er 3000000
Внештатные ситуации:"
                                    className="form-control"
                                    defaultChecked={client?.emergencySituations}
                                    disabled
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Визуальные повреждения:">
                                    Визуальные повреждения:
                                </label>
                                <select
                                    defaultChecked={client?.visualDamage}
                                    disabled
                                    id="Визуальные повреждения:"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Механические повреждения:">
                                    Механические повреждения:
                                </label>
                                <select
                                    defaultChecked={client?.mechanicalDamage}
                                    disabled
                                    id="Механические повреждения:"
                                    className="form-control"
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Заключения:">Заключения:</label>
                                <input
                                    required
                                    value={client?.conclusions}
                                    disabled
                                    type="text"
                                    id="Заключения:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Показания:">Показания:</label>
                                <input
                                    required
                                    value={client?.indications}
                                    disabled
                                    type="text"
                                    id="Показания:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Счетного механизма:">Счетного механизма:</label>
                                <input
                                    required
                                    value={client?.countingMechanism}
                                    disabled
                                    type="text"
                                    id="Счетного механизма:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Номер телефона">Номер телефона</label>
                                <input
                                    required
                                    value={client?.phoneNumber}
                                    disabled
                                    type="text"
                                    id="Номер телефона"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="checkbox">Is Paid</label>
                                <input
                                    checked={client?.conclusions}
                                    value={client?.conclusions}
                                    disabled
                                    type="checkbox"
                                    id="checkbox"
                                    className="form-check"
                                />
                            </div>

                            <select className="form-control" onChange={addItems}>
                                <option >
                                    Choose tool
                                </option>
                                {tools && tools.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {items && items.map((item, index) => (
                                <p key={index}>{item.name}</p>
                            ))}
                        </div>
                        <div className="modalFooter">
                            <button
                                disabled={isLoading}
                                onClick={createClient}
                                type="button"
                                className="btn myBtn d-block w-100"
                            >
                                {isLoading && (
                                    <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                                )}
                                <span>
                                      <img src={plus} alt=""/>
                                    </span>
                                Update Client
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

export default SpecialistClient;