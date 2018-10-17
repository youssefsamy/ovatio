import * as React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { translate, Interpolate, Trans } from 'react-i18next';
import i18n from '../../i18n';
import { Link } from 'react-router'
import {ExpertService} from "./../../services/expert";
import notification from '../../lib/reactToastify';

export interface ExpertShowProps { }
export interface ExpertShowState {
    searchValue: string,
    rowCount: number,
    offset: number,
    sortParams: any,
    pageCount: number,
    allExperts: Array<any>
}

@translate(['expert'], { wait: true })
export class ExpertShow extends React.Component<ExpertShowProps, ExpertShowState> {
    public columns: Array<string>;
    public state: any;

    constructor(props: ExpertShowProps) {
        super(props);
        axios.defaults.baseURL = '/api/experts';
        this.columns = ['businessName',
                        'address',
                        'zipCode',
                        'city',
                        'contactEmail'];
        this.state = {
            searchValue: '',
            rowCount: 10,
            offset: 0,
            sortParams: {
                column: 'businessName',
                orderASC: true
            },
            pageCount: 0,
            allExperts: []
        };
        this.search = this.search.bind(this);
        this.handleRowCount = this.handleRowCount.bind(this);
        this.setSortParams = this.setSortParams.bind(this);
        this.editCompany = this.editCompany.bind(this);
        this.enableCompany = this.enableCompany.bind(this);
        this.disableCompany = this.disableCompany.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    editCompany(id: number, event: any) {
        event.preventDefault();
    }

    enableCompany(id: number, event: any) {
        event.preventDefault();
        axios.patch('/' + id).then(() => {
            this.loadDataFromServer();
        })
    }

    disableCompany(id: number, event: any) {
        event.preventDefault();
        axios.delete('/' + id).then(() => {
            this.loadDataFromServer();
        })
    }

    search(event: any) {
        event.preventDefault();
        this.setState({searchValue: event.target.value}, () => {
            this.loadDataFromServer();
        });
    }

    handleRowCount(event: any) {
        this.setState({rowCount: event.target.value}, () => {
            this.loadDataFromServer();
        });
    }

    handlePageChange(event: any) {
        let rowCount = this.state.rowCount
        this.setState({
            offset: Math.ceil(event.selected * rowCount),
        }, () => {
            this.loadDataFromServer();
        })
    }

    setSortParams(sortColumn: string, event: any) {
        if (['deletedAt', 'businessName', 'address', 'zipCode', 'city'].indexOf(sortColumn) > -1) {
            let orderASC = sortColumn === this.state.sortParams.column ? !this.state.sortParams.orderASC : true
            this.setState({
                sortParams: {
                    column: sortColumn,
                    orderASC: orderASC
                }
            }, () => {
                this.loadDataFromServer();
            })
        }
    }

    loadDataFromServer() {
        let params: any = {
            sort: this.state.sortParams.column,
            order: this.state.sortParams.orderASC ? 'ASC' : 'DESC',
            search: this.state.searchValue,
            offset: this.state.offset,
            limit: this.state.rowCount
        };
        axios.get('/count').then((resp) => {
            let totalRowCount = resp.data.count
            axios.get('', {params: params}).then((resp) => {
                let rowCount = this.state.rowCount
                this.setState({
                    pageCount: Math.ceil(totalRowCount / rowCount),
                    allExperts: resp.data
                })
            })
        });
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    handleDeleteExpert(expertId) {
        this.setState({
            allExperts: this.state.allExperts.filter(expert => expert.id != expertId)
        }, () => {
            ExpertService.delete(expertId)
                .then(resp => {
                    notification()
                })
        })
    }

    render() {
        let self = this;
        const { t } : any = this.props;
        let expertList = this.state.allExperts.map(expert => {
            let enableButton = self.enableCompany.bind(this, expert.id);
            let disableButton = self.disableCompany.bind(this, expert.id);
            let boundDeleteExpert = self.handleDeleteExpert.bind(this, expert.id);
            return (
                <tr key={expert.id}>
                    <td>{expert.businessName}</td>
                    <td>{expert.address}</td>
                    <td>{expert.zipCode}</td>
                    <td>{expert.city}</td>
                    <td>{expert.contactEmail}</td>
                    <td className="row-actions">
                        <Link to={"/expert/edit/" + expert.id}><i className="os-icon os-icon-pencil-2"></i></Link>
                        <a href="#" onClick={boundDeleteExpert}><i className="os-icon os-icon-database-remove"></i></a>
                    </td>
                </tr>
            )
        })

        // the first elem is the database name
        // the second elem is the title to display
        let expertTableHeader = this.columns.map((item, i) => {
            let boundItemClick = self.setSortParams.bind(this, item);
            return (
                <th key={i} onClick={boundItemClick}>{t('expert:' + item)} {item === self.state.sortParams.column ? (self.state.sortParams.orderASC ? <i className="os-icon os-icon-arrow-up2"></i> : <i className="os-icon os-icon-arrow-down"></i>) : ''}</th>
            )
        })
        return (
            <div className="content-w">
              <div className="content-panel-toggler">
                <i className="os-icon os-icon-grid-squares-22"></i><span>Sidebar</span>
              </div>
              <div className="content-i">
                <div className="content-box">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="element-wrapper">
                        <h6 className="element-header">
                          {t('expert:showExpertPageTitle')}
                        </h6>
                        <div className="element-box-tp">
                          <div className="controls-above-table">
                            <div className="row">
                              <div className="col-sm-6">
                                <Link className="btn btn-sm btn-secondary" to="/expert/create">{t('addAnExpert')}</Link>
                              </div>
                              <div className="col-sm-6">
                                <form className="form-inline justify-content-sm-end">
                                  <input className="form-control form-control-sm rounded bright" placeholder={t('expert:searchAnExpert')} type="text" value={this.state.searchValue} onChange={this.search} />
                                  <select className="form-control form-control-sm rounded bright" onChange={this.handleRowCount}>
                                      <option value="10">10</option>
                                      <option value="25">25</option>
                                      <option value="50">50</option>
                                      <option value="100">100</option>
                                  </select>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-bordered table-lg table-v2 table-striped">
                              <thead>
                                <tr>
                                  {expertTableHeader}
                                  <th>{t('expert:action')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {expertList}
                              </tbody>
                            </table>
                          </div>
                          <div className="controls-below-table">
                            <div className="table-records-info">
                              Showing records {this.state.offset} - {this.state.offset + this.state.rowCount}
                            </div>
                            <div className="table-records-pages" id="react-paginate">
                                <ReactPaginate
                                   previousLabel={t('expert:previousLabel')}
                                   nextLabel={t('expert:nextLabel')}
                                   breakLabel={"..."}
                                   activeClassName={"current"}
                                   breakClassName={"break-me"}
                                   pageCount={this.state.pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageChange}
                                   containerClassName={"table-records-pages"}
                                   subContainerClassName={"pages pagination"} />
                            </div>
                          </div>
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
