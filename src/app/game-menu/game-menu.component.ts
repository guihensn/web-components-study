import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameConfigs } from '../mine-sweeper-core/Entities/gameConfigs';
import { AudioPlayerService } from '../services/audio-player.service';
import { GameLauncherService } from '../services/game-launcher.service';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent{
  gameOptions = [
    {
      title: '9 x 9', 
      config: new GameConfigs(9, 9, 10) 
    },
    {
      title: '16 x 16', 
      config:  new GameConfigs(16, 16, 40) 
    },
    {
      title: '30 x 16', 
      config:  new GameConfigs(32, 16, 99) 
    },
  ]

  constructor(
    public gameLauncher: GameLauncherService,
    private audioPlayer: AudioPlayerService
  ) {}

  ngAfterViewInit(){
    this.audioPlayer.setAudioEventToElement('button','click','mixkit-sci-fi-click-900.wav', 0.5);
  }
}
