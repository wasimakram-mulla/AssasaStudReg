import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewcourseComponent } from './newcourse/newcourse.component';
import { RegcourseComponent } from './regcourse/regcourse.component';
import { AllstudentsComponent } from './allstudents/allstudents.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ExplorecourseComponent } from './explorecourse/explorecourse.component';
import { ToDatePipe } from './to-date.pipe'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newcourse', component: NewcourseComponent },
  { path: 'allstuds', component: AllstudentsComponent },
  { path: 'explorecourse/:courseId', component: ExplorecourseComponent },
  { path: 'reg/:courseId', component: RegcourseComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    NewcourseComponent,
    RegcourseComponent,
    AllstudentsComponent,
    SearchFilterPipe,
    ExplorecourseComponent,
    ToDatePipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
