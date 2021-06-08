import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SenderSent } from 'src/app/store/infrastructure/infrastructure.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.css']
})
export class LayoutViewComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    const sender = window.prompt("Escribe tu nombre de usuario", "Anonymous") || "Anonymous";
    this.store.dispatch(SenderSent({sender}));
  }

}
