import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";
@Pipe({
 name: 'searchfilter'
})

/*
  // Método de filtrar lista employee por skill
*/

@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], args: any[]): any[] {
    if (!items) return [];
    return items.filter(it => it[args[0]] == args[1]);
  }
}