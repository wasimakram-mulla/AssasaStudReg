import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public authState$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) { 
    this.authState$ = afAuth.authState;
    this.authState$.subscribe( (user: firebase.User) => {
      if (user !== null) {
        this.router.navigate(['dashboard']);
      }
    } );
  }

  ngOnInit() {
    
  }

  login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
