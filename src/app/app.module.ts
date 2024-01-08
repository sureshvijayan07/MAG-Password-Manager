import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SiteListComponent,
    PasswordListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'mag-pm-app-d48db',
        appId: '1:12335752275:web:7e5fbcdc4846a14fe6d2a6',
        storageBucket: 'mag-pm-app-d48db.appspot.com',
        apiKey: 'AIzaSyCkNj2u_MEqmSn6FIympB82c3dCg2OJr-Q',
        authDomain: 'mag-pm-app-d48db.firebaseapp.com',
        messagingSenderId: '12335752275',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
