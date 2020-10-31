import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '@okta/okta-react';

import Task from "../Task"
import TopBar from "../TopBar"

import APIClient from '../apiClient'
import AddTask from '../AddTask';

const styles = theme => ({
 root: {
   flexGrow: 1,
   marginTop: 30
 },
 paper: {
   padding: theme.spacing.unit * 2,
   textAlign: 'center',
   color: theme.palette.text.secondary,
 },
});

class Home extends React.Component {
 state = {
   value: 0,
   tasks: []
 };

 async componentDidMount() {
   const accessToken = await this.props.auth.getAccessToken()
   this.apiClient = new APIClient(accessToken);
   this.apiClient.getTasks().then((data) =>
     this.setState({...this.state, tasks: data})
   );
 }

 render() {
   return (
     <div className={styles.root}>
       <AddTask></AddTask>
     </div>
   );
 }
}

export default withStyles(styles)(withAuth(Home));
