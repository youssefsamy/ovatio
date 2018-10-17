import { ValidationService } from "../services/validation";

export interface IUser {
    businessName: string

}

export default class User {

    public id;
    public genre;
    public firstName;
    public lastName;
    public address;
    public zipcode;
    public city;
    public email;
    public phone;
    public mobile;
    public isDeleted;

    constructor() {
        this.hydrate({})
    }

    hydrate(object) {
        this.id = object.id || null;
        this.genre = object.genre || "";
        this.firstName = object.firstName || '';
        this.lastName = object.lastName || '';
        this.address = object.address || '';
        this.zipcode = object.zipcode || '';
        this.city = object.city || '';
        this.email = object.email || '';
        this.mobile = object.mobile || '';
        this.isDeleted = false;
    }

    validationFn(attributName, value) {
        switch (attributName) {
            case "firstName":
            case "lastName":
            case "address":
            case "city":
                return ValidationService.validationNotEmpty(value);
            case "zipcode":
                return ValidationService.validationZipcode(value);
            case "email":
                return ValidationService.validationEmail(value);
            default:
                return true;
        }
    }
    setDeleted() {
        this.isDeleted = true;
    }

    validateObject() {
        return this.validationFn('firstName', this.firstName)
            && this.validationFn('lastName', this.lastName)
            && this.validationFn('address', this.address)
            && this.validationFn('city', this.city)
            && this.validationFn('zipcode', this.zipcode)
            && this.validationFn('email', this.email)
    }

}
