import { Component } from '@angular/core';
import * as firebase from 'firebase';
import {BaseDeDonneeService} from "./services/base-de-donnee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'time-tracker';

  constructor(private database : BaseDeDonneeService) {
      // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCpzrdH-1f6reqCI-xs5A7APQ1cxKGaJFo",
      authDomain: "http-client-demo-9d2fa.firebaseapp.com",
      databaseURL: "https://http-client-demo-9d2fa.firebaseio.com",
      projectId: "http-client-demo-9d2fa",
      storageBucket: "http-client-demo-9d2fa.appspot.com",
      messagingSenderId: "966204857437",
      appId: "1:966204857437:web:243b22f24d7f1f1e9701b4",
      measurementId: "G-TQYFD5ZF1S"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    }

}
