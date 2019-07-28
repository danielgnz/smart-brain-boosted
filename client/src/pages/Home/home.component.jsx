import React from 'react'

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import MenuAppBar from '../../components/MenuAppBar/menu-app-bar.component'
import ImageCard from '../../components/ImageCard/image-card.component' 

import { connect } from 'react-redux'

import { faceRecognitionStart } from '../../redux/image/image.actions'

const useStyles = makeStyles({
    title: {
        marginTop: '1em'
    }, 
    text: {
        fontSize: '1.2em',
    },
    inputContainer: {
        marginTop: '1em'
    },
    submit: {
      padding: '.8rem',
      fontSize: '1em'
    },
  });

export const Home = ({ currentUser, faceRecognitionStart }) => {
    const classes = useStyles()

    const handleClick = (event) => {
        event.preventDefault()

        const imageUrl = document.getElementById('imageUrl').value
        
        faceRecognitionStart(imageUrl)
    }

    return (
        <div>
            <MenuAppBar />
            <Container>
                <CssBaseline />
                <Typography align='center' variant='h3' gutterBottom className={classes.title}>
                    Welcome back, {currentUser.user_name}!
                </Typography>
                <Typography align='center' variant='h5' gutterBottom>
                    Your current score is...
                </Typography>
                <Typography align='center' variant='h4' gutterBottom>
                    {currentUser.score}
                </Typography>
                <Typography variant='body1' className={classes.text} gutterBottom >
                    Copy and paste an image URL in the input box below and see what happens!
                </Typography>
                <div className={classes.inputContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8} md={9} lg={10}>
                        <TextField
                            autoComplete="fname"
                            name="imageUrl"
                            variant="outlined"
                            required
                            fullWidth
                            id="imageUrl"
                            label="Image URL"
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleClick}
                            >
                                Detect
                            </Button>
                        </Grid>
                    </Grid>
                </div>

                <ImageCard imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
                
            </Container>
        </div>
    )
}

const mapStateToProps = ({ userReducer: { currentUser } }) => ({
    currentUser
})

const mapDispatchToProps = dispatch => ({
    faceRecognitionStart: (url) => dispatch(faceRecognitionStart(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)