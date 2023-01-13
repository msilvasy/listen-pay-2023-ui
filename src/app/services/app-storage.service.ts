import { Injectable } from '@angular/core';
import { Constants } from '../helpers/constants';
import { AccountModel } from '../models/account.model';


@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() { }

  saveUserInformation(account: AccountModel) {
    if(!account.companyId || account.companyId==0)
    {
      account.companyId=1;
    }
    localStorage.setItem(Constants.LIST_PAY_ACCOUNT_KEY, JSON.stringify(account));
  }

  get companyId() {
    let companyId = 0;
    let currentAccount = localStorage.getItem(Constants.LIST_PAY_ACCOUNT_KEY);
    if (currentAccount) {
      companyId = ((JSON.parse(currentAccount))).companyId;
    }
    return companyId;
  }
  public getToken() {
    let token = "";
    let currentAccount = localStorage.getItem(Constants.LIST_PAY_ACCOUNT_KEY);
    if (currentAccount) {
      token = (<AccountModel>((JSON.parse(currentAccount)))).token;
    }
    return token;
  }
  public get getAccountInfo() {
    let account: AccountModel = new AccountModel();
    let currentAccount = localStorage.getItem(Constants.LIST_PAY_ACCOUNT_KEY);
    if (currentAccount && currentAccount.length > 1) {
      account = (<AccountModel>((JSON.parse(currentAccount))));
    }
    return account;
  }

  get userInformationId() {
    let userInformationId = 0;
    let currentAccount = localStorage.getItem(Constants.LIST_PAY_ACCOUNT_KEY);
    if (currentAccount) {
      userInformationId = ((JSON.parse(currentAccount))).userInformationId;
    }
    return userInformationId;
  }

  get CompanyIdForPoints() {
    // return 1; //add here hardcode value
    return this.companyId;
  }
  get userInformationIdForPoints() {
    // return 8; // add here hardcode value
    return this.userInformationId;
  }
  saveValue(key:string ,value:string) {
    localStorage.setItem(key, value);
  }
  getValue(key:string)
  {
   return localStorage.getItem(key);
  }
}
