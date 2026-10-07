import { Component, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-delete-chat-group-dialog',
    templateUrl: './delete-chat-group-dialog.component.html',
    styleUrls: ['./delete-chat-group-dialog.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class DeleteChatGroupDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
