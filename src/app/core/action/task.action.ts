import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemList, SlotAndID } from '../interface/task.interface';

export const taskActions = createActionGroup({
    source: 'Task',
    events: {
        'Get Task': emptyProps(),
        'Add Task': props<{slot: number, task: ItemList}>(),
        'Update Task': props<SlotAndID>(),
        'Change Name Task': props<{newName: string}>(),
        'Update Name List': props<{slot: number, nameList: string}>(),
        'Switch Daily Mode Task': emptyProps(),
        'Delete Task': emptyProps(),
        'Open Modal': props<SlotAndID>(),
        'Close Modal': emptyProps(),
    },
})