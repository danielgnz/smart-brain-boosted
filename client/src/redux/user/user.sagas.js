import { takeLatest, put, all, call } from 'redux-saga/effects'
import axios from 'axios'

import UserActionTypes from './user.types'

import { 
    signUpSuccess,
    signUpFailure,
    loginSuccess,
    loginFailure
} from './user.actions'


export function* signUp({ payload: { userName, email, password } }) {
    try {
        const res = yield axios.post('/signup', {
            userName,
            email,
            password
        })

        const user = res.data

        yield put (
            signUpSuccess(user)
        )
    } catch (error) {
        yield put(
            signUpFailure(error)
        )
    }

}

export function* login({ payload: { email, password }}) {
    try {
        const res = yield axios.post('/login', {
            email,
            password
        })

        const user = res.data

        yield put (
            loginSuccess(user)
        )

    } catch(error) {
        yield put (
            loginFailure(error)
        )
    }
}
export function* onSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUp
    )
}

export function* onLoginStart() {
    yield takeLatest(
        UserActionTypes.LOGIN_START,
        login
    )
}

export function* userSagas() {
    yield all([
        call(onSignUpStart),
        call(onLoginStart)
    ])
}