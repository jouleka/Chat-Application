import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  subject = new Subject;

  redirectSubject = new Subject<any>();

  constructor() { }

  sendMessage(message: string) {
    this.redirectSubject.next({ text: message });
  }

  getMessage(): Observable<any> {
      return this.redirectSubject.asObservable();
  }


}
