import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  weapons: string[] = [
    'rock',
    'paper',
    'scissors'
  ];
  isPlayer: boolean = false;
  colorTheme: string;

  @Input() player;
  @Output() weaponClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.isPlayer = this.player.type === 'Player';
    this.colorTheme = this.isPlayer ? 'primary' : 'accent';
  }

  getClassName(index: number): string {
    return `
      fa 
      fa-hand-${this.weapons[index]}-o 
      ${this.player.selectedWeapon === index ? 'selected': ''} 
      ${!this.isPlayer ? 'computer' : ''}
    `;
  }

  pickWeapon(index: number) {
    if (this.isPlayer)
      this.weaponClick.emit(index);
  }

}
