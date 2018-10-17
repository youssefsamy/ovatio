import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import { ZipcodeService } from "./../../../services/zipcode";


@translate(['form'], {wait: true})
export default class CustomInputZipCode extends React.Component<any, any> {

    validationFn;
    onChangeFn;

    constructor(props: any) {

        super();
        this.state = {
            isValid: this.validationFn ? this.validationFn(props.name, props.model) : true
        };
        this.validationFn = props.validationFn;
        this.onChangeFn = props.onChangeFn;

        this.handleFn = this.handleFn.bind(this);
        this.checkValid = this.checkValid.bind(this);

    }

    componentWillReceiveProps(nextProps) {

    }

    handleFn(event: any) {

        event.preventDefault();
        this.onChangeFn(event.target.value);

    }

    checkValid(event) {
        this.validate(event.target.value);
    }

    validate(zipcode) {

        var self = this;

        ZipcodeService.validate(zipcode).then(function(res) {
            self.setState({
                isValid: res.data.valid
            })
        });
    }
    render() {
        return (
            <div className={"form-group " + (this.state.isValid ? "" : "has-error has-danger")}>
                <label>{this.props.label}</label>
                <input className="form-control" type="number" onChange={this.handleFn} value={this.props.model} onBlur={this.checkValid}/>
                {
                    this.state.isValid !== false ? <div></div>
                        :<div
                        className={"help-block form-text " + (this.state.isValid ? "" : "with-errors") + " form-control-feedback"}>
                        <ul className="list-unstyled">
                            <li>{this.props.errorLabel}</li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}