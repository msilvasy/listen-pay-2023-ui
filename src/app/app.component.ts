import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Constants } from './helpers/constants';
import { footerBtn } from './helpers/enums';
import { AccountModel } from './models/account.model';
import { AccountService } from './services/account.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ListenPay.io "Listen|Earn|Redeem"';
  isCollapsed = true;
  isOverlayed = true;
  constructor(
    // private bsModalService: BsModalService, private titleService: Title 
    ) {

  }

  public setTitle(newTitle: string) {
    // this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    // this.setTitle("ListenPay Listen|Earn|Redeem");
  }

  // showModal() {
  // var  config = {
  //     animated: true,
  //     backdrop:true,
  //     class: "modal-lg  modal-xl  modal-dialog  modal-dialog-centered white-container", ignoreBackdropClick: true
  //   };
  //   console.log('annanann');
  //   const modal = this.bsModalService.show(ModalDashboardComponent, config);
  //   (<ModalDashboardComponent>modal.content).initialize();
  //   (<ModalDashboardComponent>modal.content).onClose.subscribe((res) => {
  //     console.log("re",res);
  //   });


  }


