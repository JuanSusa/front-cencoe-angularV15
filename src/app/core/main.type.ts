export type adminTypePopUp = 'crear' | 'editar' | 'ver';//^1
export type adminPopUp<T> = { tipo: adminTypePopUp, campo?: T }//^2

/**
 * ^1 => tipo de dato con dos opciones, como guia para administrar las ventanas emergentes (pop up)
 * ^2 => Objeto utilizado para asocias la informacion de una ventana emergente (pop up), cuenta con dos propiedades
 *       tipo: de tipo adminTypePopUp y campo que recibe un valor especifico
 */


export interface ReqResponse {
    code:    number;
    message: string;
    data: [];
    success: boolean;
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
    campaign_id: number;
    campaign_name: string;
    campaign_capacity: number;
    campaign_start_date: Date;
    campaign_end_date: Date;
    campaign_observations: string;
    campaign_state: string;
}

export interface TypeDocs {
    data: TypeDocs;
    docTypeId:   number;
    docTypeName: string;
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

// Modulo proveedores
export interface Provider {
    providerId?:      number;
    providerName:    string;
    providerAddress:  string;
    providerContact: string;//ya esta en la bd
    providerEmail:   string; //ya esta en la bd
    providerDoctype?: TypeDocs;  //ya esta en la bd
    providerDetails?: string;
    // providerState:   boolean;
}
