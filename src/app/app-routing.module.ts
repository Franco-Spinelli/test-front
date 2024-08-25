// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { UserDashboardComponent } from './model/user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}