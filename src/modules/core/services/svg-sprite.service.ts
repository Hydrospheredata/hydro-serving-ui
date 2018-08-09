import { Injectable } from "@angular/core";

@Injectable()
export class SvgSpriteService {
  public loadSvgSprite(){
      if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
          return true
      };

      let  data;
      const file = './assets/images/sprites/hydro-sprite.svg';
      const insertIT = () => { document.body.insertAdjacentHTML('afterbegin', data); };
      const insert = () => {
          if (document.body) {
            insertIT();
          } else document.addEventListener('DOMContentLoaded', insertIT);
        };

  
      try {
        const request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            data = request.responseText;
            insert();
          }
        }
        request.send();
      } catch (e) {
          console.error(`${e.name} : ${e.message}`)
      }
    };
}