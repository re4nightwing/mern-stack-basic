import { TextField, withStyles, Button } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from '../actions/blogMessage';
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFeedValues = {
    title:'',
    message:''
}

const styles = theme =>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn:{
        backgroundColor: '#00ADB5',
        '&:hover': {
            backgroundColor: '#A6E3E9',
            borderColor: '#00ADB5',
            color: '#00ADB5'
        }
    }
})

const BlogMessageForm = ({classes, ...props}) => {

    useEffect(() => {
        if(props.currentId != 0){
            setValues({
                ...props.blogMessageList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    },[props.currentId])

    const validate = () =>{
        let temp = {...errors}
        temp.title = values.title?"":"Required"
        temp.message = values.message?"":"Required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=> x=="")
    }

    var {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialFeedValues, props.setCurrentId)
    const handleSubmit = e =>{
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Note Box"
                content="submitted successfully!"
                scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if(validate()){
            if(props.currentId == 0)
                props.createBlogMessage(values, onSuccess)
            else
                props.updateBlogMessage(props.currentId, values, onSuccess)
        }
    }
    return(
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={values.title} onChange={handleInputChange} {...(errors.title && {error:true, helperText:errors.title})} />
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows="8" value={values.message} onChange={handleInputChange} {...(errors.message && {error:true, helperText:errors.message})} />
            <Button variant="contained" color="primary" size="large" type="submit" className={classes.postBtn}>Submit</Button>
        </form>
    );
}

const mapStateToProps = state => ({
    blogMessageList: state.blogMessage.list
})

const mapActionToProps ={
    createBlogMessage : actions.create,
    updateBlogMessage : actions.update
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(BlogMessageForm));