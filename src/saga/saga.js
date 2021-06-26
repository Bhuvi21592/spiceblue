import { put, takeEvery, takeLatest,all,select,call} from 'redux-saga/effects';
import * as action from "../actions/actionTypes";
export const getData = (state) => state.token
 
async function fetchAsync(func) { 
    const response = await func();
    if (response.ok) {   
        return await response.json(); 
    }
    throw new Error("Unexpected error!!!");
}

function getTasks(){
    
    const getKeyword = 'Bearer '+token;
    return fetch("https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38", { 
            method: 'GET' ,
            headers : {
            'Authorization':getKeyword ,
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        }
    });
}

  
function getToken(){
    const data= {
        email : 'smithcheryl@yahoo.com',
        password : '12345678'
      }
    return fetch("https://stage.api.sloovi.com/login", { 
        method: 'POST' ,
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        },
        body: JSON.stringify(data),   
    });
}


function* addTasks(formdata) {  
    try { 
        token = yield select(getData); 
          const getKeyword = 'Bearer '+token;
          let data = formdata.data;
           data.is_completed=0;
            data.time_zone= 5000;
        const users = yield fetch("https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38", { 
            method: 'POST' ,
            headers :{
                'Authorization': getKeyword,
                'Accept': 'application/json',
                'Content-Type': 'application/json',          
              },
            body: JSON.stringify(data )  
        });
        const body = yield call([users, users.json])
        alert(body.message);
        yield put({type: action.ADD_TASKS_SUCCESS, data: body});        
        yield put(loadTaskAction());
        
    } catch (e) {    
        yield put({type: action.ADD_TASKS_ERROR, error: e.message});  
        alert(e.message);
    }
}

         function fetchAssigneeList(){
            const getKeyword = 'Bearer '+token;
            return fetch("https://stage.api.sloovi.com/team", { 
                method: 'GET' ,
                headers :{
                    'Authorization': getKeyword,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',          
                  }   
            });
        }
        function* fetchAssignee() {  
            try { 
                const users = yield fetchAsync(fetchAssigneeList);
                yield put({type: action.LOAD_ASSIGNEE, assignee: users});
            } catch (e) {    
                yield put({type: action.LOAD_ASSIGNEE_ERROR, error: e.message});  
            }
        }
    
    function* deleteTasks(data) {  
        try { 
            token = yield select(getData); 
              const getKeyword = 'Bearer '+token;
              
              const url ="https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/"+data.data;
            const users = yield  fetch(url, { 
                method: 'DELETE' ,
                headers :{
                    'Authorization': getKeyword,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',          
                  },
                body: {},   
            });
            const body = yield call([users, users.json])
            alert(body.message);
            yield put(loadTaskAction());
            yield put({type: action.ADD_TASKS_SUCCESS, data: body});
        } catch (e) {    
            yield put({type: action.ADD_TASKS_ERROR, error: e.message});  
        }
    }

    function* getSingleTask(data){
        try { 
            token = yield select(getData); 
              const getKeyword = 'Bearer '+token;
             const url ="https://stage.api.sloovi.com/lead_6996a7dcdddc4af3b4f71ccb985cea38/"+data.data;
            const users = yield  fetch(url, { 
                method: 'GET' ,
                headers :{
                    'Authorization': getKeyword,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',          
                  }   
            });
            const body = yield call([users, users.json])
            yield put({type: action.GET_TASK_SUCCESS, data: body});
        } catch (e) {    
            yield put({type: action.GET_TASK_ERROR, error: e.message});  
        }
    }
    function* getSingleTaskNoApi(data){
        try { 
          
            yield put({type: action.GET_TASK_SUCCESS, data});
        } catch (e) {    
            yield put({type: action.GET_TASK_ERROR, error: e.message});  
        }
    }
      
      

function* updateTasks(formdata) {  
    try { 
          token = yield select(getData); 
              const getKeyword = 'Bearer '+token;
              let data = formdata.data;
              const task_id=data.task_id;
              delete data.task_id;
           data.is_completed=0;
            data.time_zone= 5000;
             const url ="https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/"+task_id;
            const users = yield  fetch(url, { 
                method: 'PUT' ,
                headers :{
                    'Authorization': getKeyword,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',          
                  }   ,
                  body: JSON.stringify(data),   
            });
        const body = yield call([users, users.json])
        alert(body.message);
        yield put({type: action.ADD_TASKS_SUCCESS, data: body});
        yield put(loadTaskAction());
       
    } catch (e) {    
        yield put({type: action.ADD_TASKS_ERROR, error: e.message});  
    }
}

function* LoginUser() {  
    try {    
        
        const response = yield fetchAsync(getToken);
        console.log("users",response);
        if (response.errors) {
            yield put({type: action.LOAD_TOKEN_ERROR, error: response.message});
          } else {
            yield put({type: action.LOAD_TOKEN_SUCCESS, data: response.results.token})
          }
           } catch (e) {    
        yield put({type: action.LOAD_TOKEN_ERROR, error: e.message});  
    }
}

function* fetchTask() {  
    try { 
          token = yield select(getData); 
        const tasks = yield fetchAsync(getTasks);
        
        yield put({type: action.LOAD_TASKS_SUCCESS, task: tasks});
    } catch (e) {    
        yield put({type: action.LOAD_TASKS_ERROR, error: e.message});  
    }
}
export const actionCreator=(data)=>({
    type: action.ADD_TASKS,
    data:data
  })
  export const actionUpdator=(data)=>({
    type: action.UPDATE_TASKS,
    data:data
  })
  export const deleteTaskAction=(data)=>({
    type: action.DELETE_TASKS,
    data:data
  })
  export const getTaskAction=(data)=>({
    type: action.GET_TASK,
    data :{task_msg:data.task_msg,task_date:data.task_date,task_time:data.task_time,
        assigned_user:data.assigned_user,task_id:data.id}

  })
  export const loadTaskAction=()=>({
    type: action.LOAD_TASKS
  })
export function* saga() {   
    yield all([
        yield takeLatest(action.LOGIN_USER, LoginUser),
        yield takeEvery(action.LOAD_TASKS, fetchTask),
        yield takeEvery(action.ADD_TASKS, addTasks),
        yield takeEvery(action.UPDATE_TASKS, updateTasks),
        yield takeEvery(action.DELETE_TASKS, deleteTasks),
        yield takeEvery(action.GET_TASK, getSingleTaskNoApi),
        yield takeEvery(action.FETCH_ASSIGNEE, fetchAssignee)
    ]);
  }
  let token;
export default saga;