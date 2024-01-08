import axios from 'axios';

// const serverURL = 'http://localhost:5005';
const serverURL = process.env.REACT_APP_SERVER_URL;


const API = {
    getEntries: function(){
        return axios.get(`${serverURL}/entries`)
    },

    getOneEntries: function(id){
        return axios.get(`${serverURL}/entries/${id}`)
    },

    postEntries: function(items){
        return axios.post(`${serverURL}/entries/create`, {items})
    },

    editEntry: function(id, items){
        return axios.put(`${serverURL}/entries/modify/${id}`, { items })
    },

    deleteEntry: function(id){
        return axios.delete(`${serverURL}/entries/delete/${id}`)
    }
}


export default API;