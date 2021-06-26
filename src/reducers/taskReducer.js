import * as types from "../actions/actionTypes";

const initialState = {
    data: [],
    loading: false,   
    error: '',
    token:"",
    singleTask:{}
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {    
    case types.LOGIN_USER: {  
        return { ...state,loading: false,error:'' };
    } 
    case types.LOAD_TASKS: {  
        return { ...state,loading: true,error:''};
    }
    case types.LOAD_TASKS_SUCCESS: {    
        return { ...state,  task: action.task,loading: false} 
    }  
    case types.LOAD_TASKS_ERROR: { 
        return { ...state,loading: false,error: action.error};    
    }
    case types.GET_TASK_SUCCESS: {    
        return { ...state,  singleTask: action.data.data,loading: false} 
    }  
    case types.GET_TASK_ERROR: { 
        return { ...state,loading: false,error: action.error};    
    }
    case types.LOAD_ASSIGNEE: {    
        return { ...state,  assignee: action.assignee,loading: false} 
    }  
    case types.LOAD_ASSIGNEE_ERROR: { 
        return { ...state,loading: false,error: action.error};    
    }   
    case types.LOAD_TOKEN_SUCCESS: {    
        return { ...state,  token: action.data,loading: false} 
    }  
    case types.LOAD_TOKEN_ERROR: { 
        return { ...state,loading: false,error: action.error};    
    }
    case types.ADD_TASKS_SUCCESS: {  
      return { ...state,  data: action.data,loading: false} 
       
  }  
  case types.ADD_TASKS_ERROR: { 
      return { ...state,loading: false,error: action.error};    
  }  
    default: {
        return state;  
    } 
  }
}
