export type adminTypePopUp = 'crear' | 'editar' | 'ver';//^1
export type adminPopUp<T> = {tipo: adminTypePopUp, campo?: T}//^2

/**
 * ^1 => tipo de dato con dos opciones, como guia para administrar las ventanas emergentes (pop up)
 * ^2 => Objeto utilizado para asocias la informacion de una ventana emergente (pop up), cuenta con dos propiedades
 *       tipo: de tipo adminTypePopUp y campo que recibe un valor especifico
 */


export interface ReqResponse {
    code:    number;
    message: string;
    data:    [];
    success: boolean;
}


// Modulo usuario 
export interface User {
    userId:       number;
    userNumDoc:   string;
    userName:     string;
    userLastName: string;
    userAddress:  string;
    userPhone:    string;
    userEmail:    string;
    userPassword: string;
    userState:    boolean;
    userDocType:  TypeDocs;
}

export interface TypeDocs {
    docTypeId:   number;
    docTypeName: string | null;
}

export interface Team {
    teamId:       number;
    teamName:     string;
    teamCapacity: number;
    teamState:    boolean;
}

// Modulo cliente
export interface Customer {
    customerId:      number;
    customerName:    string;
    customerPhone:   number;
    customerAddress: string;
    customerState:   boolean;
}

// Moculo proveedores
export interface Provider{
    providerId: number,
    providerName: String,
    providerAdrees: String,
    providerState: Boolean, 
    providerEmail: String,  //no esta en la bd
    providerContact: String   //no esta en la bd
  }