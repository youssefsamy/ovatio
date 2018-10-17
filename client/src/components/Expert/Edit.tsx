import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {translate, Interpolate, Trans} from 'react-i18next';
import i18n from '../../i18n';
import {Link, browserHistory} from 'react-router';
import  CustomInputText from './../Global/input/CustomInputText';
import  CustomInputSelect from './../Global/input/CustomInputSelect';
import  {Expert} from './../../models/ExpertModel'
import CustomInputRate from "../Global/input/CustomInputRate";
import CustomTitle from "../Global/title/CustomTitle";
import AddUser from "../Global/addUser/AddUser";
import {ExpertService} from "./../../services/expert";
import CustomInputZipCode from "../Global/input/CustomInputZipCode";
import CustomInputCity from "../Global/input/CustomInputCity";
import CustomInputCountry from "../Global/input/CustomInputCountry";
import {UserService} from '../../services/user';
import notification from '../../lib/reactToastify';
import { ZipcodeService } from "./../../services/zipcode";


@translate(['expert', 'countries'], {wait: true})
export class ExpertEdit extends React.Component<any, any> {

    public state: any;

    constructor(props: any) {
        super(props);
        axios.defaults.baseURL = '/api/experts';
        this.state = {
            canSubmit: false,
            expert: new Expert()
        };

        this.setExpert = this.setExpert.bind(this);
        this.checkForm = this.checkForm.bind(this);
        this.getEditDataIfEditMode = this.getEditDataIfEditMode.bind(this);
        this.save = this.save.bind(this);
        this.getEditDataIfEditMode();
        //this.checkForm = this.checkZipcode.bind(this);                     /////   check zipcode when change zipcode

        UserService.getMe().then(
            res => {
                // console.log(res.data);
                this.setState({
                    canEditState: UserService.isAdmin(res.data)
                })
            }
        );


    }

    getEditDataIfEditMode() {
        if (this.props.params.id) {
            ExpertService.getById(this.props.params.id).then(resp => {
                let row = resp.data;
                this.state.expert.hydrate(row || {});
                this.setState({
                    expert: this.state.expert
                })
            })
        }
    }

    save(event: any) {
        event.preventDefault();
        if (this.state.canSubmit) {

            var self = this;
            ZipcodeService.validate(this.state.expert.zipCode).then(res => {
                if (res.data.valid) {

                    console.log('what to do?' , self.props.params)
                    let method = (self.props.params.id ? axios.put : axios.post);
                    method('/' + (self.props.params.id ? self.props.params.id : ''), {
                        expert: this.state.expert
                    }).then(resp => {
                        console.log(resp)
                        notification({cb: () => {
                            browserHistory.push('/expert')
                        }});
                    })
                } else {
                    notification({isError: true});
                }
            })


        } else {
            notification({isError: true});
        }


    }

    setExpert(attribut, value) {

        this.state.expert[attribut] = value;
        this.setState({expert: this.state.expert});

    }

    checkForm() {
        this.state.canSubmit = this.state.expert.validateObject();
    }

    render() {
        const {t} : any = this.props;
        this.checkForm();
        return (
            <div className="content-w">
                <div className="content-i">
                    <div className="content-box">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="element-wrapper">
                                    <h6 className="element-header">
                                        {
                                            (this.props.params.id ? t('expert:editExpertPageTitle')
                                                : t('expert:createExpertPageTitle'))
                                        }
                                    </h6>
                                    <div className="element-box">
                                        <form id="formValidate">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="businessName"
                                                        label={t('expert:businessName')}
                                                        validationFn={this.state.expert.validationFn}
                                                        onChangeFn={(newValue) => this.setExpert("businessName", newValue)}
                                                        model={this.state.expert.businessName}
                                                        errorLabel={t('expert:businessNameError')}
                                                    ></CustomInputText>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="adress"
                                                        label={t('expert:address')}
                                                        onChangeFn={(newValue) => this.setExpert("address1", newValue)}
                                                        model={this.state.expert.address1}
                                                    ></CustomInputText>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="adress"
                                                        label={t('expert:address2')}
                                                        onChangeFn={(newValue) => this.setExpert("address2", newValue)}
                                                        model={this.state.expert.address2}
                                                    ></CustomInputText>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <CustomInputCity
                                                        name="city"
                                                        label={t('expert:city')}
                                                        onChangeFn={(newValue) => this.setExpert("city", newValue)}
                                                        model={this.state.expert.city}
                                                    ></CustomInputCity>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputZipCode
                                                        name="zipCode"
                                                        label={t('expert:zipCode')}
                                                        onChangeFn={(newValue) => this.setExpert("zipCode", newValue)}
                                                        model={this.state.expert.zipCode}
                                                        errorLabel="Error Zipcode"
                                                    ></CustomInputZipCode>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputCountry
                                                        name="country"
                                                        label={t('expert:country')}
                                                        onChangeFn={(newValue) => this.setExpert("country", newValue)}
                                                        model={this.state.expert.country}
                                                    ></CustomInputCountry>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="switchboardPhone"
                                                        label={t('expert:switchboardPhone')}
                                                        onChangeFn={(newValue) => this.setExpert("switchboardPhone", newValue)}
                                                        model={this.state.expert.switchboardPhone}
                                                    ></CustomInputText>
                                                </div>
                                                <div className="col-sm-4">
                                                    <CustomInputText
                                                        name="email"
                                                        label={t('expert:email')}
                                                        onChangeFn={(newValue) => this.setExpert("email", newValue)}
                                                        model={this.state.expert.email}
                                                    ></CustomInputText>
                                                </div>
                                            </div>
                                            <CustomTitle label={t('expert:contacts')}></CustomTitle>
                                            <AddUser
                                                users={this.state.expert.contacts}
                                            ></AddUser>
                                            <div className="form-buttons-w">
                                                <button
                                                    className={"btn btn-primary " + (this.state.canSubmit ? '' : 'disabled')}
                                                    type="submit" onClick={this.save}>Enregistrer
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
