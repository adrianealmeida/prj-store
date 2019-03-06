import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public title: '';
  public subtitle: '';
  public noAction: '';
  public yesAction: '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.noAction = data.noAction;
    this.yesAction = data.yesAction;
  }

  ngOnInit() {
  }

}
