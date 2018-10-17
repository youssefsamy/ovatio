import * as React from "react";
import {translate, Interpolate, Trans} from 'react-i18next';
import {Link, browserHistory} from 'react-router';
import {ParagraphService} from "../../services/paragraph";
import $ from 'jquery';
declare var $: any;
import {ManifestationAttrListData} from './ManifestationAttrListData';

import TinyMCE from 'react-tinymce';

export interface TemplateEditProps {
	params: any;
}

@translate(['template'], {wait: true})
export class TemplateEdit extends React.Component<TemplateEditProps, any> {
	constructor(props: TemplateEditProps) {
		super(props);
		this.handleChat = this.handleChat.bind(this);
		this.state = {
			level: 0,
			subLevel: 0,
			title: '',
			condition: '',
			editor: '',
			loaded: false,
			isChatActive: false
		}
		ParagraphService.find({'paragraph_id': this.props.params.paragraph_id}).then(
			paragraph => {
				this.setState({
					level: paragraph.data[0].level,
					subLevel: paragraph.data[0].subLevel,
					title: paragraph.data[0].title,
					condition: paragraph.data[0].condition,
					editor: paragraph.data[0].editor,
					loaded:true
				})
			}
		);
	}
	save(){
		let id = this.props.params.paragraph_id;
		let updateData = {
			group: this.props.params.group,
			version_id: this.props.params.version_id,
			level: this.state.level,
			subLevel: this.state.subLevel,
			title: this.state.title,
			condition: this.state.condition,
			editor: this.state.editor
		}
		ParagraphService.update(id, updateData).then(
			result => {
				browserHistory.push('/template');
			}
		);
	}
	handleChat(e){
		e.preventDefault();
		this.setState({
			isChatActive: !this.state.isChatActive
		})
	}
	render(){
		const ManifestationAttrList = ManifestationAttrListData.map((item, index)=>{
			return (
				<li key={index}>
					{item}
				</li>
			) 
		});
		const levelOptions = ()=>{
			let items = [];         
			for (let i = 0; i <= 20; i++) {
				items.push(<option key={i} value={i} >{i}</option>);
			}
			return items;
		}
		return(
			<div className="content-w templateAdd">
				<div className="content-i">
					<div className="content-box">
						<div className="element-wrapper">
							<h6 className="element-header">
								Paragraph Add
							</h6>
							<div className="element-box">
								<form>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Level</label>
												<select className="form-control" value={this.state.level} onChange={(e)=>{this.setState({level: e.target.value})}}>
													{levelOptions()}
												</select>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Sub Level</label>
												<select className="form-control" value={this.state.subLevel} onChange={(e)=>{this.setState({subLevel: e.target.value})}}>
													{levelOptions()}
												</select>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Title</label>
												<input className="form-control" type="text" value={this.state.title} onChange={(e)=>{this.setState({title: e.target.value})}}/>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-control-label">Display Condition</label>
												<input className="form-control" type="text" value={this.state.condition} onChange={(e)=>{this.setState({condition: e.target.value})}}/>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="form-group">
												<label className="form-control-label">Text editor</label>
												{ 	this.state.loaded ? 
													<TinyMCE
														content={this.state.editor}
														config={{
															height : "300",
															plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
															toolbar: 'undo redo | formatselect | bold italic strikethrough underline forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | fontsizeselect'
														}}
														onChange={(e)=>{this.setState({editor: e.target.getContent()})}}
													/>
													: <p>Loading...</p>
												}
												
											</div>
										</div>
									</div>
									<div className="form-buttons-w">
										<Link to="/template"><button className="mr-2 mb-2 btn btn-white" type="button" >Cancel</button></Link>
										<button className="mr-2 mb-2 btn btn-primary" type="button" onClick={this.save.bind(this)}>Save</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
							<div className="floated-chat-btn" onClick={this.handleChat}>
								<i className="os-icon os-icon-mail-07"></i><span>Available Variables</span>
							</div>
							<div className={"floated-chat-w " + (this.state.isChatActive ? "active" : "false" )}>
								<div className="floated-chat-i">
									<div className="chat-close" onClick={this.handleChat}>
										<i className="os-icon os-icon-close"></i>
									</div>
									<ul className="available_vars">
										{ManifestationAttrList}
									</ul>
								</div>
							</div>
			</div>
		)
	}
}