import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outputFilter'
})
export class OutputFilterPipe implements PipeTransform {


  transform(items: any[], searchText: string): any[] {

    if(!items) return [];

    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.var_name.toLowerCase().includes(searchText);
    });
   
  }

}
