import { Component, OnInit } from '@angular/core';
import { StatService } from "../../services/stat.service";
import { Observable } from "@node_modules/rxjs";
import { Stat } from "../../models/stat";
import { tap } from "@node_modules/rxjs/internal/operators";

@Component({
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.scss'],
  providers: [StatService]
})
export class StatPageComponent implements OnInit {
  stat$: Observable<Stat>;
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.stat$ = this.statService.stat$.pipe(tap(console.log))
  }
}
