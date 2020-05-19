import { Component } from '@angular/core';

const PlayerType = {
  human: 'Player',
  computer: 'Computer'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-rockpaperscissors';
  loading: boolean = false;
  players = [
    { type: PlayerType.human, selectedWeapon: -1, score: 0 },
    { type: PlayerType.computer, selectedWeapon: -1, score: 0 },
  ];
  result: number = -1;

  pickWeapon(index: number): void {
    if (this.loading) return;
    this.loading = true;

    this.players[0].selectedWeapon = index;

    setTimeout(() => {
      const randomNum =  Math.floor(Math.random() * 3);
      this.players[1].selectedWeapon = randomNum;
      this.loading = false;
      this.announceResult();
    }, Math.floor(Math.random() * 500) + 300);
  }

  announceResult(): void {
    if (this.players[0].selectedWeapon === this.players[1].selectedWeapon) {
      // Tie
      this.result = 2;
    } else if ((this.players[0].selectedWeapon - this.players[1].selectedWeapon + 3) % 3 === 1) {
      // Win
      // ( 0 - 1 + 3 ) % 3  = 2
      // ( 0 - 2 + 3) % 3 = 1
      // ( 2 - 1 + 3 ) % 3 = 1
      this.result = 1;
      this.players[0].score++;
    } else {
      // Lose
      this.result = 0;
      this.players[1].score++;
    }
  }

  resetScore(): void {
    this.result = -1;
    this.players.forEach(player => {
      player.score = 0;
      player.selectedWeapon = -1;
    });
  }
}
