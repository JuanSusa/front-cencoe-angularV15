export type adminTypePopUp = 'crear' | 'editar' | 'ver';//^1
export type adminPopUp<T> = { tipo: adminTypePopUp, campo?: T }//^2

/**
 * ^1 => tipo de dato con dos opciones, como guia para administrar las ventanas emergentes (pop up)
 * ^2 => Objeto utilizado para asocias la informacion de una ventana emergente (pop up), cuenta con dos propiedades
 *       tipo: de tipo adminTypePopUp y campo que recibe un valor especifico
 */

export interface ReqResponse<T> {
    code: number;
    message: string;
    data: T[];
    success: boolean;
}

// Modulo reportes
export interface reports {
    reportId: number | null;
    reportName: string;
}

// Modulo proveedores
export interface Provider {
    providerId?: number | null;
    providerName: String;
    providerAddress: String;
    providerEmail: String;
    providerContact: String;
    providerDetails: String;
    providerDoctype: TypeDocs;
}

// Modulo usuario
export interface User {
    userId: number;
    userNumDoc: string;
    userName: string;
    userLastName: string;
    userAddress: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userState: boolean;
    userDocType: TypeDocs;
}
export interface Campaign {
    campaignId: number;
    campaignName: string;
    campaignTeam: number;
    campaignProvider: number;
    campaignStartDate: Date;
    campaignEndDate: Date;
    campaignObservations: string;
    campaignState: string;
}

export class TypeDocs {
    docTypeId!: number | null;
    docTypeName: string = '';

}

export interface Team {
    teamId: number;
    teamName: string;
    teamCapacity: number;
    teamState: boolean;
}

// Modulo cliente
export interface Customer {
    customerId: number;
    customerName: string;
    customerPhone: number;
    customerAddress: string;
    customerState: boolean;
}

