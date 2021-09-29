import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-gladiators',
  templateUrl: './gladiators.component.html',
  styleUrls: ['./gladiators.component.css'],
  animations: [
    trigger('toggleBox', [
      state(
        'B',
        style({
          visibility: 'visible',
          opacity: 1,
        })
      ),

      state(
        '',
        style({
          visibility: 'hidden',
          opacity: 0,
        })
      ),

      transition('* => B', animate('400ms linear')),
      transition('false => true', animate('400ms linear')),
    ]),
  ],
})
export class GladiatorsComponent implements OnInit {
  myGlads = [];
  enemyGlads = [];
  simulatedMyGlads = [2, 4, 6, 8];
  simulatedEnemyGlads = [2, 4, 6, 8];
  firstGameHidden = true;
  firstGameFightStarted = false;
  firstGameFightWinner = '';
  firstGameState = '';

  constructor() {}

  ngOnInit(): void {}

  initiateFightSequence() {
    if (this.firstGameFightStarted == true) {
      return;
    }
    if (this.firstGameState.length > 0) {
      return;
    }
    this.firstGameFightStarted = true;
    this.firstGameFightWinner = '';

    let chanceAWin = this.percentWinDisplay(0) / 100;
    let chanceBWin = this.percentWinDisplay(1) / 100;
    let r = Math.random();

    this.firstGameFightStarted = false;
    if (r <= chanceAWin) {
      // Player A Wins fight
      this.firstGameFightWinner = 'A';
      this.myGlads[0] += this.enemyGlads[0];
      this.enemyGlads = this.enemyGlads.slice(1);
    } else {
      // Player B Wins fight
      this.firstGameFightWinner = 'B';
      this.enemyGlads[0] += this.myGlads[0];
      this.myGlads = this.myGlads.slice(1);
    }

    // Keeps winner condition for 1 second to apply animation in css
    setTimeout(() => (this.firstGameFightWinner = ''), 1000);

    this.checkWinState();
  }

  checkWinState() {
    if (this.myGlads.length == 0) {
      this.firstGameState = 'LOSS';
    }
    if (this.enemyGlads.length == 0) {
      this.firstGameState = 'WIN';
    }
  }

  // Returns win percent for first cards
  percentWinDisplay(player) {
    if (this.myGlads.length == 0) {
      return player == 0 ? 0 : 100;
    }
    if (this.enemyGlads.length == 0) {
      return player == 0 ? 100 : 0;
    }

    let a = this.myGlads[0];
    let b = this.enemyGlads[0];

    return player == 0 ? 100 * (a / (a + b)) : 100 * (b / (a + b));
  }

  // Returns win percent for simulated cards
  percentWinDisplaySimulated(player) {
    if (this.simulatedMyGlads.length == 0) {
      return player == 0 ? 0 : 100;
    }
    if (this.simulatedEnemyGlads.length == 0) {
      return player == 0 ? 100 : 0;
    }

    let a = this.simulatedMyGlads[0];
    let b = this.simulatedEnemyGlads[0];

    return player == 0 ? 100 * (a / (a + b)) : 100 * (b / (a + b));
  }

  // Start first game on button click
  startFirstGame() {
    this.resetFirstGame();
    this.firstGameHidden = false;
  }

  // Reset first game
  resetFirstGame() {
    this.firstGameFightWinner = '';
    this.firstGameState = '';
    let maxValue = 50;
    let minValue = 5;
    this.myGlads = [
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
    ];
    this.enemyGlads = [
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
      Math.floor(Math.random() * (maxValue - minValue) + minValue),
    ];
  }

  initiateSimulation() {}

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
