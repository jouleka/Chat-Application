import { Component, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-remove-user-dialog',
    templateUrl: './remove-user-dialog.component.html',
    styleUrls: ['./remove-user-dialog.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class RemoveUserDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
