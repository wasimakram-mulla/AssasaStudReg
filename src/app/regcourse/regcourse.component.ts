import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../newcourse/course.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CourseRegs } from '../newcourse/coursereg.model'

@Component({
  selector: 'app-regcourse',
  templateUrl: './regcourse.component.html',
  styleUrls: ['./regcourse.component.css']
})
export class RegcourseComponent implements OnInit {
  private courseCollection: AngularFirestoreCollection<Course>;
  private coursdetsCollection: AngularFirestoreCollection<CourseRegs>;
  private coursdetsSortCollection: AngularFirestoreCollection<CourseRegs>;
  courses: Observable<any[]>;
  course: Observable<any[]>;
  courseSort: Observable<any[]>;
  courseId: any;
  spinnerFlag: Boolean = false;
  isCourseAvail: Boolean = false;
  public authState$: Observable<firebase.User>;
  userdets: any;
  seeDesc: Boolean = false;
  descText: string = "See";
  displayName: string;
  email: string;
  successFlag: boolean = false;
  errorFlag: boolean = false;
  disableField: boolean = false;
  alreadyReg: boolean = false;
  regClicked: boolean = false;
  contactno: any;

  constructor(db: AngularFirestore, private route: ActivatedRoute, private router: Router, public afAuth: AngularFireAuth) { 
    this.authState$ = afAuth.authState;
    this.authState$.subscribe( (user: firebase.User) => {
      if (user !== null) {
        this.userdets = user;
        this.displayName = user.displayName;
        this.email = user.email;
        //console.log(this.userdets);
      }
      else{
        this.router.navigate(['login']);
      }
    });

    this.spinnerFlag = true;
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    //console.log(this.courseId);

    
    this.coursdetsSortCollection = db.collection('courseregs', ref => ref.orderBy('courseId', 'desc') );
    this.coursdetsCollection = db.collection<CourseRegs>('courseregs');
    this.courseCollection = db.collection<Course>('courses');
    this.courseSort = this.coursdetsSortCollection.valueChanges();
    this.courses = this.courseCollection.valueChanges();
    this.courses.subscribe(courses => {
      this.spinnerFlag = false;
      for(var i in courses){
        if(courses[i].courseId == this.courseId){
          this.course = courses[i];
          this.isCourseAvail = true;
          break; 
        }
      }

      if(this.isCourseAvail == false){
        alert("This course has been removed.");
        this.router.navigate(['dashboard']);
      }
    });
    this.courseSort.subscribe(courses => {
      for(let i in courses){
        if(courses[i].email == this.email){
          this.contactno = courses[i].contact;
          break; 
        }
      }
      for(let j in courses){
        if(courses[j].courseId == this.courseId && courses[j].email == this.email && this.regClicked == false){
          this.alreadyReg = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  toggleDesc(){
    if(this.seeDesc == true){
      this.seeDesc = false;
      this.descText = "See";
    }
    else{
      this.seeDesc = true;
      this.descText = "Hide"
    }
  }

  register(){
    var vm = this;
    this.regClicked = true;
    var dt = new Date();
    let regDetails = {
      courseId: this.courseId,
      name:this.displayName,
      email: this.email,
      contact: this.contactno,
      registeredDate: dt.getTime()
    };

    this.disableField = true;
    //console.log(regDetails);
    this.coursdetsCollection.add(regDetails)
    .then(function(){
      vm.successFlag = true;
    })
    .catch(function(){
      vm.errorFlag = true;
    });
    Observable.interval(5000).take(1).subscribe(() => {
      vm.successFlag = false;
      vm.errorFlag = false;
      vm.disableField = false;
      vm.displayName = "";
      vm.email = "";
      vm.contactno = null;
      this.router.navigate(['dashboard']);
    });
  }
}