import { Typography } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Grid, Paper, withStyles, List, ListItem, Divider, Button } from '@material-ui/core';
import React,{useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/blogMessage';
import BlogMessageForm from "./BlogMessageForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const styles = theme => ({
    paper :{
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin:{
        margin: theme.spacing(1)
    },
    actionDiv:{
        textAlign:"center"
    },
    wdFull:{
        width: '100%',
        margin: theme.spacing(1),
        border: '1px solid rgba(0, 0, 0, .125)',
    }
})

const BlogMessages = ({classes, ...props}) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(()=>{
        props.fetchAllBlogMessages()
    },[])//DidMount

const onDelete = id =>{
    const onSuccess = () => {
        ButterToast.raise({
            content: <Cinnamon.Crisp title="Note Box"
            content="Deleted successfully!"
            scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<DeleteSweep />}
            />
        })
    }
    if(window.confirm("Are you sure to delete this record?"))
        props.deleteBlogMessage(id, onSuccess)
}

    return (
        <Grid container>
            <Accordion className={classes.wdFull}>
                <AccordionSummary
                expandIcon={<NoteAddIcon color="primary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography className={classes.heading}>Add note</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <BlogMessageForm {...{currentId, setCurrentId}} />
                        </Paper>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            props.blogMessageList.map((record, index) =>{
                                return(
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    {record.title}
                                                </Typography>
                                                <div>
                                                    {record.message}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <IconButton aria-label="edit" color="primary" variant="contained" size="small" className={classes.smMargin} onClick={()=>setCurrentId(record._id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" color="secondary" variant="contained" size="small" className={classes.smMargin} onClick={()=> onDelete(record._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    blogMessageList: state.blogMessage.list
})

const mapActionToProps ={
    fetchAllBlogMessages : actions.fetchAll,
    deleteBlogMessage : actions.Delete
}
//props.fetchAllBlogMessages

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(BlogMessages));