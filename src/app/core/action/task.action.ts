import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemList, SlotAndID } from '../interface/task.interface';

export const taskActions = createActionGroup({
    source: 'Task',
    events: {
        'Get Task': emptyProps(),
        'Add Task': props<{slot: number, task: ItemList}>(),
        'Update Task': props<SlotAndID>(),
        'Update Name List': props<{slot: number, nameList: string}>(),
        'Switch Daily Mode Task': props<SlotAndID>(),
        'Delete Task': emptyProps(),
        'Open Delete Modal': props<SlotAndID>(),
        'Close Delete Modal': emptyProps(),
    },
})