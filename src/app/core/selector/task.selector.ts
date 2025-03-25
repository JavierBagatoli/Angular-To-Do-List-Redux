import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskItemsState } from "../store/task.store";

export const selectTaskState = createFeatureSelector<TaskItemsState>('task');

export const selectTaskItems = createSelector(
    selectTaskState, (state) => state.listOfTasks
)