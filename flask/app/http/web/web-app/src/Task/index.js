import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  }
});

class Task extends React.Component {
//   handleClick = (event) =>  {
//     this.props.onTask(this.props.task)
//   }


  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.task.task}
        />
        <CardContent>
          <Typography component="p" style={{minHeight: '90px', overflow: 'scroll'}}>
            {this.props.task.location}
          </Typography>
          <Typography component="p" style={{minHeight: '90px', overflow: 'scroll'}}>
            {this.props.task.time}
          </Typography>
        </CardContent>
        {/* <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleClick}>
            <FavoriteIcon color={this.props.isKudo ? "secondary" : "primary"} />
          </IconButton>
        </CardActions> */}
      </Card>
    );
  }
}

export default withStyles(styles)(Task);