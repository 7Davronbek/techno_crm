import plus from "@/assets/plus.svg";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import updateIcon from "@/assets/update.svg"
import deleteIcon from "@/assets/delete.svg"
import {Loader} from "../../components/Loader.tsx";
import ClientService from "../../service/ClientService.ts";
import IClientType from "../../types/IClientType.ts";

const AdminClientList = () => {
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
    const [isPaid, setIsPaid] = useState<boolean>(false);

    // const [role, setRole] = useState<string>("ROLE_RECEIVER");
    const [id, setId] = useState<number>()

    const [clients, setClients] = useState<IClientType[]>([]);

    const createClient = async (e: { preventDefault: () => void; }) => {
        const data: IClientType = {
            orgName: name_org,
            date: created_time,
            serialNumber: serial_number,
            temperature: temp_sensor,
            conclusions: conclusion,
            indications,
            countingMechanism: counting_mechanism,
            phoneNumber: phone,

            paid: isPaid,
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
        setIsLoading(true)
        setIsUpdate(false)
        e.preventDefault();
        await ClientService.create(data)
            .then(() => {
                toast.success("Client registered successfully.")
                setNameOrg("")
                setCreatedTime("")
                setSerialNumber("")
                setTemp_sensor("")
                setConclusion("")
                setIndications("")
                setPhone("")
                setIsPaid(false)
                setLatestCertificate("yes")
                setPassportMeter("yes")
                setCorrectionBlockPassport("yes")
                setGaz_pribor_stamp("yes")
                setEr_300000("yes")
                setBlock_correction_dp("yes")
                setDt("yes")
                setDd("yes")
                setVisual_damage("yes")
                setMechanical_damage("yes")

                setIsLoading(false)
                setIsOpen(false)
                setIsUpdate(false)
                getAllClients()
            })
            .catch(() => {
                toast.error("Network error")
                setIsLoading(false)
            })
    }

    const handleDelete = async (id: number | undefined) => {
        await ClientService.delete(id)
            .then(() => {
                getAllClients();

                toast.success("User has been deleted")
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    const updateUser = async () => {
        setIsUser(true)
        const data: IClientType = {
            orgName: name_org,
            date: created_time,
            serialNumber: serial_number,
            temperature: temp_sensor,
            conclusions: conclusion,
            indications,
            countingMechanism: counting_mechanism,
            phoneNumber: phone,

            paid: isPaid,
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
        await ClientService.update(data, id)
            .then(() => {
                setIsUser(false)
                setIsOpen(false)
                setIsUpdate(false)
                setNameOrg("")
                setCreatedTime("")
                setSerialNumber("")
                setTemp_sensor("")
                setConclusion("")
                setIndications("")
                setPhone("")
                setIsPaid(false)
                setLatestCertificate("yes")
                setPassportMeter("yes")
                setCorrectionBlockPassport("yes")
                setGaz_pribor_stamp("yes")
                setEr_300000("yes")
                setBlock_correction_dp("yes")
                setDt("yes")
                setDd("yes")
                setVisual_damage("yes")
                setMechanical_damage("yes")

                getAllClients()
                toast.update("Client has been updated")
            })
            .catch((e: Error) => {
                setIsUser(false)
                toast.error(e);
            });
    }

    const handleOpenModal = (client: IClientType) => {
        setIsOpen(true)
        setIsUpdate(true)

        setNameOrg(client.orgName)
        setSerialNumber(client.serialNumber)
        setCreatedTime(client.date)
        setTemp_sensor(client.temperature)
        setConclusion(client.conclusions)
        setIndications(client.indications)
        setPhone(client.phoneNumber)
        setCounting_mechanism(client.countingMechanism)
        setIsPaid(client.isPaid)
        setLatestCertificate(client.lastVerification ? "yes" : "no")
        setPassportMeter(client.gasPassport ? "yes" : "no")
        setCorrectionBlockPassport(client.correctionPassport ? "yes" : "no")
        setGaz_pribor_stamp(client.act ? "yes" : "no")
        setEr_300000(client.technicalCondition ? "yes" : "no")
        setBlock_correction_dp(client.DR ? "yes" : "no")
        setDt(client.DT ? "yes" : "no")
        setDd(client.DD ? "yes" : "no")
        setVerification_with_stamp(client.emergencySituations ? "yes" : "no")
        setVisual_damage(client.visualDamage ? "yes" : "no")
        setMechanical_damage(client.mechanicalDamage ? "yes" : "no")

        setIsLoading(false)
        setId(client.id)
    }

    const handleClose = () => {
        setIsOpen(false);
        setIsUpdate(false);
        setNameOrg("")
        setCreatedTime("")
        setSerialNumber("")
        setTemp_sensor("")
        setConclusion("")
        setIndications("")
        setPhone("")
        setIsPaid(false)
        setLatestCertificate("yes")
        setPassportMeter("yes")
        setCorrectionBlockPassport("yes")
        setGaz_pribor_stamp("yes")
        setEr_300000("yes")
        setBlock_correction_dp("yes")
        setCounting_mechanism("")
        setDt("yes")
        setDd("yes")
        setVisual_damage("yes")
        setMechanical_damage("yes")
    }

    const getAllClients = async () => {
        setIsUser(true)
        await ClientService
            .getAll()
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
                                        <td>Organisation</td>
                                        <td>Date</td>
                                        <td>Phone number</td>
                                        <td>Counting mechanism</td>
                                        <td>Serial Number</td>
                                        <td>Status</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {clients &&
                                        clients.map((item: IClientType, index: number) => (
                                            <tr
                                                key={item.id}
                                                className={`${item.paid ? "active" : "notActive"}`}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{item.orgName}</td>
                                                <td>{item.date}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.countingMechanism}</td>
                                                <td>{item.serialNumber}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="btn "><img src={updateIcon} alt=""/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
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
                    <form onSubmit={createClient} className="AddClientModal h-100 zed">
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

                            <div className="formWrap">
                                <label htmlFor="checkbox">Is Paid</label>
                                <input

                                    value={isPaid}
                                    checked={isPaid}
                                    onChange={(e) => setIsPaid(e.target.checked)}
                                    type="checkbox"
                                    id="checkbox"
                                    className="form-check"
                                />
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
                                    Update Client
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
                                    Add Client
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

export default AdminClientList;