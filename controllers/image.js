const Clarifai = require('clarifai')

if(process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
})

const handleApiCall = () => (req, res) => {
    const { imageUrl } = req.body

    app.models
	.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
	.then(data => res.status(200).send(data))
	.catch(error => res.status(400).send(error))
}

module.exports = { 
    handleApiCall
}