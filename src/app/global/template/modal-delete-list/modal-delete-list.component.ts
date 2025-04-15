import { ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal, ɵunwrapWritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { taskActions } from '../../../core/action/task.action';
import { Store } from '@ngrx/store';
import { TaskItemsState } from '../../../core/store/task.store';
import { ButtonModule } from 'primeng/button';
import { selectIsOpenModalDeleteList } from '../../../core/selector/task.selector';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-modal-delete-list',
  standalone: true,
  imports: [
    DividerModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
],
  templateUrl: './modal-delete-list.component.html',
  styleUrl: './modal-delete-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteListComponent implements OnInit{
  private readonly store = inject(Store<{task : TaskItemsState}>);
  
  showModal : boolean = false;
  closeModalEmit = output()

  ngOnInit(): void {
    this.store.select(selectIsOpenModalDeleteList).subscribe(
      val => {
        this.showModal = val;
      }
    )
  }

  closeModal(){
    this.store.dispatch(taskActions.cleanDeleteListID())
  }

  deleteList(){
    this.store.dispatch(taskActions.deleteList())
  }
}
