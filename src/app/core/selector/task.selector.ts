import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskItemsState } from "../store/task.store";

export const selectTaskState = createFeatureSelector<TaskItemsState>('task');

export const selectTaskItems0 = createSelector(
    selectTaskState, (state) => state.memory[0] 
)
export const selectTaskItems1 = createSelector(
    selectTaskState, (state) => state.memory[1] 
)
export const selectTaskItems2 = createSelector(
    selectTaskState, (state) => state.memory[2] 
)
export const selectTaskItems3 = createSelector(
    selectTaskState, (state) => state.memory[3] 
)
export const selectTaskItems4 = createSelector(
    selectTaskState, (state) => state.memory[4] 
)
export const selectTaskItems5 = createSelector(
    selectTaskState, (state) => state.memory[5] 
)
export const selectTaskItems6 = createSelector(
    selectTaskState, (state) => state.memory[6] 
)
export const selectTaskItems7 = createSelector(
    selectTaskState, (state) => state.memory[7] 
)
export const selectTaskItems8 = createSelector(
    selectTaskState, (state) => state.memory[8] 
)
export const selectTaskItems9 = createSelector(
    selectTaskState, (state) => state.memory[9] 
)
export const selectTaskItems10 = createSelector(
    selectTaskState, (state) => state.memory[10] 
)

export const selectIsOpenModal = createSelector(
    selectTaskState, (state) => {
        return state.isOpenModal}
)

export const selectMemoryTask = createSelector(
    selectTaskState, (state) => {
        return {
            memory: state.memory,
            slotListFavourite: state.slotListFavourite,
        }
    }
)

export const selectslotListFavourite = createSelector(
    selectTaskState, (state) => state.slotListFavourite
)

export const selectIsLoadingMemory = createSelector(
    selectTaskState, (state) => state.taskIdToDelete
)

export const selectTaskOnMemory = createSelector(
    selectIsLoadingMemory,
    selectTaskState,
    (task,state) => {
        if (task){
            return state.memory[task?.slot || 0].listOfTasks[task?.id || 0]
        }
        return {
            label: "",
            status: false,
            id:0
        }
    }
)