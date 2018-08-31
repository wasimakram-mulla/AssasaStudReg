import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public authState$: Observable<firebase.User>;
  isAdmin: Boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router) { 
    this.authState$ = afAuth.authState;
    this.authState$.subscribe( (user: firebase.User) => {
      if (user !== null) {
        if(user.email == "wasim3ace@gmail.com" || user.email == "shabib.ahmed@gmail.com"){
          this.isAdmin = true;
        }
        else{
          this.isAdmin = false;
        }
      }
      else{
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
  }
  
  logout() {
    this.afAuth.auth.signOut().then( success => {
      this.router.navigate(['login']);
    });
  }
}
