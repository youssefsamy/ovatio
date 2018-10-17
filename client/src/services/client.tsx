import axios from 'axios';
import {Client} from "../classes/client";
import {ClientContact} from "../classes/clientContact";

export function getBusinessStatutses(){
    return axios({
        method: 'get',
        url: '',
        baseURL: "/api/client-businessStatuses/"
    });
}

export function getStates(){
    return [
        {id: 1, label: "Prospect"},
        {id: 2, label: "Prospect inactive"},
        {id: 3, label: "Client"},
        {id: 4, label: "Client inactif"},
        {id: 5, label: "Blacklist"},
        {id: 6, label: "Choisir"}
    ]
}

export function saveClient(client : Client){
    if (client.id == null){
        return axios.post("/", client);
    }else{
        return axios.put("/" + client.id, client);
    }
}

export function findClients(query){
    return axios.get("", {params:query});
}

export function countClients(query){
    return axios.get("/count", {params:query});
}

export function saveContact(contact : ClientContact){
    if (contact.id == null){
        return axios.post("/contact/", contact);
    }else{
        return axios.put("/contact/" + contact.id, contact);
    }
}

const BASE_URL = '/api/client/';
export function saveClientInManifestation(client:Client){
    return axios({
        method: 'post',
        url: '',
        data: client,
        baseURL: BASE_URL
    });
}
export function getAutocompleteClients(query){
    return axios({
        method: 'get',
        url: '/autocomplete',
        params: query,
        baseURL: BASE_URL
    });
}
export function getOneClient(id){
    return axios({
        method: 'get',
        url: '/'+id,
        baseURL: BASE_URL
    });
}

export default getBusinessStatutses;