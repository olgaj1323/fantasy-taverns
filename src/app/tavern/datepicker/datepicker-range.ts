import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'app-ngbd-datepicker-range',
  templateUrl: './datepicker-range.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(85,83,83);
      color: white;
    }
    .custom-day.faded {
      background-color: rgb(85,83,83, 0.7);
    }
  `]
})
export class NgbdDatepickerRangeComponent{

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(calendar: NgbCalendar, private data:DatepickerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    console.log('fromDate',this.fromDate);
    console.log('toDate',this.toDate);

}
message:string;



 
  onDateSelection(date: NgbDate) {

     console.log('Date',date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log('fromDate',this.fromDate);
    console.log('toDate',this.toDate);
    this.newMessage(this.fromDate,this.toDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


  

  newMessage(from:NgbDate,to:NgbDate) {
    let dates=[from,to]  
    this.data.changeMessage(dates);
  }
}
