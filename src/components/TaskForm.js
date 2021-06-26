/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Button,Col,Form} from 'react-bootstrap';
import {actionCreator} from '../saga/saga';
class TaskForm extends React.Component{
  constructor(props){
    super(props);
  }

  getAssignee() {
    const {assigneeList = []} =this.props;
    const listItems =assigneeList.results && assigneeList.results.data &&  assigneeList.results.data.length> 0 && 
    assigneeList.results.data.map(assignee => 
      assignee.user_status === "accepted" &&            
      <option key={assignee.id} value={assignee.id}>{assignee.name}</option>)   
      return listItems;
}  
 onSubmit = () => {
const formData = new FormData(this.form);
 var object = {};
formData.forEach(function(value, key){
  if (key === "task_time"){
    var a = value.split(':'); 
const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ;
    object[key] =seconds;
  }else{
    object[key] = value;
  }
});

  this.props.addTask(object);
  this.form.reset();
};
cancel=()=>{
  window.location.reload()

 } 
  render (){ 
    
    const {msg,date,time,user}= this.props.singleTask ;
    var MHTime=""
    if (time){var measuredTime = new Date(null); measuredTime.setSeconds(time); 
      MHTime = measuredTime.toISOString().substr(11, 5);
    }
    return(
      
    <div className="bg-info">
    <Form ref={el => (this.form = el)}>
    <Form.Row>
  <Form.Group  as={Col} sm="12" md="12" lg="12">
    <Form.Label>Task Description</Form.Label>
    <Form.Control type="text" name="task_msg" value={msg}/>
  </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col}  sm="6" md="6" lg="6">
      <Form.Label>Date</Form.Label>
      <Form.Control name="task_date"  type="date" value={date} />
    </Form.Group>

    <Form.Group as={Col}  sm="6" md="6" lg="6">
      <Form.Label>Time</Form.Label>
      <Form.Control name="task_time" type="time"value="<?=date('H:i', strtotime($MHTime['time'])); ?>" />
    </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group  as={Col}  sm="12" md="12" lg="12">
    <Form.Label>Assign User</Form.Label>
    <Form.Control name="assigned_user" as="select" value={user} style={{"width": "100%"}}>
    {this.getAssignee()}
    </Form.Control>
  </Form.Group>
</Form.Row>
<Form.Row>
<Form.Group>
<Button variant="success" style={{"float": "right"}} onClick={this.onSubmit}>save</Button>
  <Button variant="info" style={{"float": "right","margin-right": "5px"}} onClick={this.cancel} >cancel</Button></Form.Group>
  </Form.Row>
</Form>
  </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
      addTask:(data) => { 
        dispatch(actionCreator(data))
      },
      updateTask:() => { 
        dispatch({type: 'UPDATE_TASKS' })
      }
  }
};
const mapStateToProps  = state => {
  return {
    assigneeList: state.assignee,
    token:state.token,
    singleTask:state.singleTask
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);

