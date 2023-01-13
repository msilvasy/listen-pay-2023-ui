import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { ConfigModel } from '../models/config.model';
import { YoutubeCategory } from '../models/youTubeCategory';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';
  private configSubject: BehaviorSubject<ConfigModel>;

  constructor(private http: HttpClient) {
    this.configSubject = new BehaviorSubject<ConfigModel>(null);
  }

  load() {
    console.log('start loading config');
    return new Promise<void>((resolve, reject) => {
      this.http.get<ConfigModel>(this.configUrl)
        .toPromise()
        .then(resp => {
          this.configSubject = new BehaviorSubject<ConfigModel>(resp);
          console.log('config loaded', this.configSubject);
          resolve();
        }, reason => reject(reason));
    });
  }

  public get configValue(): ConfigModel {
    return this.configSubject.value;
  }

  public readonly appCategories: YoutubeCategory[] = [
    { id: 1, points: 500, title: 'Heart Health', gotoRoute: 'Heart Health',value: 'Heart Health', backgroundURL: 'assets/images/heart.png', done: true, youTubeVideoCategoryId: 1005,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 2, points: 300, title: 'Diabetes', gotoRoute: 'Diabetes',value: 'Diabetes', backgroundURL: 'assets/images/diabetes.png', done: false, youTubeVideoCategoryId: 0,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 3, points: 300, title: 'Blood Pressure', gotoRoute: 'Blood Pressure Treatment+',value: 'Blood Pressure Treatment+', backgroundURL: 'assets/images/blood-pressure.png', done: false, youTubeVideoCategoryId: 0,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 4, points: 300, title: 'Respiratory / Pulmonary', gotoRoute: 'Respiratory/Pulmonary',value: 'Respiratory/Pulmonary', backgroundURL: 'assets/images/raspiratory-mask.png', done: false, youTubeVideoCategoryId: 0,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 5, points: 300, title: 'Opioid Usage', gotoRoute: 'Opioid Usage',value: 'Opioid Usage', backgroundURL: 'assets/images/opioid.png', done: true, youTubeVideoCategoryId: 0,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 6, points: 300, title: 'Behavioral Health', gotoRoute: 'Cognitive & Behavioral Health', value: 'Cognitive & Behavioral Health', backgroundURL: 'assets/images/behavior.png', done: true, youTubeVideoCategoryId: 0, disabled: false, companyRelatedCategoryId: 0 }];


  public readonly lgxCategories: YoutubeCategory[] = [
    { id: 7, points: 500, title: 'Accidental Slips & Falls', gotoRoute: 'Accidental Slips & Falls',value: 'Accidental Slips & Falls', backgroundURL: 'assets/images/heart.png', done: true, youTubeVideoCategoryId: 1005,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 8, points: 300, title: 'Safety Negligence', gotoRoute: 'Safety Negligence',value: 'Safety Negligence', backgroundURL: 'assets/images/diabetes.png', done: false, youTubeVideoCategoryId: 0,  disabled: false, companyRelatedCategoryId: 0 },
    { id: 9, points: 300, title: 'Powered Equipment', gotoRoute: 'Powered Equipment',value: 'Powered Equipment', backgroundURL: 'assets/images/blood-pressure.png', done: false, youTubeVideoCategoryId: 0,  disabled: false, companyRelatedCategoryId: 0 }];

  }