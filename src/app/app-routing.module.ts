import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomGameMenuComponent } from './custom-game-menu/custom-game-menu.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'game', component: GameComponent , data: {width: '20', height: '20', mineQuantity: '10'}},
  { path: 'menu', component: GameMenuComponent},
  { path: 'custom-game', component: CustomGameMenuComponent},
  { path: '',   redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
