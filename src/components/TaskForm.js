/*eslint-disable no-unused-vars */
import React from 'react';
import {connect} from 'react-redux';
import {Button,Col,Form} from 'react-bootstrap';
import {actionCreator,actionUpdator,getTaskAction} from '../saga/saga';
import _ from 'lodash';
class TaskForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      task_msg:null,
      task_id:"",
      task_date:"mm/dd/yyyy",
      task_time:"--:-- --",
      assigned_user:""
    }
  }
  componentWillReceiveProps(nextProps){
   
 if(! (_.isEqual(this.props.singleTask,nextProps.singleTask)) ){
  const {task_msg="",task_date="mm/dd/yyyy",task_time=0,assigned_user="",task_id=""}= nextProps.singleTask ;
  var MHTime="";
  if (task_time && task_time > 0){
    var measuredTime = new Date(null);
     measuredTime.setSeconds(task_time); 
    MHTime = measuredTime.toISOString().substr(11, 5);
  }
  this.setState({task_msg:task_msg,
    task_id:task_id,task_date:task_date,task_time:MHTime,assigned_user:assigned_user});
 }
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
  if(object['task_id'] && object['task_id'].length >0){
    this.props.updateTask(object);
  }else{
    delete object.task_id;
  this.props.addTask(object);
  }
  this.props.getTaskAction();
  
};
cancel=()=>{
  window.location.reload()

 } 
 handleChange = (event) => {
  const { target: { name, value } } = event
  this.setState({ [name]: value })
}

  render (){ 
   return(
      
    <div className="bg-info">
    <Form ref={el => (this.form = el)}>
    <Form.Row>
  <Form.Group  as={Col} sm="12" md="12" lg="12">
    <Form.Label>Task Description</Form.Label>
    <Form.Control type="text" name="task_msg" value={this.state.task_msg} onChange={this.handleChange}/>
    <Form.Control type="hidden" name="task_id" value={this.state.task_id}/>
  
  </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col}  sm="6" md="6" lg="6">
      <Form.Label>Date</Form.Label>
      <Form.Control name="task_date"  type="date" value={this.state.task_date}  onChange={this.handleChange}/>
    </Form.Group>

    <Form.Group as={Col}  sm="6" md="6" lg="6">
      <Form.Label>Time</Form.Label>
      <Form.Control name="task_time" type="time" value={this.state.task_time} onChange={this.handleChange} />
    </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group  as={Col}  sm="12" md="12" lg="12">
    <Form.Label>Assign User</Form.Label>
    <Form.Control name="assigned_user" as="select" value={this.state.assigned_user} onChange={this.handleChange} style={{"width": "100%"}}>
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
      updateTask:(data) => { 
        dispatch(actionUpdator(data))
      }, getTaskAction:() => { 
      dispatch(getTaskAction({}))
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

