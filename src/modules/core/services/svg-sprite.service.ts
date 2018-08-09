import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http/_index";

@Injectable()
export class SvgSpriteService {
  constructor(
    private http: HttpService,
  ) {
  }

  public loadSvgSprite(){
      if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
          return true
      };
      const fileUrl = '/assets/images/sprites/hydro-sprite.svg';

      this.http.get(`http://${window.location.hostname}:${window.location.port}/${fileUrl}`)
          .subscribe(res => {
            const insert = () => document.body.insertAdjacentHTML('afterbegin', res._body);

            document.body ? insert() : document.addEventListener('DOMContentLoaded', insert);
          });
    };
}