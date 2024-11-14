import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'summaryFormat',
  standalone: true
})
export class SummaryFormatPipe implements PipeTransform {
  
  transform(value: string, ...args: any[]): string {
    let result = value.replaceAll(/^- /g, '&#8226; ') // bullet points
                      .replaceAll(/\n- /g, '\n&#8226; ')
                      .replaceAll('  ', ' ')
                      .replaceAll(/\*{2}([^\*]{1,90})\*{2}/g, "<span>$1</span>");

    return result;
  }
}