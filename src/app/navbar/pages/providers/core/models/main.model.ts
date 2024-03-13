import { TypeDocs } from "../../../tipodocumento/core/models/main.model";

// Modulo proveedores
export class Provider {
    providerId?: number | null;
    providerName: String = '';
    providerAddress: String = '';
    providerEmail: String = '';
    providerContact: String = '';
    providerDetails: String = '';
    providerDoctype!: TypeDocs | null;
}