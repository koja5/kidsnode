import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInput',
})
export class SearchInputPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return (it.firstname.toLocaleLowerCase().includes(searchText) || it.lastname.toLocaleLowerCase().includes(searchText));
    });
  }
}
