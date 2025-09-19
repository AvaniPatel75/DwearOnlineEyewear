import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OffcanvasServiceService {

  private openOffcanvasSubject = new Subject<void>();

  openOffcanvas$ = this.openOffcanvasSubject.asObservable();

  triggerOpenOffcanvas() {
    this.openOffcanvasSubject.next();
  }
}
