import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import userReducer from './user/user.reducer'

const middlewares = []

process.env.NODE_ENV === 'development' && middlewares.push(logger)

const store = createStore(userReducer, applyMiddleware(...middlewares))


export default store
