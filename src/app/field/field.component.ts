import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { IFieldVisual } from '../entities/IFieldVisual';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent{
  @Input() fieldView!: IFieldVisual;

  fieldDiffer!:  KeyValueDiffer<string, any>;
  content!:string;
  textColor!: string; 
  backgroundColor!: string;
}
