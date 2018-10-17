import { ValidationService } from "../services/validation";

export class Expert {
    public type: string
    public businessName: string
    public businessProviderLastName: string
    public businessProviderFirstName: string
    public companyId: number
    public status: string
    public commissionPercent: string
    public address1: string
    public address2: string
    public zipCode: string
    public city: string
    public country: string
    public email: string
    public switchboardPhone: string
    public contacts: any[]

    constructor() {
        this.hydrate({});
    }

    hydrate(object) {
        this.type = object.type || ''
        this.businessName = object.businessName || ''
        this.businessProviderLastName = object.businessName || ''
        this.businessProviderFirstName = object.businessName || ''
        this.companyId = object.companyId || null
        this.status = object.status || ''
        this.commissionPercent = object.commissionPercent || ''
        this.address1 = object.address1 || ''
        this.address2 = object.address2 || ''
        this.zipCode = object.zipCode || ''
        this.city = object.city || ''
        this.country = object.country || ''
        this.email = object.email || ''
        this.switchboardPhone = object.switchboardPhone || ''
        this.contacts = object.contacts ? object.contacts : []
    }

    validationFn(attributName, value) {
        switch (attributName) {
            case "businessName":
                return !!value;
            default:
                return true;
        }
    }

    validateObject() {
        /// validate businessName;
        var res = this.validationFn("businessName", this.businessName)
        return res;
    }

}
