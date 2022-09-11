import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameConfigs } from '../mine-sweeper-core/Entities/gameConfigs';
import { AudioPlayerService } from '../services/audio-player.service';
import { GameLauncherService } from '../services/game-launcher.service';

@Component({
  selector: 'app-custom-game-menu',
  templateUrl: './custom-game-menu.component.html',
  styleUrls: ['./custom-game-menu.component.css']
})

export class CustomGameMenuComponent implements OnInit {
  customGameForm = this.formBuilder.group(
    {
      width: new FormControl('4',[Validators.required, Validators.min(4)]),
      height: new FormControl('4',Validators.compose([Validators.required, Validators.min(4)])),
      minePercentage: 24
    }
  )

  lenghtConfig = [
    {
      id:"width",
      label: "Width",
      formControlName: "width",
      min: 4,
      max: 100
    },
    {
      id:"height",
      label: "Heigth",
      formControlName: "height",
      min: 4,
      max: 100
    }
  ]

  minePercentageConfig = {
    id:"minePercentage",
    label: "Mine Percentage",
    formControlName: "minePercentage",
    min: 6,
    max: 38
  }

  constructor(
    private gameLauncherService: GameLauncherService,
    private formBuilder: FormBuilder,
    private router: Router,
    private audioPlayer: AudioPlayerService,
  ) {}

  ngAfterViewInit(){
    this.audioPlayer.setAudioEventToElement('button','click','mixkit-sci-fi-click-900.wav', 0.5);
  }

  ngOnInit(): void {
    this.onChanges();
  }

  onChanges(): void {
    this.customGameForm.valueChanges.subscribe(val => {
      this.updateMinMinesPercentage();
      this.updateMaxMinesPercentage();
      this.updateFormMinePercentage(val.minePercentage);
    });
  }

  updateFormMinePercentage(value: number){
    let min = this.minePercentageConfig.min;
    let max = this.minePercentageConfig.max;

    if(value < min){
      this.customGameForm.patchValue({minePercentage: min});
    }

    if(value > max){
      this.customGameForm.patchValue({minePercentage: max});
    }
  }   

  createConfigs(){  
    let {width, height} = this.customGameForm.value;
    let gameConfigs = new GameConfigs(width, height, this.getQuantityOfMines());
    this.gameLauncherService.createGame(gameConfigs);

    if(this.gameLauncherService.game){
      this.router.navigate(['/game']);
    }
  }

  getQuantityOfMines(){
    let values = this.customGameForm.value;
    return Math.round(values.width * values.height * values.minePercentage / 100);
  }

  updateMinMinesPercentage(){
    let values = this.customGameForm.value;
    let fieldsNumber = values.width * values.height;
    let minMinesPercentage = Math.ceil(100 * 1 / fieldsNumber);

    this.minePercentageConfig.min = minMinesPercentage;
  }
  
  updateMaxMinesPercentage(){
    let values = this.customGameForm.value;
    let fieldsNumber = values.width * values.height;
    let possibleFieldsToDistribute = fieldsNumber - 9;
    
    let maxMinesPercentage = Math.floor(100 * possibleFieldsToDistribute / fieldsNumber);

    this.minePercentageConfig.max = maxMinesPercentage;
  }
}
