import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CourseRegs } from '../newcourse/coursereg.model';
import { Course } from '../newcourse/course.model';

@Component({
  selector: 'app-explorecourse',
  templateUrl: './explorecourse.component.html',
  styleUrls: ['./explorecourse.component.css']
})
export class ExplorecourseComponent implements OnInit {
  courseId: any;
  private coursdetsCollection: AngularFirestoreCollection<CourseRegs>;
  private courseCollection: AngularFirestoreCollection<Course>;
  coursesdets: Observable<any[]>;
  courses: Observable<any[]>;
  course: any;
  user:any =  new Array();
  spinnerFlag: Boolean = false;
  searchField: string;

  constructor(db: AngularFirestore, private route: ActivatedRoute, private router: Router) { 
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.spinnerFlag = true;
    this.coursdetsCollection = db.collection<CourseRegs>('courseregs');
    this.coursesdets = this.coursdetsCollection.valueChanges();
    this.coursesdets.subscribe(course => {
      this.spinnerFlag = false;
      this.user.length = 0;
      for(let i=0; i<course.length; i++){
        if(course[i].courseId == this.courseId){
          this.user.push(course[i]);
        }
      }
    });

    //Fetching explorered course 
    this.courseCollection = db.collection<Course>('courses');
    this.courses = this.courseCollection.valueChanges();
    this.courses.subscribe(courses => {
      this.spinnerFlag = false;
      for(var i in courses){
        if(courses[i].courseId == this.courseId){
          this.course = courses[i];
          break; 
        }
      }
      //console.log(this.course);
    });
  }

  ngOnInit() {
  }

}
