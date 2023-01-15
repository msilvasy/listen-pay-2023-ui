import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthWellnessComponent } from './health-wellness/health-wellness.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileProgressComponent } from './profile-progress/profile-progress.component';
import { SafetyTrainingComponent } from './safety-training/safety-training.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent, data: { title: 'ListenPay.io' }},
  { path: 'health-wellness', component: HealthWellnessComponent, data: {  title: 'ListenPay.app'}, canActivate: [AuthGuard]},
  { path: 'safety-training', component: SafetyTrainingComponent, data: {  title: 'ListenPay.app'}, canActivate: [AuthGuard]},
  { path: 'profile-progress', component: ProfileProgressComponent, data: {  title: 'ListenPay.app'}, canActivate: [AuthGuard]}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
