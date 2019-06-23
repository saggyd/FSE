import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class UserFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText) || it.employeeId.toLowerCase().includes(searchText);
    });
   }
}