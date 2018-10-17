import * as React from 'react'
import { Route, IndexRoute } from 'react-router'
import {Hello} from '../components/Hello'
import { ExpertEdit } from '../components/Expert/Edit'
import { ExpertShow } from '../components/Expert/Show'
import { AssureurEdit } from '../components/Assureur/Edit';
import {BusinessProviderList} from "../components/BusinessProvider/List";
import {AssureurShow} from "../components/Assureur/Show";
import {ClientList} from "../components/Client/List";
import {ClientEdit} from "../components/Client/Edit";
import {Layout} from "../components/layout/Layout";
import {BusinessProviderEdit} from "../components/BusinessProvider/Edit";
import {ManifestationList} from "../components/Manifestation/List";
import {ManifestationEdit} from "../components/Manifestation/Edit";
import {UserList} from "../components/User/List";
import {UserEdit} from "../components/User/Edit";
import {TemplateHome} from "../components/Template/Home";
import {TemplateAdd} from "../components/Template/Add";
import {TemplateEdit} from "../components/Template/Edit";
import {Preview} from "../components/Preview/PreviewPDF";
import {PreviewContract} from "../components/Preview/PreviewContractPDF";


export default (store) => {
    return (
        <Route path="" component={Layout}>
            <Route path="/expert" component={ExpertShow} />
            <Route path="/expert/create" component={ExpertEdit} />
            <Route path="/expert/edit/:id" component={ExpertEdit} />
            <Route path="/assureur" component={AssureurShow} />
            <Route path="/assureur/create" component={AssureurEdit} />
            <Route path="/assureur/edit/:id" component={AssureurEdit} />
            <Route path="/businessProvider" component={BusinessProviderList} />
            <Route path="/businessProvider/create" component={BusinessProviderEdit} />
            <Route path="/businessProvider/edit/:id" component={BusinessProviderEdit} />
            <Route path="/manifestation" component={ManifestationList} />
            <Route path="/manifestation/create" component={ManifestationEdit} />
            <Route path="/manifestation/edit/:id" component={ManifestationEdit} />
            <Route path="/user" component={UserList} />
            <Route path="/user/create" component={UserEdit} />
            <Route path="/user/edit/:id" component={UserEdit} />
            <Route path="client" component={ClientList} />
            <Route path="client/add" component={ClientEdit} />
            <Route path="client/:action/:id" component={ClientEdit} />
            <Route path="template" component={TemplateHome} />
            <Route path="template/add/:group/:version_id" component={TemplateAdd} />
            <Route path="template/edit/:paragraph_id" component={TemplateEdit} />
            <Route path="preview/:manifestation_id" component={Preview} />
            <Route path="preview_contract/:manifestation_id" component={PreviewContract} />
            <Route path="*" component={Hello} />
        </Route>
    )
}
