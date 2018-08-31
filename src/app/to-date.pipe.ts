import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(items: any, field: string): any {
    console.log(items, field);
    var dateStr = null;
    var dt = new Date();
    dt.setTime(items);
    var delimiter = field[2];
    var monthIndex = field.indexOf("MM");
    if(monthIndex == 0){
      dateStr = (dt.getMonth()+1) + delimiter + dt.getDate()+ delimiter + dt.getFullYear();
    }
    else if(monthIndex == 3){
      dateStr = dt.getDate() + delimiter + (dt.getMonth()+1) + delimiter + dt.getFullYear();
    }
    else{
      dateStr = (dt.getMonth()+1) + delimiter + dt.getDate()+ delimiter + dt.getFullYear();
    }
    return dateStr; 
  }

}
