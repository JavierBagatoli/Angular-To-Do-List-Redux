import { createReducer, on } from '@ngrx/store';
import { TaskItemsState } from '../store/task.store';
import { taskActions } from '../action/task.action';
import { ItemList, TaskData } from '../interface/task.interface';

export const initialState: TaskItemsState = {
  memory: [],
  taskIdToDelete: null,
  isOpenDeleteModal: false,
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.getTask, (state) => {
    if(!localStorage.getItem("memory")){
      const taskInit : TaskData = {name: "", listOfTasks:[]}
      const init : TaskData[] = [taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit]
      localStorage.setItem("memory", JSON.stringify(init))
    }

    const memory = JSON.parse(localStorage.getItem("memory") || "{}");
    
    return {
      ...state,
      memory : memory,
    }}),

  on(taskActions.addTask, (state, {slot , task}) => {
    console.log(slot, "<<<< SLOT")
    let newArray : ItemList[] = [...state.memory[slot].listOfTasks, task];
    console.log(newArray, "Este es el nuevo vector de posicion")

    let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
    console.log(newMemory, "Este esta es la nueva memoria")

    newMemory[slot].listOfTasks = newArray

    return {
      ...state,
      memory: [...newMemory]
    };
  }),

  on(taskActions.updateTask, (state, {slot, id}) => {
    console.log("a")
    let newArray = state.memory[slot].listOfTasks.map(task => {
      if(task.id === id){
        return {
          ...task,
          status: !task.status
        } 
      }
      return task
  })

  let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
  newMemory[slot].listOfTasks = newArray
  
    return {
    ...state,
    memory: newMemory
  }}
  ),

  on(taskActions.deleteTask, (state) => {
    const idItem :number = state.taskIdToDelete!.id;
    const slotItem :number = state.taskIdToDelete!.slot;
    console.table(state.memory[idItem].listOfTasks)
    let newArray = state.memory[idItem].listOfTasks.filter(task => task.id !== slotItem)
    console.table(newArray)

    let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
    newMemory[slotItem].listOfTasks = newArray;

    return {
      ...state,
      memory: newMemory,
      taskIdToDelete: null,
      isOpenDeleteModal: false,
    }}),

  on(taskActions.openDeleteModal, (state, {slot, id}) => {
    return {
    ...state,
    taskIdToDelete: {slot: slot, id: id},
    isOpenDeleteModal: true
  }}),

  on(taskActions.closeDeleteModal, (state) => {
    return {
    ...state,
    taskIdToDelete: null,
    isOpenDeleteModal: false
  }})
);