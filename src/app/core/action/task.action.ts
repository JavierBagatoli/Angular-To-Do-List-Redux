import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemList } from '../../global/components/listo-to-do/list-to-do.component';

export const taskActions = createActionGroup({
    source: 'Task',
    events: {
        'Get Task': emptyProps(),
        'Add Task': props<{task: ItemList}>(),
        'update Task': props<{id: number}>()
    },
})