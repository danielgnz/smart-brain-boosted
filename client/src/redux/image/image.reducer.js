import ImageActionTypes from './image.types'

const INITIAL_STATE = {
    currentImage: null
}

const imageReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ImageActionTypes.FACE_RECOGNITION_START:
            return {
                ...state,
                source: action.payload
            }
        case ImageActionTypes.FACE_RECOGNITION_SUCCESS:
            return {
                ...state,
                currentImage: action.payload

            }
        case ImageActionTypes.FACE_RECOGNITION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default imageReducer