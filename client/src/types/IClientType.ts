export default interface IClientType {
    id?: number,
    phoneNumber: string, //
    orgName: string,//
    date: string,//
    mark: string,
    serialNumber: string,//
    temperature: string,//
    conclusions: string, //
    indications:string,//
    countingMechanism: string, //

    isPaid: boolean,
    lastVerification: boolean,
    gasPassport: boolean,
    correctionPassport: boolean,
    act: boolean,
    technicalCondition: boolean,
    DR: boolean,
    DT: boolean,
    DD: boolean,
    emergencySituations: boolean,
    visualDamage: boolean,
    mechanicalDamage: boolean,
}