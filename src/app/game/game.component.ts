import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BoardAdaptor } from '../mine-sweeper-core/adaptors/BoardAdaptor';
import { Position } from '../mine-sweeper-core/Entities/position';
import { GameFactory } from '../mine-sweeper-core/factories/gameFactory';

import { Game } from '../mine-sweeper-core/UseCases/game';
import { AudioPlayerService } from '../services/audio-player.service';
import { GameLauncherService } from '../services/game-launcher.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  static PauseIcon:string = "pause";
  static PlayIcon:string = "play_arrow";

  game!: Game;
  boardView!: BoardAdaptor;
  mineQuantity!: number;
  quantityMarkedMines: number = 0;

  gameFactory: GameFactory = new GameFactory();

  refreshDisabled: boolean = true;
  pauseDisabled: boolean = true;
  pauseIcon: string = 'pause';
  showPauseScreen: boolean = false;
  
  isShowingMessage = false;
  message = '';
  messageColor = 'transparent';

  constructor(
    private router: Router,
    private gameLauncherService: GameLauncherService,
    private audioPlayer: AudioPlayerService
  ){}

  ngOnInit(): void{
    if(!this.gameLauncherService.game){
      return void this.router.navigate(['/menu']);
    }

    this.game = this.gameLauncherService.game;
    this.boardView = new BoardAdaptor(this.game.board);
    this.mineQuantity = 0;

    this.game.eventsHandler.onFirstMoveSubscribe(()=>{
      this.changeScreenState(true, true, GameComponent.PauseIcon, false);
    })

    this.game.eventsHandler.onPausedSubscribe(()=>{
      this.changeScreenState(false, false, GameComponent.PlayIcon, true);
    })

    this.game.eventsHandler.onIsPlayingSubscribe(()=>{
      this.changeScreenState(false, false, GameComponent.PauseIcon, false);
    })

    this.game.eventsHandler.onLostSubscribe(()=>{
      this.audioPlayer.playAudio('mixkit-pixel-chiptune-explosion-1692.wav', 0.7);
      this.showMessage('Lost', '#ff0035');
      this.changeScreenState(false, true, GameComponent.PauseIcon, false);
    })

    this.game.eventsHandler.onWinedSubscribe(()=>{
      this.showMessage('Won', '#43AA8B');
      this.audioPlayer.playAudio('mixkit-magic-sweep-game-trophy-257.wav', 0.7);
      this.changeScreenState(false, true, GameComponent.PauseIcon, false);
    })
  }

  ngAfterViewInit(){
    this.audioPlayer.setAudioEventToElement('button','click','mixkit-tech-click-1140.wav', 0.5);
  }

  showMessage(message:string, color:string){
    this.isShowingMessage = true;
    this.message = message;
    this.messageColor = color;
  }

  hideMessage(){
    this.isShowingMessage = false;
    this.message = '';
  }

  changeScreenState(refreshDisabled:boolean, pauseDisabled:boolean, pauseIcon:string, showPauseScreen:boolean) {
      this.refreshDisabled = refreshDisabled;
      this.pauseDisabled = pauseDisabled;
      this.pauseIcon = pauseIcon;
      this.showPauseScreen = showPauseScreen;
  }

  revealField(position: Position){
    this.audioPlayer.playAudio('mixkit-classic-click-1117.wav', 0.5);
    this.game.revealField(position);
  }

  markMineField(position: Position){
    this.audioPlayer.playAudio('mixkit-classic-click-1117.wav', 0.5);
    this.game.markMine(position);
  }

  resetGame(): void {
    this.game.reset();
    this.hideMessage();
  }

  pause(){
    this.game.pause();
  }

  changeConfig(){
    this.gameLauncherService.destroyGame();
    this.router.navigate(['/menu'])
  }
}
