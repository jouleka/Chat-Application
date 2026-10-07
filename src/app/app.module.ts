import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule ,ToastrModule.forRoot({
            preventDuplicates: true,
            resetTimeoutOnDuplicate: true,
            includeTitleDuplicates: true,
            timeOut: 3000,
            extendedTimeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing",
            tapToDismiss: true
        })],
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent]
})
export class AppModule {}
