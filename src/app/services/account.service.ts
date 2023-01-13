import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AccountModel, AccountModel as ListenPayAccountModel } from '../models/account.model';
import { Activity } from '../models/activity.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {Constants} from '../helpers/constants';
import { SpotifyAccount } from '../models/spotifyAccount';
import { AppStorageService } from './app-storage.service';
import { YoutubeVideoService } from './youtube-video.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public listenPayAccountSubject: BehaviorSubject<AccountModel> = new BehaviorSubject<AccountModel>(new AccountModel());
  private spotifyAccountSubject: BehaviorSubject<SpotifyAccount>;
  public spotifyAccount: Observable<SpotifyAccount>;

  constructor(private httpClient: HttpClient, private appResourceService: ConfigService,
    private appStorageService: AppStorageService, private router: Router, private youtubeVideoService: YoutubeVideoService) {
    const currentAccount = this.appStorageService.getAccountInfo;
    this.listenPayAccountSubject.next(currentAccount);

    this.spotifyAccountSubject = new BehaviorSubject<SpotifyAccount>(JSON.parse(localStorage.getItem(Constants.SPOTIFY_ACCOUNT_KEY)));
    if (this.spotifyAccountValue) {
      this.spotifyAccountValue.expiresIn = new Date(this.spotifyAccountValue.expiresIn);
    }
    this.spotifyAccount = this.spotifyAccountSubject.asObservable();
  }

  registerUser(email: string) {
    return this.httpClient.post<AccountModel>(`${this.appResourceService.configValue.listenPayUrl}account/${email}`, {}).pipe(map(res => {
      this.appStorageService.saveUserInformation(res);
      return res;
    }));
  }

  listenPayLogin(email: string) {
    return this.httpClient.post<AccountModel>(`${this.appResourceService.configValue.listenPayUrl}account/auth/${email}`, {}).pipe(map(res => {


      this.appStorageService.saveUserInformation(res);
      const currentAccount = this.appStorageService.getAccountInfo;
      this.listenPayAccountSubject.next(currentAccount);
      // this.getPointsSaveInLocal(res).subscribe((accountInfo) => {
      //   return accountInfo;
      // }, () => {
      //   this.signout();
      // });
      return res;
    }));
  }

  addActivity(activity: Activity) {
    const email = this.appStorageService.getAccountInfo.email;
    this.httpClient.post<AccountModel>(`${this.appResourceService.configValue.listenPayUrl}account/${email}/activity`, activity).subscribe(res => {
      this.appStorageService.saveUserInformation(res);
      const currentAccount = this.appStorageService.getAccountInfo;
      this.listenPayAccountSubject.next(currentAccount);
      // this.getPointsSaveInLocal(res).subscribe((accountInfo) => {
      //   return accountInfo;
      // }, () => {
      //   this.signout();
      // });
    });
  }

  // getPointsSaveInLocal(res: AccountModel) {
  //   return this.youtubeVideoService.getAllCategoriesPoints(this.appStorageService.companyId, this.appStorageService.userInformationId).pipe(map(points => {
  //     res.earned = points.toFixed();
  //     this.appStorageService.saveUserInformation(res);
  //     const currentAccount = this.appStorageService.getAccountInfo;
  //     this.listenPayAccountSubject.next(currentAccount);
  //     return currentAccount;
  //   }));
  // }

 spotifyLogin() {
    const config = this.appResourceService.configValue;
    // tslint:disable-next-line:max-line-length

    const url = `${config.spotifyAuthUrl}/authorize?response_type=code&client_id=${config.spotifyClientId}&scope=${config.spotifyScope}&redirect_uri=${config.redirectUrl}`;
    window.location.href = url;
  }
  finishSpotifyLogin(accessToken, refreshToken, scope, expiresIn) {
    const user = new SpotifyAccount();
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.scope = scope;
    user.expiresIn = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem(Constants.SPOTIFY_ACCOUNT_KEY, JSON.stringify(user));
    this.spotifyAccountSubject.next(user);
    //this.router.navigate(['/spotify']);
  }
  refreshSpotifyToken() {
    return this.httpClient.post<any>(
      `${this.appResourceService.configValue.listenPayUrl}spotify/token/refresh/${this.spotifyAccountValue.refreshToken}`,
      {}).pipe(map(result => {
        this.spotifyAccountSubject.value.accessToken = result.access_token;
        this.spotifyAccountSubject.value.expiresIn = new Date(new Date().getTime() + result.expires_in * 1000);
        this.spotifyAccountSubject.value.scope = result.scope;
        localStorage.setItem(Constants.SPOTIFY_ACCOUNT_KEY, JSON.stringify(this.spotifyAccountSubject.value));
      }));
  }

  public get spotifyAccountValue(): SpotifyAccount {
    return this.spotifyAccountSubject.value;
  }
  signout() {
    localStorage.clear();
    this.listenPayAccountSubject.next(new AccountModel());
    this.router.navigate(['/']);
  }
}
