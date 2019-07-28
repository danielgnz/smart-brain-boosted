import { takeLatest, put, all, call, delay } from 'redux-saga/effects'
import axios from 'axios'
import ImageActionTypes from './image.types'

import { 
    faceRecognitionSuccess, 
    faceRecognitionFailure, 
    updateImageSource,
    calculateImageSize
} from './image.actions'

export function* faceRecognition({ payload }) {
    try {
        const resp = yield axios.post('http://localhost:5000/clarifai', {
            imageUrl: payload,
        })

        const boundingBoxes = resp.data.outputs[0].data.regions.map(regions => regions.region_info)
        
        yield put(updateImageSource(payload))
        yield put(faceRecognitionSuccess(boundingBoxes))

    } catch (error) {
        yield put(
            faceRecognitionFailure(error)
        )
    }
    
}

export function* imageSize() {
    yield delay(500)
    const image = document.getElementById('targetImage')
    yield put(calculateImageSize(image))
}

export function* onFaceRecognitionStart() {
    yield takeLatest(
        ImageActionTypes.FACE_RECOGNITION_START,
        faceRecognition
    )
}

export function* onFaceRecognitionSuccess() {
    yield takeLatest(
        ImageActionTypes.FACE_RECOGNITION_SUCCESS,
        imageSize
    )
}

export function* imageSagas() {
    yield all([
        call(onFaceRecognitionStart),
        call(onFaceRecognitionSuccess)
    ])
}