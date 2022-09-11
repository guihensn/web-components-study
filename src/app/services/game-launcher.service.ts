import { Injectable } from '@angular/core';
import { GameConfigs } from '../mine-sweeper-core/Entities/gameConfigs';
import { GameFactory } from '../mine-sweeper-core/factories/gameFactory';
import { Game } from '../mine-sweeper-core/UseCases/game';

@Injectable({
  providedIn: 'root'
})
export class GameLauncherService {
  game?: Game;
  gameFactory: GameFactory;

  constructor(){
    this.gameFactory = new GameFactory();
  }

  createGame(gameConfigs: GameConfigs) {  
    if(this.hasMoreFieldThenMines(gameConfigs.width, gameConfigs.height, gameConfigs.mineQuantity)){
      this.game = this.gameFactory.makeGame(gameConfigs);
    }
  }

  destroyGame(){
    this.game = undefined;
  }

  hasMoreFieldThenMines(width: number, height: number, mineQuantity:number){
    return width * height - mineQuantity > 0
  }
}
