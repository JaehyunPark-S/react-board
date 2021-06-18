import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    FIND_USER,
    BOARD_LIST,
    READ_BOARD,
    BOARD_COMMENT,
    COMMENT_LIST
} from './types'

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login', dataToSubmit)
        .then(response => response.data)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/user/register', dataToSubmit)
        .then(response => response.data)
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/user/auth')
        .then(response => response.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function find(dataToSubmit) {
    const request = axios.post('/api/user/find', dataToSubmit)
        .then(response => response.data)
    return {
        type: FIND_USER,
        payload: request
    }
}

export function list() {
    const request = axios.get('/api/user/list')
        .then(response => response.data)
    return {
        type: BOARD_LIST,
        payload: request
    }
}

export function read(dataToSubmit) {
    const request = axios.post('/api/user/read', dataToSubmit)
        .then(response => response.data)
    return {
        type: READ_BOARD,
        payload: request
    }
}
export function commentWrite(dataToSubmit) {
    const request = axios.post('/api/user/commentWrite', dataToSubmit)
        .then(response => response.data)
    return {
        type: BOARD_COMMENT,
        payload: request
    }
}

export function commentList() {
    const request = axios.get('/api/user/commentList')
        .then(response => response.data)
    return {
        type: COMMENT_LIST,
        payload: request
    }
}
