import { createReducer, on } from '@ngrx/store';
import { TaskItemsState } from '../store/task.store';
import { taskActions } from '../action/task.action';
import { ItemList, TaskData } from '../interface/task.interface';

export const initialState: TaskItemsState = {
  memory: [],
  taskIdToDelete: null,
  isOpenModal: false,
  isLoadingMemory: false,
  slotListFavourite: -1,
  slotToDelete: -1,
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.restart, () => {
    return initialState
  }),

  on(taskActions.getTask, (state) => {
    prepareMemory()
    let memory = JSON.parse(localStorage.getItem("memory")!);
    
    while (memory.length <= 10) {
      memory.push(taskInit(memory.length+1))
    }

    prepareDate()
    const lastDay = new Date(Number(localStorage.getItem("date")!));
    
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
      localStorage.setItem("date", JSON.stringify(new Date().getTime()))
    }

    const slotListFavourite : number = JSON.parse(localStorage.getItem("slotListFavourite")!) || -1
    return {
      ...state,
      memory : newMemory,
      slotListFavourite: slotListFavourite
    }}),

  on(taskActions.addTask, (state, {slot , task}) => {
    let newArray : ItemList[] = [...state.memory[slot].listOfTasks, task];

    let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));

    newMemory[slot].listOfTasks = newArray;
    newMemory[slot].id = Math.random() * 100000
    console.log(newMemory[slot].id)
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

    let newArray = state.memory[slotItem].listOfTasks.filter(task => task.id !== idItem);

    let newMemory : TaskData[] = JSON.parse(JSON.stringify(state.memory));
    newMemory[slotItem].listOfTasks = newArray;

    return {
      ...state,
      memory: newMemory,
      taskIdToDelete: null,
    };
  }),


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
  }}),

  on(taskActions.markListAsFavourite, (state, {slot}) => {
    return {
      ...state,
      slotListFavourite: state.slotListFavourite === slot? -1 : slot}
  }),

  
  on(taskActions.openDeleteList, (state, {slot}) => {
    return {
      ...state,
      slotToDelete: slot}
    }),
    
  on(taskActions.cleanDeleteListID, (state) => {
    return {
      ...state,
      slotToDelete: -1}
  }),

  on(taskActions.deleteList, (state) => {
    let newArray = state.memory.filter((_vector, index) => index !== state.slotToDelete)

    if(
      state.slotListFavourite === JSON.parse(localStorage.getItem("slotListFavourite")!)
    ){
      localStorage.setItem("slotListFavourite","")
    }

    let newSlotIDFavourite = -1
    if(state.slotListFavourite > state.slotToDelete){
      newSlotIDFavourite = state.slotListFavourite-1;
    }else if(state.slotListFavourite < state.slotToDelete){
      newSlotIDFavourite = state.slotListFavourite;
    }

    return {
      ...state,
      memory: newArray,
      slotToDelete: -1,
      slotListFavourite: newSlotIDFavourite
    }
  }),

  

);

const prepareMemory = () =>{
  if(!localStorage.getItem("memory")){
    const init : TaskData[] = []
    for(let i = 0; i < 10; i++){
      init.push(
        taskInit(i)
      );
    }

    localStorage.setItem("memory", JSON.stringify(init))
  }
}

const prepareDate = () =>{
  if(!localStorage.getItem("date")){
    localStorage.setItem("date", JSON.stringify((new Date()).getTime()))
  }
}

const taskInit = (id: number, name: string = "", listSaved: any = []) => {
  return {
    id: id,
    name: "",
    listOfTasks: listSaved
  }
}