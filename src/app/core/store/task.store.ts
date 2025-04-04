import { SlotAndID, TaskData } from "../interface/task.interface";

export interface TaskItemsState{
    memory: TaskData[]
    taskIdToDelete: SlotAndID | null;
    isOpenDeleteModal: boolean;
    isLoadingMemory: boolean;
}