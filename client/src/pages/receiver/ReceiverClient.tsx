import plus from "@/assets/plus.svg";
// import document from "@/assets/document.svg";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Loader} from "../../components/Loader.tsx";
import ClientService from "../../service/ClientService.ts";
import IClientType from "../../types/IClientType.ts";

const ReceiverUser = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);


    const [name_org, setNameOrg] = useState<string>("");
    const [created_time, setCreatedTime] = useState<string>("");
    // const [meter_brand, setMeterBrand] = useState<string>("");
    const [serial_number, setSerialNumber] = useState<string>("");
    const [temp_sensor, setTemp_sensor] = useState<string>("");
    const [conclusion, setConclusion] = useState<string>("");
    const [indications, setIndications] = useState<string>("");
    const [counting_mechanism, setCounting_mechanism] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [latest_certificate, setLatestCertificate] = useState<string>("yes");
    const [passport_meter, setPassportMeter] = useState<string>("yes");
    const [correction_block_passport, setCorrectionBlockPassport] =
        useState<string>("yes");
    const [verification_with_stamp, setVerification_with_stamp] =
        useState<string>("yes");
    const [gaz_pribor_stamp, setGaz_pribor_stamp] = useState<string>("yes");
    const [block_correction_dp, setBlock_correction_dp] = useState<string>("yes");
    const [dt, setDt] = useState<string>("yes");
    const [dd, setDd] = useState<string>("yes");
    const [er_300000, setEr_300000] = useState<string>("yes");
    const [visual_damage, setVisual_damage] = useState<string>("yes");
    const [mechanical_damage, setMechanical_damage] = useState<string>("yes");
    const [isPaid, setIsPaid] = useState<string>("yes");

    const [client, setClient] = useState<IClientType[]>([]);

    const createUser = async (e: { preventDefault: () => void; }) => {
        setIsLoading(true)
        e.preventDefault();
        const data: IClientType = {
            orgName: name_org,
            date: created_time,
            serialNumber: serial_number,
            temperature: temp_sensor,
            conclusions: conclusion,
            indications,
            countingMechanism: counting_mechanism,
            phoneNumber: phone,

            isPaid: isPaid === "yes",
            lastVerification: latest_certificate === "yes",
            gasPassport: passport_meter === "yes",
            correctionPassport: correction_block_passport === "yes",
            act: gaz_pribor_stamp === "yes",
            technicalCondition: er_300000 === "yes",
            DR: block_correction_dp === "yes",
            DT: dt === "yes",
            DD: dd === "yes",
            emergencySituations: verification_with_stamp === "yes",
            visualDamage: visual_damage === "yes",
            mechanicalDamage: mechanical_damage === "yes"

        }
        await ClientService.create(data)
            .then(() => {
                getAllClients()
            })
            .catch(() => {
                toast.error("Username is already exist. Network error")
                setIsLoading(false)
            })
    }

    const handleDelete = async (id: number | undefined) => {
        setIsLoading(true)
        await ClientService.delete(id)
            .then(() => {
                setIsLoading(false)
                getAllClients();

                toast.success("Client has been deleted")
            })
            .catch((e: Error) => {
                setIsLoading(false)
                toast.error(e);
            });
    }

    const getAllClients = async () => {
        setIsUser(true)
        await ClientService
            .getAll()
            .then((res) => {
                setIsUser(false)
                return setClient(res.data);
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
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
        getAllClients()
    }, [])

    return (
        <>
            <div className="AdminUser RightStyle">
                <div className="cards">
                    <div className="btnWrap">
                        <h1>Clients</h1>
                        <button onClick={() => setIsOpen(true)} className="btn myBtn">
                            <span>
                              <img src={plus} alt=""/>
                            </span>
                            Add Client
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
                                        <td>Org Name</td>
                                        <td>Serial Number</td>
                                        <td>Created Date</td>
                                        <td>Temperature</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {client &&
                                        client.map((item: IClientType, index: number) => (
                                            <tr
                                                key={item.id}
                                                // onClick={() => {
                                                //     getSingleOrder(item.id);
                                                // }}
                                                className={`${item.active ? "active" : "notActive"}`}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{item.orgName}</td>
                                                <td>{item.serialNumber}</td>
                                                <td>{item.date}</td>
                                                <td>{item.temperature}</td>
                                                <td>
                                                    <button
                                                        // onClick={() => handleModal(item)}
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
                            <div className="formWrap">
                                <label htmlFor="Наименование организации:">
                                    Наименование организации:
                                </label>
                                <input
                                    required
                                    value={name_org}
                                    onChange={(e) => setNameOrg(e.target.value)}
                                    type="text"
                                    id="Наименование организации:"
                                    className="form-control"
                                />
                            </div>
                            <div className="formWrap">
                                <label htmlFor="Дата">Дата</label>
                                <input
                                    required
                                    value={created_time}
                                    onChange={(e) => setCreatedTime(e.target.value)}
                                    id="Дата"
                                    type="datetime-local"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                {/*<label htmlFor="Марка счетчика газа:">*/}
                                {/*    Марка счетчика газа:*/}
                                {/*</label>*/}
                                {/*<input*/}
                                {/*    required*/}
                                {/*    value={meter_brand}*/}
                                {/*    onChange={(e) => setMeterBrand(e.target.value)}*/}
                                {/*    type="text"*/}
                                {/*    id="Марка счетчика газа:"*/}
                                {/*    className="form-control"*/}
                                {/*/>*/}
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Заводские номера: датчик давления:">
                                    Заводские номера: датчик давления:
                                </label>
                                <input
                                    required
                                    value={serial_number}
                                    onChange={(e) => setSerialNumber(e.target.value)}
                                    type="text"
                                    id="Заводские номера: датчик давления:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="датчик температуры:">Датчик температуры:</label>
                                <input
                                    required
                                    value={temp_sensor}
                                    onChange={(e) => setTemp_sensor(e.target.value)}
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
                                    onChange={(e) => setLatestCertificate(e.target.value)}
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
                                    onChange={(e) => setPassportMeter(e.target.value)}
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
                                    onChange={(e) => setCorrectionBlockPassport(e.target.value)}
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
                                    onChange={(e) => setVerification_with_stamp(e.target.value)}
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
                                    onChange={(e) => setGaz_pribor_stamp(e.target.value)}
                                >
                                    <option value="есть">есть</option>
                                    <option value="нет">нет</option>
                                </select>
                            </div>

                            <div className="formWrap">
                                <label htmlFor="блок коррекции ДР">блок коррекции ДР</label>
                                <select
                                    onChange={(e) => setBlock_correction_dp(e.target.value)}
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
                                    onChange={(e) => setDt(e.target.value)}
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
                                    onChange={(e) => setDd(e.target.value)}
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
                                    onChange={(e) => setEr_300000(e.target.value)}
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
                                    onChange={(e) => setVisual_damage(e.target.value)}
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
                                    onChange={(e) => setMechanical_damage(e.target.value)}
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
                                    value={conclusion}
                                    onChange={(e) => setConclusion(e.target.value)}
                                    type="text"
                                    id="Заключения:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Показания:">Показания:</label>
                                <input
                                    required
                                    value={indications}
                                    onChange={(e) => setIndications(e.target.value)}
                                    type="text"
                                    id="Показания:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Счетного механизма:">Счетного механизма:</label>
                                <input
                                    required
                                    value={counting_mechanism}
                                    onChange={(e) => setCounting_mechanism(e.target.value)}
                                    type="text"
                                    id="Счетного механизма:"
                                    className="form-control"
                                />
                            </div>

                            <div className="formWrap">
                                <label htmlFor="Номер телефона">Номер телефона</label>
                                <input
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="text"
                                    id="Номер телефона"
                                    className="form-control"
                                />
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

export default ReceiverUser;