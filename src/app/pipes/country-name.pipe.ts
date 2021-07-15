import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {

  transform(value: string, split: string = "_"): string {
    return value.split(split).map((s) => {
      if (s == "and") {
        return s;
      } else {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
    }).join(" ");
  }

}
