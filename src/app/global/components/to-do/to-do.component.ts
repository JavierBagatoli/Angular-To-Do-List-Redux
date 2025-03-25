import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { taskActions } from '../../../core/action/task.action';
import { Store } from '@ngrx/store';
import { TaskItemsState } from '../../../core/store/task.store';
import { ItemList } from '../listo-to-do/list-to-do.component';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  private readonly store = inject(Store<{task : TaskItemsState}>)
  
  itemTask = input<ItemList>()
  
  updateList = output()
  checked: boolean = false

  ngOnInit(){
    this.checked = this.itemTask()?.status || false;
  }

  changeStatus(){
    this.store.dispatch(taskActions.updateTask({id: this.itemTask()?.id!}))
    this.updateList.emit()
  }
}
