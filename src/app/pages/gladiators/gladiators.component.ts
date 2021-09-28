import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-gladiators',
  templateUrl: './gladiators.component.html',
  styleUrls: ['./gladiators.component.css'],
})
export class GladiatorsComponent implements OnInit {
  myGlads = [];
  enemyGlads = [];
  firstGameHidden = true;

  constructor() {}

  ngOnInit(): void {}

  // Start first game on button click
  startFirstGame() {
    this.resetFirstGame();
    this.firstGameHidden = false;
  }

  // Reset first game
  resetFirstGame() {
    this.myGlads = [33, 8, 12, 16];
    this.enemyGlads = [25, 5, 14, 39];
  }

  // Drag & Drop functionality
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
