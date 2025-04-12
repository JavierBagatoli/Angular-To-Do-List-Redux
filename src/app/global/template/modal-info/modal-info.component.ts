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
  selector: 'app-modal-info',
  standalone: true,
  imports: [
    DividerModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalInfoComponent {
  private readonly store = inject(Store<{task : TaskItemsState}>);
  
  showModal = input.required<string>();
  closeModalEmit = output()

  closeModal(){
    this.closeModalEmit.emit()
  }
}
