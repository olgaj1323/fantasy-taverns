import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class DatepickerService {
  dates:NgbDate[];

  constructor( ) { }
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  changeMessage(dates:NgbDate[]) {
    this.messageSource.next(dates)
  }
}