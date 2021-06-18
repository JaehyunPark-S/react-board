import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    FIND_USER,
    BOARD_LIST,
    READ_BOARD,
    BOARD_COMMENT,
    COMMENT_LIST
} from '../_action/types'

export default function (state = {
    userData: {
        _id: "",
        isAuth: false,
        email: "",
        id: "",
    },
    findData: {
        _id: "",
        id: " ",
        email: "",
        password: " ",
        token: "",
    },
    findList: [{
        _id: "",
        board_writer: "",
        board_name: "",
        board_content: "",
        board_date: "",
    }],
    readData: {
        _id: "",
        board_writer: "",
        board_name: "",
        board_content: "",
        board_date: "",
    }
}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        case FIND_USER:
            return { ...state, findData: action.payload }
            break;
        case BOARD_LIST:
            return { ...state, findList: action.payload }
            break;
        case READ_BOARD:
            return { ...state, readData: action.payload }
            break;
        case BOARD_COMMENT:
            return { ...state, commentData: action.payload }
            break;
        case COMMENT_LIST:
            return { ...state, commentList: action.payload }
            break;
        default:
            return state
    }
}