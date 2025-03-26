import { createReducer, on } from '@ngrx/store';
import { TaskItemsState } from '../store/task.store';
import { taskActions } from '../action/task.action';

export const initialState: TaskItemsState = {
  listOfTasks: [],
  taskIdToDelete: null,
  isOpenDeleteModal: false,
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.getTask, (state) => {
    const slot1 = JSON.parse(localStorage.getItem("slot1") || "")
    return {
      ...state,
      listOfTasks : slot1,
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
  ),

  on(taskActions.deleteTask, (state) => {
    let list = state.listOfTasks.filter(task => task.id !== state.taskIdToDelete)
  
    return {
    ...state,
    listOfTasks: list,
    taskIdToDelete: null,
    isOpenDeleteModal: false,
  }}),

  on(taskActions.openDeleteModal, (state, {id}) => {
    return {
    ...state,
    taskIdToDelete: id,
    isOpenDeleteModal: true
  }}),

  on(taskActions.closeDeleteModal, (state) => {
    return {
    ...state,
    taskIdToDelete: null,
    isOpenDeleteModal: false
  }})
);