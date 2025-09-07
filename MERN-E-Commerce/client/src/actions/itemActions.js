import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING } from './types';

const API_URL = process.env.REACT_APP_API_URL;

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get(`${API_URL}/api/items`)
        .then(res => dispatch({ type: GET_ITEMS, payload: res.data }))
        .catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const addItem = (item) => dispatch => {
    axios.post(`${API_URL}/api/items`, item)
        .then(res => dispatch({ type: ADD_ITEM, payload: res.data }))
        .catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const deleteItem = (id) => dispatch => {
    axios.delete(`${API_URL}/api/items/${id}`)
        .then(() => dispatch({ type: DELETE_ITEM, payload: id }))
        .catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const updateItem = (id, item) => dispatch => {
    axios.put(`${API_URL}/api/items/${id}`, item)
        .then(res => dispatch({ type: UPDATE_ITEM, payload: [id, res.data] }))
        .catch(err => dispatch(returnErrors(err.response?.data, err.response?.status)));
}

export const setItemsLoading = () => ({ type: ITEMS_LOADING });
