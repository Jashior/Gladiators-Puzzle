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
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import * as Highcharts from 'highcharts';
import { MathjaxModule } from 'mathjax-angular';

// imports: [MathjaxModule.forChild()],

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
  simulatedMyGlads = [2, 4, 8, 16];
  simulatedEnemyGlads = [2, 4, 8, 16];
  simulatedMyGladsCopy = [];
  simulatedEnemyGladsCopy = [];
  firstGameHidden = true;
  firstGameFightStarted = false;
  firstGameFightWinner = '';
  firstGameState = '';
  simulationStarted = false;
  simulationFinished = false;
  playerATally = 0;
  playerBTally = 0;
  simulateN = 100000;
  simulationChart: typeof Highcharts = Highcharts;
  simulationChartOptions: Highcharts.Options = {};

  math1 = '$$P(x_1)=\\frac{x_1}{x_1 + y_1}$$';
  math2 = '$$P(y_1)=\\frac{y_1}{x_1 + y_1}$$';
  math3 = {
    latex:
      'For example, a level 5 fighting a level 15 will have a $\\frac{5}{5+15}$ (25%) chance of winning',
  };
  math4 = {
    latex: '$int x^2dx = 2x + C$ is worth $2.00.  Even ',
  };
  // math4 = {
  //   latex:
  //     '$\\frac{ $\\sum$\\limits_{i=1}^n x_i}{ $\\sum$\\limits_{i=1}^n x_i + $\\sum$\\limits_{i=1}^n y_i}',
  // };

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

    if (r <= chanceAWin) {
      // Player A Wins fight
      this.firstGameFightWinner = 'A';
      setTimeout(() => {
        this.myGlads[0] += this.enemyGlads[0];
        this.enemyGlads = this.enemyGlads.slice(1);
      }, 1500);
    } else {
      // Player B Wins fight
      this.firstGameFightWinner = 'B';
      setTimeout(() => {
        this.enemyGlads[0] += this.myGlads[0];
        this.myGlads = this.myGlads.slice(1);
      }, 1500);
    }

    // Keeps winner condition for 1 second to apply animation in css
    setTimeout(() => {
      this.firstGameFightWinner = '';
      this.firstGameFightStarted = false;
      this.checkWinState();
    }, 1500);
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

  initiateSimulation() {
    if (this.simulationStarted) {
      return;
    }

    this.simulationFinished = false;
    this.simulationStarted = true;

    this.playerATally = 0;
    this.playerBTally = 0;

    for (let i = 0; i < this.simulateN; i++) {
      this.simulatedMyGladsCopy = this.simulatedMyGlads.slice(0);
      this.simulatedEnemyGladsCopy = this.simulatedEnemyGlads.slice(0);
      let gameResult = this.simulateAGame();

      if (gameResult == 'A') {
        this.playerATally++;
      }

      if (gameResult == 'B') {
        this.playerBTally++;
      }
    }

    setTimeout(() => {
      this.simulationStarted = false;
      this.simulationFinished = true;

      this.simulationChartOptions = {
        title: {
          text: '',
        },
        chart: {
          type: 'bar',
          backgroundColor: 'var(--color-background)',
        },
        xAxis: {
          categories: ['Player A', 'Player B'],
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: `Number of wins (${this.simulateN} games)`,
            align: 'high',
          },
          labels: {
            overflow: 'justify',
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            color: 'var(--color-primary)',
          },
        },
        series: [
          {
            showInLegend: false,
            type: undefined,
            name: 'Simulated Wins',
            data: [this.playerATally, this.playerBTally],
          },
        ],
        credits: {
          enabled: false,
        },
      };
    }, 1000);
  }

  simulateAGame() {
    while (
      this.simulatedMyGladsCopy.length > 0 &&
      this.simulatedEnemyGladsCopy.length > 0
    ) {
      let fightWinner = '';
      fightWinner = this.fightGiven(
        this.simulatedMyGladsCopy[0],
        this.simulatedEnemyGladsCopy[0]
      );

      if (fightWinner == 'A') {
        this.simulatedMyGladsCopy[0] += this.simulatedEnemyGladsCopy[0];
        this.simulatedEnemyGladsCopy = this.simulatedEnemyGladsCopy.slice(1);
      }
      if (fightWinner == 'B') {
        this.simulatedEnemyGladsCopy[0] += this.simulatedMyGladsCopy[0];
        this.simulatedMyGladsCopy = this.simulatedMyGladsCopy.slice(1);
      }
    }

    if (this.simulatedEnemyGladsCopy.length == 0) {
      return 'A';
    }
    if (this.simulatedMyGladsCopy.length == 0) {
      return 'B';
    }
  }

  fightGiven(a, b) {
    let chanceAWin = a / (a + b);
    let chanceBWin = b / (a + b);
    let r = Math.random();

    if (r <= chanceAWin) {
      return 'A';
    } else {
      return 'B';
    }
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
