import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TagInputModule } from 'ngx-chips';
import {MatChipsModule} from '@angular/material/chips';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableFilterModule } from 'mat-table-filter';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AvatarModule } from 'ngx-avatar';
import { ChatsPageComponent } from './chats-page/chats-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { FindGroupsPageComponent } from './find-groups-page/find-groups-page.component';
import { ChatRoomComponent } from './chats-page/chat-room/chat-room.component';
import { GroupDialogBoxComponent } from './group-dialog-box/group-dialog-box.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { DeleteChatGroupDialogComponent } from './delete-chat-group-dialog/delete-chat-group-dialog.component';
import { RemoveUserDialogComponent } from './remove-user-dialog/remove-user-dialog.component';
import { UpdateMessageComponent } from './update-message/update-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    MainPageComponent,
    ChatsPageComponent,
    EditPageComponent,
    FavouritesPageComponent,
    GroupsPageComponent,
    FindGroupsPageComponent,
    ChatRoomComponent,
    GroupDialogBoxComponent,
    UpdateGroupComponent,
    DeleteChatGroupDialogComponent,
    RemoveUserDialogComponent,
    UpdateMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableFilterModule,
    MatSortModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatCardModule,
    FlexLayoutModule,
    AvatarModule,
    MatBadgeModule,
    MatGridListModule,
    Ng2SearchPipeModule,
    TagInputModule,
    MatChipsModule,
    PickerModule,

    ToastrModule.forRoot({
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      includeTitleDuplicates: true,
      timeOut: 3000,
      extendedTimeOut: 3000,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
