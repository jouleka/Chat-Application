import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: 'api/user/main-page', pathMatch: 'full' },
  { path: '', redirectTo: 'api/user/login', pathMatch: 'full' },
  { path: 'api/user/login', loadComponent: () => import('./login-page/login-page.component').then(module => module.LoginPageComponent) },
  { path: 'api/user/register', loadComponent: () => import('./register-page/register-page.component').then(module => module.RegisterPageComponent) },
  // { path: 'api/user/main-page/:id', loadComponent: () => import('./main-page/main-page.component').then(module => module.MainPageComponent)},
  {
    path: 'api/user/main-page/:id',
    loadComponent: () => import('./main-page/main-page.component').then(module => module.MainPageComponent),
    children: [
      { path: 'home-page/:id', loadComponent: () => import('./home-page/home-page.component').then(module => module.HomePageComponent) },
      {
        path: 'edit/:id',
        loadComponent: () => import('./edit-page/edit-page.component').then(module => module.EditPageComponent),
        children: [{ path: 'chat-room/:id', loadComponent: () => import('./chats-page/chat-room/chat-room.component').then(module => module.ChatRoomComponent) }],
      },
      { path: 'chat-page/:id', loadComponent: () => import('./chats-page/chats-page.component').then(module => module.ChatsPageComponent) },
      { path: 'groups-page/:id', loadComponent: () => import('./groups-page/groups-page.component').then(module => module.GroupsPageComponent) },
      { path: 'find-groups/:id', loadComponent: () => import('./find-groups-page/find-groups-page.component').then(module => module.FindGroupsPageComponent) },
      { path: 'favourites-page/:id', loadComponent: () => import('./favourites-page/favourites-page.component').then(module => module.FavouritesPageComponent) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
