import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Course } from './course.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css']
})
export class NewcourseComponent implements OnInit {
  courseTitle: any;
  offerPrice: any;
  courseDesc: any;
  successFlag: boolean = false;
  errorFlag: boolean = false;
  disableField: boolean = false;
  private coursesCollection: AngularFirestoreCollection<Course>;
  public authState$: Observable<firebase.User>;
  isAdmin: Boolean = false;

  constructor(public afAuth: AngularFireAuth, db: AngularFirestore, private router: Router) {
    this.coursesCollection = db.collection<Course>('courses');
    this.authState$ = afAuth.authState;
    this.authState$.subscribe( (user: firebase.User) => {
      if (user !== null) {
        //console.log(user.email)
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

  addNewCourse(){
    let vm = this;
    let desc = this.courseDesc.replace(/(\r\n|\n|\r)/gm, "<br>");
    let dt = new Date();
    let currDateTime = dt.getTime(); 
    let courseObj = {
      title: this.courseTitle,
      description: desc,
      price: this.offerPrice,
      createdDate: currDateTime,
      courseId: currDateTime,
      status: 'active'
    }
    this.disableField = true;

    this.coursesCollection.add(courseObj)
      .then(function(){
        window.scrollTo(0, 0);
        vm.successFlag = true;
      })
      .catch(function(){
        vm.errorFlag = true;
      });


    Observable.interval(5000).take(1).subscribe(() => {
      vm.successFlag = false;
      vm.errorFlag = false;
      vm.disableField = false;
      vm.courseDesc = "";
      vm.courseTitle = "";
      vm.offerPrice = "";
      this.router.navigate(['reg/'+currDateTime]);
    });
    courseObj = null;
  }
}
