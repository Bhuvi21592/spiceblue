/*eslint-disable no-unused-vars */
import React from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Accordion} from 'react-bootstrap';
import TaskForm from './TaskForm';
import {TaskHeader,TaskHeaderPlus} from './TaskHeader';
import { Eye,Trash} from 'react-bootstrap-icons';
import {deleteTaskAction, loadTaskAction,getTaskAction} from '../saga/saga';
import  "../css/style.css";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={showForm:false}
  }
  componentDidMount(){
    this.props.login();
    
  }
  componentWillReceiveProps(prevProps){
  if (prevProps.token !== this.props.token){
  this.props.loadTasks();
  this.props.assigneeList();
}
  } 
  setFormState(){
    this.setState({showForm: !this.state.showForm })
   }
   showForm(){
    document.getElementById("expand").click();
   }
  
  render (){
    const {tasks = []} =this.props;
    const listItems =tasks.results && tasks.results.length> 0 && tasks.results.map((d) =>
     <div><Col sm={8} md={8} lg={8}  style={{"border-bottom":"1px solid #e2e1e1"}} ><span >{d.task_msg}</span><br/>
     <span style={{"color":"red"}}>{d.task_date}</span></Col>
     <Col  sm={2} md={2} lg={2}  style={{"border-bottom":"1px solid #e2e1e1","padding-top":"15px","padding-bottom":"5px"}}>
       <Eye onClick={()=>{this.props.getTaskAction(d);this.showForm();}}/></Col>
       <Col  sm={2} md={2} lg={2}  style={{"border-bottom":"1px solid #e2e1e1","padding-top":"15px","padding-bottom":"5px"}}>
       <Trash onClick={()=>{this.props.deleteTaskAction(d.id);}}/></Col>
       </div>);
   
    return(<>
     
     <section><nav>
     <ul>
       <li>Task</li>
      
     </ul>
   </nav><article>   
       <Row>
    <Accordion defaultActiveKey="0"  transition={false}   as={Col} sm={4} md={4} lg={4}>
    
      <Card>
        <Card.Header className="container" style={{"width":"initial","border":"1px solid #e2e1e1"}}><div>
      <div style={{"float":"left"}}>Task(s)</div>
          <TaskHeaderPlus  eventKey="0"></TaskHeaderPlus>
          <TaskHeader eventKey="1"></TaskHeader></div>
        </Card.Header>
        <Accordion.Collapse className="bg-info container" style={{"width":"initial","border":"1px solid #e2e1e1"}} eventKey="1">
          <Card.Body><TaskForm /></Card.Body>
        </Accordion.Collapse>
        <Accordion.Collapse className="bg-light container"  style={{"width":"initial","border":"1px solid #e2e1e1"}} eventKey="0">
          <Card.Body>
        
      {listItems }
     </Card.Body>
        </Accordion.Collapse>
      </Card></Accordion></Row><Row>
       </Row>
      </article></section>
     </>
    )
  }
}
const mapStateToProps  = state => {
  return {
    tasks: state.task,
    token:state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => { 
        dispatch({type: 'LOGIN_USER' })
      },
      loadTasks: () => { 
        dispatch(loadTaskAction())
      },
      assigneeList:() => { 
        dispatch({type: 'FETCH_ASSIGNEE' })
      },
      deleteTaskAction:(data) =>  dispatch( deleteTaskAction(data)),
      getTaskAction:(data) =>  dispatch( getTaskAction(data))
  }
};
export default connect(
  mapStateToProps
,
  mapDispatchToProps
)(App);

