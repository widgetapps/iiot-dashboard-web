import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tagFilter'
})
export class TrendsFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) {
      return [];
    }
    if(!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it._id.toLowerCase().includes(searchText) || it.location.toLowerCase().includes(searchText);
    });
  }
}
