import { createReducer, on } from '@ngrx/store';
import { TaskItemsState } from '../store/task.store';
import { taskActions } from '../action/task.action';


export const initialState: TaskItemsState = { listOfTasks: [] };

export const taskReducer = createReducer(
  initialState,
  on(taskActions.getTask, (state) => {
    return {
        ...state,
    }}),
  on(taskActions.addTask, (state, {task}) => {
    return {
    ...state,
    listOfTasks: [...state.listOfTasks, task]
  }}),
  on(taskActions.updateTask, (state, {id}) => {
    let list = state.listOfTasks.map(task => {
      if(task.id === id){
        return {
          ...task,
          status: !task.status
        } 
      }
      return task
  })
  
    return {
    ...state,
    listOfTasks: list
  }}
  )
);