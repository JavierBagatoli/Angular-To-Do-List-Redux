import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemList } from '../../global/components/list-to-do/list-to-do.component';

export const taskActions = createActionGroup({
    source: 'Task',
    events: {
        'Get Task': emptyProps(),
        'Add Task': props<{task: ItemList}>(),
        'Update Task': props<{id: number}>(),
        'Delete Task': emptyProps(),
        'Open Delete Modal': props<{id: number}>(),
        'Close Delete Modal': emptyProps(),
    },
})