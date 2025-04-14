import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [
    FloatLabelModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListoToDoComponent{
  value: string = ""
  buttonLabel = input<string>("Guardar")
  label = input<string>("")
  saveValue = output<string>()

  constructor(private cdr: ChangeDetectorRef){}

  save(){
    this.saveValue.emit(this.value);
    this.value = "";
    this.cdr.detectChanges();
  }
}