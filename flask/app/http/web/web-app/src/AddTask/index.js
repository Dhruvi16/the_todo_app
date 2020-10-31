import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '@creativecommons/vocabulary/css/vocabulary.css';
import 'bulma/css/bulma.css';
import APIClient from '../apiClient';
import { withAuth } from '@okta/okta-react';

const styles = theme => ({

});

const Modal = ({ children, closeModal, modalState, title }) => {
    if(!modalState) {
      return null;
    }
    
    return(
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={closeModal} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              {children}
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    title: PropTypes.string
  }
  
class AddTask extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        modalState: false,
        taskName: String,
        taskLocation: String,
        taskTime: Date,
        taskCanvas: Object
      };
      
      this.toggleModal = this.toggleModal.bind(this);
      this.addTask = this.addTask.bind(this)
    }

    async componentDidMount() {
        const accessToken = await this.props.auth.getAccessToken()
        this.apiClient = new APIClient(accessToken);
    }

    addTask(task) {
        this.apiClient.createTask(task);
    }
    
    toggleModal() {    
      this.setState((prev, props) => {
        const newState = !prev.modalState;
        
        return { modalState: newState };
      });
    }
    
    render() {
      return(
        <section className="section">
          <div className="container">
            <div className="has-text-centered content">
              <a className="button is-info tiny" onClick={this.toggleModal}>
              Add Task
              </a>
            </div>
            
            <Modal 
              closeModal={this.toggleModal} 
              modalState={this.state.modalState} 
              title="Add Task"
            >
            <div className="field">
                <div className="control">
                    <input className="input" type="text" placeholder="Task Title" onChange={(e)=>this.setState({taskName: e.target.value})} value={this.state.taskName}></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input" type="text" placeholder="Task Location" onChange={(e)=>this.setState({taskLocation: e.target.value})} value={this.state.taskLocation}></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input" type="text" placeholder="Time Format: HH:mm DD:MM:YYYY" onChange={(e)=>this.setState({taskTime: e.target.value})} value={this.state.taskTime}></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <canvas className="input" type="text" onChange={(e)=>this.setState({taskCanvas: e.target.value})} value={this.state.taskCanvas}></canvas>
                </div>
            </div>
            <button className="button is-danger is-focused" onClick={()=>{this.addTask(this.state.taskName, this.state.taskLocation, this.state.taskTime, this.state.taskCanvas)}}>Submit</button>
            </Modal>
          </div>
        </section>
      );
    }
  }

export default withStyles(styles)(withAuth(AddTask));