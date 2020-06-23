import { Component, OnInit } from '@angular/core';
// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';
  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
