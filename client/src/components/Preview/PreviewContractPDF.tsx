import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import {Link, browserHistory} from 'react-router';
import {ContractParagraphService} from "../../services/contractParagraph";
import {ManifestationService} from "../../services/manifestation";
import {UserService} from "../../services/user"
import {PdfService} from "../../services/pdf";
import $ from 'jquery';
declare var $: any;

import { pdfCover } from './pdfCover';


export interface PreviewContractProps {
	params: any;
}

@translate(['template'], {wait: true})
export class PreviewContract extends React.Component<PreviewContractProps, any> {
	constructor(props: PreviewContractProps) {
		super(props);
		this.state = {
			paragraphs: [],
			manifestation: {},
			domString: '',
			generatedPDFName: '',
			user: {},
		}
		ContractParagraphService.find({manifestation_id: this.props.params.manifestation_id}).then(
			paragraphs => {
				this.setState({	paragraphs: paragraphs.data	});
			}
		);
		ManifestationService.find({id: this.props.params.manifestation_id}).then(
			manifestation => {
				this.setState({	manifestation: manifestation.data });
				UserService.findUsers({id: manifestation.data.accountManagerId}).then(
					user =>{
						this.setState({user: user.data[0]});
					}
				);
			}
		);
	}
	generatePDF(e){
		e.preventDefault();
		if(this.state.paragraphs.length == 0){
			alert("empty template");
			return false;
		}
		//make structure
		let temp=pdfCover[1];
		this.state.paragraphs.map((paragraph, index)=>{
			if(paragraph.subLevel == 0){
				temp += `<div class="bigTitle">${paragraph.level}. ${paragraph.title}</div>`;
				temp += `<div class="content">${paragraph.editor}</div><br/>`;
			}
			else{
				temp += `<div class="subTitle">${paragraph.level}.${paragraph.subLevel} ${paragraph.title}</div>`;
				temp += `<div class="content">${paragraph.editor}</div><br/>`;
			}
		});
		//inject data
		for(let key in this.state.manifestation){
			if(this.state.manifestation.hasOwnProperty(key)){
				var regex = new RegExp("{{" + key + "}}","g");
				temp = temp.replace(regex, this.state.manifestation[key]);
			}
		}
		for(let key in this.state.user){
			if(this.state.user.hasOwnProperty(key)){
				var regex = new RegExp("{{user." + key + "}}","g");
				temp = temp.replace(regex, this.state.user[key]);
			}
		}
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1;
		let day = dateObj.getUTCDate();
		let year = dateObj.getUTCFullYear();

		let nowDay = year + "/" + month + "/" + day;
		var regex = new RegExp("{{custom.issueDate}}","g");
				temp = temp.replace(regex, nowDay);
		//inject data end//
		this.setState({domString: temp});
		PdfService.generatePDF({html: temp}).then(
			pdf=>{
				console.log("fileName:", pdf.data);
				this.setState({generatedPDFName: pdf.data});
			}
		);
	}
	previewButton(){
		if(this.state.generatedPDFName == ''){
			return <button className="btn btn-danger" disabled>Preview</button>
		}
		else{
			return <Link to={"/api/pdfs?file="+this.state.generatedPDFName} target="_blank"><div className="btn btn-danger">Preview</div></Link>
		}
	}
	render(){
		const insurance_options = ()=>{
			let items = [];
			items.push(<option key="0" value="0"> -- select a company -- </option>)
			this.state.insurances.map((company, index) => {
				items.push(<option key={index+1} value={company.id}>{company.businessName}</option>);
			});
			return items;
		}
		const version_options = ()=>{
			let items = [];
			items.push(<option key="0" value="0"> -- select a version -- </option>);
			this.state.versions.map((version, index) => {
				items.push(<option key={index+1} value={version.id}>{version.label}</option>);
			});
			return items;
		}
		return(
			<div className="content-w templateAdd">
				<div className="content-i">
					<div className="content-box">
						<div className="element-wrapper">
							<h6 className="element-header">
								Setting Tempalte
							</h6>
							<div className="element-box">
								<form>
									<div className="row">
										<div className="col-sm-4 form-group row">
											<div className="col-sm-6">
												<button className="btn btn-primary" onClick={ (e)=>{this.generatePDF(e)} }>Generate</button>
											</div>
											<div className="col-sm-6">
												{this.previewButton()}												
											</div>
										</div>
									</div>
								</form>
							</div>
							<h6 className="element-header">
								Contents
							</h6>
							<div className="element-box pdfPreviewContainer">
								<div id="pdfBoard" className="" dangerouslySetInnerHTML={{__html: this.state.domString}}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

