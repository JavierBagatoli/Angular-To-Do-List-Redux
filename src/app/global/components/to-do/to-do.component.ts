import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  label = input<string>()
  status = input<boolean>()
  updateList = output()
  checked: boolean = false

  ngOnInit(){
    this.checked = this.status() || false;
  }

  changeStatus(){
    this.updateList.emit()
  }
}
