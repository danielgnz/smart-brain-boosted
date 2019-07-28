import React from "react"

import Grid from '@material-ui/core/Grid';

import {
    Card,
    Image,
} from "./image-card.styles"

const ImageCard = ({ imageSrc }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <Image src={imageSrc} alt='' />
                </Card>
            </Grid>
        </Grid>
    )   
}

export default ImageCard