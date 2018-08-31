import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CourseRegs } from '../newcourse/coursereg.model';
import { SearchFilterPipe } from '../search-filter.pipe';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allstudents',
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.css']
})
export class AllstudentsComponent implements OnInit {
  private coursdetsCollection: AngularFirestoreCollection<CourseRegs>;
  courses: Observable<any[]>;
  user:any =  new Array();
  spinnerFlag: Boolean = false;
  public authState$: Observable<firebase.User>;
  isAdmin: Boolean = false;
  searchField: string;
  
  constructor(public afAuth: AngularFireAuth, db: AngularFirestore, private router: Router) {
    this.coursdetsCollection = db.collection<CourseRegs>('courseregs');
    this.courses = this.coursdetsCollection.valueChanges();
    this.courses.subscribe(courses => {
      this.spinnerFlag = false;
      for(let i=0; i<courses.length; i++){
        for(let j=i+1; j<courses.length; j++){
          if(courses[i].email == courses[j].email){
            courses.splice(j, 1);
            j--;
          }
        }
      }
      
      //console.log(courses)
      this.user = courses;
    });

    this.authState$ = afAuth.authState;
    this.authState$.subscribe( (user: firebase.User) => {
      if (user !== null) {
        console.log(user.email)
        if(user.email == "wasim3ace@gmail.com" || user.email == "shabib.ahmed@gmail.com"){
          this.isAdmin = true;
        }
        else{
          this.router.navigate(['dashboard']);
        }
      }
      else{
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
  }
 
}
