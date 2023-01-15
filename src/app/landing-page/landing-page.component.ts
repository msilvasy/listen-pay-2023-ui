import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Constants } from '../helpers/constants';
import { footerBtn } from '../helpers/enums';
import { AccountModel } from '../models/account.model';
import { AccountService } from '../services/account.service';
declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent {
  title = 'ListenPay "Listen|Earn|Redeem"';
  public footerBtnRef = footerBtn;
  public selectedFooterBtn: footerBtn = footerBtn.None;
  emailValue: string;
  emailChanged: Subject<string>;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  key: string;
  earned: number; ''

  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router
  ) {
    this.emailChanged = new Subject<string>();
  }

  ngOnInit(): void {
    this.emailChanged
      .asObservable()
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.login(value);
      });

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        console.log(params['login']);
        if (params['login'] == 1) {
          this.selectedFooterBtn = this.footerBtnRef.Login;
          this.toogleLoginUser();
        }
      });

    this.accountService.listenPayAccountSubject.subscribe((earned) => {
      this.earned = earned?.earned ? earned.earned : 0;
    });

    this.accountService.listenPayAccountSubject.subscribe((account) => {
      this.emailValue = account?.email;
      this.key = account?.key;
      this.earned = account?.earned;
    });
  }
  public login(email: string) {
    this.accountService.listenPayLogin(email).subscribe(
      (result) => {
        if (result) {
          console.log(result);
          this.key = result.key;
          this.earned = result.earned;
          // this.balance = result.balance;
        } else {
          this.key = 'No account, click key generate #haskey!';
        }
      },
      (err) => {
        this.key = 'No account, click key generate #haskey!';
      }
    );
  }
  public get getPoint() {
    return this.userInfo && this.userInfo?.earned > 0
      ? this.userInfo.earned
      : 0;
  }
  public get getEmail() {
    return this.userInfo && this.userInfo?.email.length
      ? this.userInfo.email
      : '';
  }

  public getProfileProgress() {
    this.router.navigate(['/profile-progress']);
  }

  get userInfo(): AccountModel {
    return JSON.parse(localStorage.getItem(Constants.LIST_PAY_ACCOUNT_KEY));
  }
  get isUserLoggedIn(): boolean {
    return this.userInfo && this.userInfo?.key?.length > 0 && this.userInfo.email.length > 0;
  }

  signOut(): void {
    this.accountService.signout();
    this.emailValue = '';
    this.key = '';
  }

  createAccount(email) {
    console.log("email", email)
    if (!email.invalid) {
      this.accountService.registerUser(email.value).subscribe(
        (account) => {
          if (account !== null) {
            this.key = account.key;
            this.earned = account.earned;
          } else {
            this.key = 'Error registering user!';
          }
        },
        (err) => {
          this.key = 'Enter valid email to generate #haskey!';
        }
      );
    }
  }
  onEmailChanged(email: NgModel) {
    if (!email.invalid) {
      this.emailChanged.next(email.value);
    } else {
      this.key = 'Enter valid email address';
    }
  }
  onProfileBtn() {
    if ($('.dashboard').is(":visible")) {
      $(".btn-sidebar-holder").hide();
      $(".dashboard").stop(true, true).hide("slide", {
        direction: "left"
      }, 200, function () {
        $(".login").show();
        $(".wrapper").addClass("loginScreen");
      });
    }
    this.selectedFooterBtn = this.footerBtnRef.Login;
  }


  onAppLink() {
    console.log("onFooterLink")
    this.selectedFooterBtn = this.footerBtnRef.App;
    this.toogleLoginUser();
  }

  onanalyticsLink() {
    console.log("onanalyticsLink")
    this.selectedFooterBtn = this.footerBtnRef.Analytics;
    this.toogleLoginUser();
  }

  onUserLink() {
    console.log("onUserLink()");

    if (this.selectedFooterBtn == this.footerBtnRef.None) {
      this.selectedFooterBtn = this.footerBtnRef.Login
    }
    else if (this.selectedFooterBtn == this.footerBtnRef.User) {
      this.selectedFooterBtn = this.footerBtnRef.Login
    } else if (this.selectedFooterBtn == this.footerBtnRef.Login) {
      this.selectedFooterBtn = this.footerBtnRef.User;
    } else {
      this.selectedFooterBtn = this.footerBtnRef.Login;
    }
    this.toogleLoginUser();
  }

  ongiftLink() {
    console.log("ongiftLink")
    this.selectedFooterBtn = this.footerBtnRef.Gift;
    this.toogleLoginUser();
  }

  onFaqLink() {
    console.log("onFaqLink")
    this.selectedFooterBtn = this.footerBtnRef.Faq;
    this.toogleLoginUser();
  }

  toogleLoginUser() {
    if (this.selectedFooterBtn == this.footerBtnRef.Login) {
      $(".btn-sidebar-holder").hide();
      $(".dashboard").stop(true, true).hide("slide", {
        direction: "left"
      }, 200, function () {
        $(".login").show();
        $(".wrapper").addClass("loginScreen");
      });
    } else {
      $(".login").hide();
      $(".wrapper").removeClass("loginScreen");
      $(".dashboard").stop(true, true).show("slide", {
        direction: "left"
      }, 200, function () {
        $(".btn-sidebar-holder").show();
      });
    }
  }
}
