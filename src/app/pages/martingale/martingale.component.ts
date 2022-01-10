import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-martingale',
  templateUrl: './martingale.component.html',
  styleUrls: ['./martingale.component.css'],
})
export class MartingaleComponent implements OnInit {
  eg_balance;
  eg_bet_amount;
  eg_start_bet;
  eg_statement;
  eg_game_started = false;
  simulated_eg_balance;
  simulated_eg_bet_amount;
  simulated_eg_start_bet;
  simulated_eg_current_bet;
  simulated_eg_history;

  constructor() {}

  ngOnInit(): void {
    this.resetegGamble();
  }

  startegGame() {
    this.resetegGamble();
    this.eg_game_started = true;
  }

  resetegGamble() {
    this.eg_balance = 100;
    this.eg_bet_amount = 1;
    this.eg_start_bet = 1;
    this.eg_statement = '';
  }

  egGamble() {
    // rand 0 -> 1
    let rand = Math.random();

    if (this.eg_balance <= 0) {
      this.eg_statement = `No money! Bust :(`;
      return;
    }

    if (this.eg_bet_amount > this.eg_balance) {
      this.eg_bet_amount = this.eg_balance;
    }

    if (rand < 0.5) {
      this.eg_balance += this.eg_bet_amount;
      this.eg_statement = `Win ${this.eg_bet_amount}, Balance ${this.eg_balance}... Resetting bet to $1`;
      this.eg_bet_amount = this.eg_start_bet;
    } else {
      this.eg_balance -= this.eg_bet_amount;
      this.eg_statement = `Loss ${this.eg_bet_amount}! Balance ${
        this.eg_balance
      }... Increasing bet to ${this.eg_bet_amount * 2}`;
      this.eg_bet_amount *= 2;
    }
  }

  simulateEg() {
    this.simulated_eg_balance = 100;
    this.simulated_eg_bet_amount = 1;
    this.simulated_eg_start_bet = 1;
    this.simulated_eg_current_bet = 1;
    this.simulated_eg_history = [this.simulated_eg_balance];
    while (this.simulated_eg_balance > 0) {
      this.simulateegGamble();
    }
    console.log(this.simulated_eg_history);

    // Amount of gambles until bankrupt
    return this.simulated_eg_history.length;
  }

  simulateegGamble() {
    let rand = Math.random();
    if (this.simulated_eg_balance <= 0) {
      return;
    }

    if (this.simulated_eg_bet_amount > this.simulated_eg_balance) {
      this.simulated_eg_bet_amount = this.simulated_eg_balance;
    }

    if (rand < 0.5) {
      this.simulated_eg_balance += this.simulated_eg_bet_amount;
      this.simulated_eg_bet_amount = this.simulated_eg_start_bet;
      this.simulated_eg_history.push(this.simulated_eg_balance);
    } else {
      this.simulated_eg_balance -= this.simulated_eg_bet_amount;
      this.simulated_eg_bet_amount *= 2;
      this.simulated_eg_history.push(this.simulated_eg_balance);
    }
  }
}
