import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'summaryFormat',
  standalone: true
})
export class SummaryFormatPipe implements PipeTransform {
  
  transform(value?: string, ...args: any[]): string {
    if (!value) {
      return '';
    }

    let result = value.replaceAll('\\n', '\n')
                      .replaceAll(/^- /g, '&#8226; ') // bullet points
                      .replaceAll('\\n', '\n')
                      .replaceAll(/\n- /g, '\n&#8226; ')
                      .replaceAll('  ', ' ')
                      .replaceAll(/\*{1,2}([^\*]{1,90})\*{1,2}/g, "<span>$1</span>");

    return result;
  }
}