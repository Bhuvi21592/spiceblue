import React, {useContext} from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import {useAccordionToggle} from 'react-bootstrap/AccordionToggle';
import { PlusSquare,DashSquare} from 'react-bootstrap-icons';
import { useDispatch } from "react-redux";
import {getTaskAction} from '../saga/saga';

export function TaskHeader({eventKey,callback}) {
  const currentEventKey = useContext(AccordionContext); 
   const toggleOnClick =useAccordionToggle(eventKey, () => {
     if(callback)
    callback(eventKey);
  });
  const isCurrentEventKey = currentEventKey === eventKey;
 
  return (
   
    <div style={{"float":"right","border-left":"1px solid #e2e1e1","padding-left":"10px","padding-top":"4px"}}
      type="button" id="expand"
      onClick={toggleOnClick}
    >
      {!isCurrentEventKey && <PlusSquare  eventKey="1"/>}
    </div>
  );
}

export function TaskHeaderPlus({eventKey,callback}) {
  const currentEventKey = useContext(AccordionContext);
  const dispatch = useDispatch();
   const toggleOnClick =useAccordionToggle(eventKey, () => {
    dispatch(getTaskAction({}));
     if(callback)
    callback(eventKey);
  });
  const isCurrentEventKey = currentEventKey === eventKey;

  return (
   
    <div style={{"float":"right","border-left":"1px solid #e2e1e1","padding-left":"10px","padding-top":"4px"}}
      type="button" id="collapse"
      onClick={toggleOnClick}
    >
      {!isCurrentEventKey &&<DashSquare  eventKey="0"/>}
    </div>
  );
}