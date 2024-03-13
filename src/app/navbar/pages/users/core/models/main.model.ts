import { TypeDocs } from "../../../tipodocumento/core/models/main.model";

// Modulo usuario
export class User {
    userId!: number | null;
    userNumDoc: string = '';
    userName: string = '';
    userLastName: string = '';
    userAddress: string = '';
    userPhone: string = '';
    userEmail: string = '';
    userPassword: string = '';
    userState!: boolean ;
    userDocType!: TypeDocs | null;
}