// auth.module.ts
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
 declarations: [],
   imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}

// @NgModule({
//   declarations: [LoginComponent, RegisterComponent],
//   imports: [HttpClientModule, FormsModule, BrowserModule],
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

