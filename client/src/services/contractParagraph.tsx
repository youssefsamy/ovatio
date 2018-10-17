import axios from 'axios';

export class ContractParagraphService {

	static BASE_URL = '/api/contract_paragraphs/';

	static find(query){
		return axios({
			method: 'get',
			url: '',
			params: query,
			baseURL: this.BASE_URL
		});
	}
	static insert(data){
		return axios({
			method: 'post',
			url: '',
			data: data,
			baseURL: this.BASE_URL
		});
	}
}