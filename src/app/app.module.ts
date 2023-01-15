import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { JwtInterceptor } from './helpers/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HealthWellnessComponent } from './health-wellness/health-wellness.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SafetyTrainingComponent } from './safety-training/safety-training.component';
import { ProfileProgressComponent } from './profile-progress/profile-progress.component';


export function initializeApp(configService: ConfigService) {
  return () => {
    return configService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HealthWellnessComponent,
    LandingPageComponent,
    SafetyTrainingComponent,
    ProfileProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
