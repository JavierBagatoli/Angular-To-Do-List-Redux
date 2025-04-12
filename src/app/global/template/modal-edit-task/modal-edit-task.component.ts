import { ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal, ɵunwrapWritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { taskActions } from '../../../core/action/task.action';
import { Store } from '@ngrx/store';
import { TaskItemsState } from '../../../core/store/task.store';
import { ButtonModule } from 'primeng/button';
import { ItemList } from '../../../core/interface/task.interface';
import { selectIsOpenModal, selectTaskOnMemory } from '../../../core/selector/task.selector';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ListoToDoComponent } from "../../components/input-text/input-text.component";

@Component({
  selector: 'app-modal-edit-task',
  standalone: true,
  imports: [
    DividerModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ListoToDoComponent
],
  templateUrl: './modal-edit-task.component.html',
  styleUrl: './modal-edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  private readonly store = inject(Store<{task : TaskItemsState}>);
  
  showModal = false;
  loading: boolean = false;

  selectedTask : ItemList = {
    label: "aa",
    status: false,
    id: 0
  };

  editNameTask = false;

  ngOnInit(): void {
    this.store.select(selectTaskOnMemory).subscribe(
      val => {
        this.selectedTask = val;
      }
    );

    this.store.select(selectIsOpenModal).subscribe(
      val => {
        this.showModal = val;
      }
    )
  };

  saveNameTask($name : string):void{
    if($name.length > 0){
      this.store.dispatch(taskActions.changeNameTask({newName: $name}));
      this.activateLoading();
    }
    this.editNameTask = false;
  };

  deleteTask(): void{
    this.store.dispatch(taskActions.deleteTask());
    this.closeModal()
  };

  switchDailyMode(){
    this.store.dispatch(taskActions.switchDailyModeTask());
    this.activateLoading();
  }

  closeModal(): void{
    this.store.dispatch(taskActions.closeModal())
  };

  activateLoading(): void{
    this.loading = true
    setTimeout(() => {
      this.loading = false
    },1)
  }
}
