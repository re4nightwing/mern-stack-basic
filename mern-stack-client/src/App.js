import React from 'react';
import './App.css';
import BlogMessages from './components/BlogMessages';
import { Provider } from 'react-redux';
import { store } from './actions/store';
import { AppBar, Container, Typography } from "@material-ui/core";
import ButterToast,{POS_CENTER, POS_BOTTOM} from "butter-toast";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu">
              <ImportContactsIcon />
            </IconButton>
            <Typography variant="h6" >
              Note Box
            </Typography>
          </Toolbar>
        </AppBar>
        <BlogMessages />
        <ButterToast position={{vertical:POS_BOTTOM, horizontal:POS_CENTER}} />
      </Container>
    </Provider>
  );
}

export default App;
