import axios from 'axios';

const serverURL = 'http://localhost:5005';

const API = {
    getEntries: function(){
        return axios.get(`${serverURL}/entries/`)
    }
}


export default API;