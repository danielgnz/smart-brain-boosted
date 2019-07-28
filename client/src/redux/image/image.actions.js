import ImageActionTypes from './image.types'

export const faceRecognitionStart = (imageUrl) => ({
    type: ImageActionTypes.FACE_RECOGNITION_START,
    payload: imageUrl
})

export const faceRecognitionSuccess = (data) => ({
    type: ImageActionTypes.FACE_RECOGNITION_SUCCESS,
    payload: data
})

export const faceRecognitionFailure = (error) => ({
    type: ImageActionTypes.FACE_RECOGNITION_FAILURE,
    payload: error
})