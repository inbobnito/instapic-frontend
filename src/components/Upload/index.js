
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import {fetchImagePreview, uploadImageAction} from '../../containers/App/actions';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  header: {
    margin: theme.spacing(2),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  textfield: {
    marginTop: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20,
  },
  input: {
    display: 'none',
  },
  preview: {
    textAlign: 'center',
  },
  imgPreview: {
    margin: '0 auto 0',
    display: 'block'
  }
}));

export function Upload({dispatch, isLoading, isError, imageData, selectedFile, fileExt, didUpload, username}) {
  const classes = useStyles();
  const [titleVal, setTitle] = React.useState(null);
  const [description, setDesc] = React.useState(null);

  function previewImage(event) {
    event.preventDefault();
    dispatch(fetchImagePreview({file: event.target.files[0]}));
  }

  function uploadImage(event) {
    event.preventDefault();
    dispatch(uploadImageAction({imageData: imageData, title: titleVal, description: description, fileExt: fileExt}));
  }

  function getTitle(event) {
    setTitle(event.target.value);
  }

  function getDescription(event) {
    setDesc(event.target.value);
  }

  return (
    <div>
        <Typography align="center" variant="h2" className={classes.header}>
          Upload your Pic
        </Typography>

        <pre className={classes.preview}>
            File selected: {selectedFile ? selectedFile : 'no file selected'}<br /> 
            <img className={classes.imgPreview} width="75%" src={imageData} alt="preview" />
        </pre>

        {didUpload && <span>
          Success! Continue to your <Link component={RouterLink} to={`/user/${username}`}>images</Link>.
        </span>}

        {!didUpload && <TextField
                            onChange={getTitle}
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title of your Pic"
                            name="title"
                            autoComplete="title"
                            className={classes.textfield}
        /> }

          {!didUpload && <TextField
                            onChange={getDescription}
                            variant="outlined"
                            required
                            fullWidth
                            id="desc"
                            label="Brief Description of your Pic"
                            name="desc"
                            autoComplete="desc"
                            className={classes.textfield}
                        />}
        {!didUpload && <input
            onChange={previewImage}
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
        /> }
        
        {isLoading && <LinearProgress />}
        {!didUpload && !isLoading && <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" color="default" className={classes.button}>
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
            </Button>
        </label>}

        {isError && <Typography align="center">Error uploading.</Typography>}
        
        {!didUpload && !isLoading && <Button variant="contained" className={classes.button} onClick={uploadImage} disabled={!titleVal || !description || !imageData}>
            <SaveIcon className={classes.leftIcon} />
            Submit
        </Button>}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: state.appReducer.loading,
  isError: state.appReducer.error,
  imageData: state.appReducer.imageData,
  selectedFile: state.appReducer.selectedFile,
  fileExt: state.appReducer.fileExt,
  didUpload: state.appReducer.didUpload,
  username: state.appReducer.username
});

export default connect(mapStateToProps)(Upload);