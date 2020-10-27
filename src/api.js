import $ from 'jquery';
import store from './store'

const baseURL = 'https://thinkful-list-api.herokuapp.com/jenna'

const listApiFetch = (...args) => {
    let error;
    return fetch(...args)
    .then(res => {
        if (!res.ok) {
            error = { code : res.status}
        if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
        }
    }
    return res.json();
    })
    .then(data => {
        if (error) {
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    })
}

const getItems = () => {
    return listApiFetch(`${baseURL}/items`);
}

const createItem = (name) => {
    let newItem = JSON.stringify({
        name: name
    })
    return listApiFetch(`${baseURL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: newItem 
    })
}

const updateItem = (id, updateData) => {
    let newItem = JSON.stringify(updateData);

    return listApiFetch(`${baseURL}/items/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: newItem 
    })
}

const deleteItem = (id) => {
    return listApiFetch(`${baseURL}/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

export default {
    getItems,
    createItem,
    updateItem,
    deleteItem
}