import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chats-page/chat-room/chat-room.component';

import { ChatsPageComponent } from './chats-page/chats-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FavouritesPageComponent } from './favourites-page/favourites-page.component';
import { FindGroupsPageComponent } from './find-groups-page/find-groups-page.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  // { path: '', redirectTo: 'api/user/main-page', pathMatch: 'full' },
  { path: '', redirectTo: 'api/user/login', pathMatch: 'full' },
  { path: 'api/user/login', component: LoginPageComponent },
  { path: 'api/user/register', component: RegisterPageComponent },
  // { path: 'api/user/main-page/:id', component: MainPageComponent},
  {
    path: 'api/user/main-page/:id',
    component: MainPageComponent,
    children: [
      { path: 'home-page/:id', component: HomePageComponent },
      {
        path: 'edit/:id',
        component: EditPageComponent,
        children: [{ path: 'chat-room/:id', component: ChatRoomComponent }],
      },
      { path: 'chat-page/:id', component: ChatsPageComponent },
      { path: 'groups-page/:id', component: GroupsPageComponent },
      { path: 'find-groups/:id', component: FindGroupsPageComponent },
      { path: 'favourites-page/:id', component: FavouritesPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
