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

export const selectIsOpenDeleteModal = createSelector(
    selectTaskState, (state) => state.isOpenDeleteModal
)