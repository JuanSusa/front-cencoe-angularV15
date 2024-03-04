export type adminTypePopUp = 'crear' | 'editar' //^1
export type adminPopUp<T> = { tipo: adminTypePopUp, campo?: T }//^2

/**
 * ^1 => tipo de dato con dos opciones, como guia para administrar las ventanas emergentes (pop up)
 * ^2 => Objeto utilizado para asocias la informacion de una ventana emergente (pop up), cuenta con dos propiedades
 *       tipo: de tipo adminTypePopUp y campo que recibe un valor especifico
 */

export interface ReqResponse<T> {
    code:    number;
    message: string;
    data:    T[];
    success: boolean;
}

export interface Pageable<T> {
    content:          T[];
    pageable:         Page;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Page {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}




// // Modulo usuario
// export interface User {
//     userId: number;
//     userNumDoc: string;
//     userName: string;
//     userLastName: string;
//     userAddress: string;
//     userPhone: string;
//     userEmail: string;
//     userPassword: string;
//     userState: boolean;
//     userDocType: TypeDocs;
// }
// export interface Campaign {
//     campaignId: number;
//     campaignName: string;
//     // campaignTeam: number;
//     // campaignProvider: number;
//     campaignStartDate: Date;
//     campaignEndDate: Date;
//     campaignObservations: string;
//     campaignState: string;
// }



// export interface Team {
//     teamId: number;
//     teamName: string;
//     teamCapacity: number;
//     teamState: boolean;
// }

