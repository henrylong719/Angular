import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: any, propName: any): any {
    let resultArray = [];

    resultArray = value.sort((a, b) => {
      if (a[propName] < b[propName]) return -1;
      if (a[propName] > b[propName]) return 1;
      return 0;
    });

    return resultArray;
  }
}
