import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'Front-end' : return 'code';
      case 'Back-end' : return 'computer';
      case 'QA' : return 'bug_report';
      case 'PO' : return 'splitscreen';
      case 'Agile' : return 'groups'
      case 'UX_UI' : return 'brush';
    }
    return 'code';
  }

}
