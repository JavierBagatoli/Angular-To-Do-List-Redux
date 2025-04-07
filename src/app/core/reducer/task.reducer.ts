import { createReducer, on } from '@ngrx/store';
import { TaskItemsState } from '../store/task.store';
import { taskActions } from '../action/task.action';
import { ItemList, TaskData } from '../interface/task.interface';

export const initialState: TaskItemsState = {
  memory: [],
  taskIdToDelete: null,
  isOpenModal: false,
  isLoadingMemory: false,
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.getTask, (state) => {
    if(!localStorage.getItem("memory")){
      const taskInit : TaskData = {name: "", listOfTasks:[]}
      const init : TaskData[] = [taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit,taskInit]
      localStorage.setItem("memory", JSON.stringify(init))
    }
    const memory = JSON.parse(localStorage.getItem("memory")!);
    
    if(!localStorage.getItem("date")){
      localStorage.setItem("date", JSON.stringify(new Date()))
    }

    const lastDay = new Date(localStorage.getItem("date")!);
    let newMemory : TaskData[] = memory;

    if(lastDay.getDay() !== (new Date()).getDay()){
      newMemory = newMemory.map(
        spaceOfMemory => {
          let space = spaceOfMemory.listOfTasks.map(
            task => {
              if(task.daily){
                return {
                  ...task,
                  status: false,
                }
              }
              return task
            }
          )
          return {
            name: spaceOfMemory.name,
            listOfTasks: space
          }
        }
      )
    }
    
    return {
      ...state,
      memory : newMemory,
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
  on(taskActions.updateNameList, (state, {slot, nameList}) => {
  let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
  newMemory[slot].name = nameList
  
    return {
    ...state,
    memory: newMemory
  }}
  ),
  on(taskActions.updateTask, (state, {slot, id}) => {
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

  on(taskActions.changeNameTask, (state, {newName}) => {
    let newArray = state.memory[state.taskIdToDelete!.slot].listOfTasks.map(task => {
      if(task.id === state.taskIdToDelete!.id){
        return {
          ...task,
          label: newName
        } 
      }
      return task
    })

    let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
    newMemory[state.taskIdToDelete!.slot].listOfTasks = newArray
    
      return {
      ...state,
      memory: newMemory
    }}
  ),

  on(taskActions.switchDailyModeTask, (state) => {
    const slotPoss = state.taskIdToDelete!.slot;
    let newArray = state.memory[slotPoss].listOfTasks.map(task => {
      if(task.id === state.taskIdToDelete?.id){
        return {
          ...task,
          daily: !task.daily || false
        } 
      }
      return task
  })

  let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
  newMemory[slotPoss].listOfTasks = newArray
  
    return {
    ...state,
    memory: newMemory
  }}
  ),

  on(taskActions.deleteTask, (state) => {
    const idItem :number = state.taskIdToDelete!.id;
    const slotItem :number = state.taskIdToDelete!.slot;

    let newArray = state.memory[slotItem].listOfTasks.filter(task => task.id !== idItem)

    let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
    newMemory[slotItem].listOfTasks = newArray;

    return {
      ...state,
      memory: newMemory,
      taskIdToDelete: null,
    }}),

  on(taskActions.openModal, (state, {slot, id}) => {

    return {
    ...state,
    taskIdToDelete: {slot: slot, id: id},
    isOpenModal: true
  }}),

  on(taskActions.closeModal, (state) => {
    return {
    ...state,
    taskIdToDelete: null,
    isOpenModal: false
  }})
);