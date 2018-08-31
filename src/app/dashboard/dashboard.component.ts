import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Course } from '../newcourse/course.model'
import { Router } from '@angular/router';

interface CourseID extends Course{
  id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private courseCollection: AngularFirestoreCollection<Course>;
  courses: any;
  spinnerFlag: Boolean = false;
  isCourseAvail: Boolean = false;
  public authState$: Observable<firebase.User>;
  isAdmin: Boolean = false;

  constructor(public afAuth: AngularFireAuth,public db: AngularFirestore, private router: Router) {
    this.spinnerFlag = true;
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
    
    this.courseCollection = db.collection<Course>('courses', ref => ref.orderBy('createdDate', 'desc'));
    //this.courseCollection = db.collection<Course>('courses');
    this.courses = this.courseCollection.valueChanges();
    this.courses.subscribe(courses => {
      if(courses.length<=0){
        this.isCourseAvail = true;
        this.spinnerFlag = false;
      }
      else{
        this.isCourseAvail = false;
      }
    });
    this.courses = this.courseCollection.snapshotChanges()
      .map(actions => {
         return actions.map(a =>{
           const data = a.payload.doc.data() as Course;
           const id = a.payload.doc.id;
           this.spinnerFlag = false;
           return { id, data };
         })
      })
  }

  expireCourse(postId){
    //console.log(postId);
    this.db.doc('courses/'+ postId).delete();
  }

  goToRegister(course){
    this.router.navigate(['reg/'+course.courseId]);
  }

  goToExploreCourse(course){
    this.router.navigate(['explorecourse/'+course.courseId]);
  }

  ngOnInit() {
  }

}