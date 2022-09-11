import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBoardVisual } from '../entities/IBoardVisual';
import { Position } from '../mine-sweeper-core/Entities/position';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  static leftMouseNumber = 0;

  @Input() width?: string;
  @Input() board?: IBoardVisual;

  @Output() rightClickEvent = new EventEmitter<Position>();
  @Output() leftClickEvent = new EventEmitter<Position>();
  @Output() mouseOldEvent = new EventEmitter<Position>();

  columns: string = "";

  mouseOldTimeout: number = 0;
  mouseOldCount = 0;

  ngOnInit(): void {
    this.columns = this.getColumnCssStyle();
  }

  getColumnCssStyle() {
    return `repeat(${this.board?.width}, auto)`;
  }

  mouseDown(event: MouseEvent, lineNumber: number, columnNumber: number) {
    if (this.isLeftMouseEvent(event)) {
      this.mouseOldTimeout = window.setInterval(() => {
        this.mouseOldEvent.emit(new Position(lineNumber, columnNumber));
        this.mouseOldCount += 500;
      }, 500);
    }
  }

  mouseLeave(event: MouseEvent) {
    if (this.isLeftMouseEvent(event)) {
      clearInterval(this.mouseOldTimeout);
    }
  }

  mouseUp(event: MouseEvent, lineNumber: number, columnNumber: number): void {
    if (this.isLeftMouseEvent(event)) {
      clearInterval(this.mouseOldTimeout);

      if (this.mouseOldCount < 500) {
        return this.rightClickEvent.emit(new Position(lineNumber, columnNumber))
      }

      this.mouseOldCount = 0;
    }
  }

  isLeftMouseEvent(event: MouseEvent){
    return event.button == BoardComponent.leftMouseNumber;
  }

  leftClickPosition(event: Event, lineNumber: number, columnNumber: number) {
    event.preventDefault()
    this.leftClickEvent.emit(new Position(lineNumber, columnNumber));
  }
}
