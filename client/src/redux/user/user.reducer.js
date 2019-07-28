import UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: {
        user_name: 'Testing',
        score: 0,
        // set currentUser to null when testing functionality
    }
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.LOGIN_SUCCESS:   
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
            case UserActionTypes.LOGIN_FAILURE:
            case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer