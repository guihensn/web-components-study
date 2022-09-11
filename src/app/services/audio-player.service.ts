import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AudioPlayerService {
  static soundsPath = 'assets/sounds';

  playAudio(audioName: string, volume: number){
    let audio = new Audio(`${AudioPlayerService.soundsPath}/${audioName}`);
    audio.volume = volume;
    audio.loop = false;
    audio.play();
  }

  setAudioEventToElement(selector: string, event: string, audioName: string, volume: number){
    let buttons = window.document.querySelectorAll(selector);

    buttons.forEach((button)=>{
      button.addEventListener(event, ()=>this.playAudio(audioName, volume));
    })
  }

}
