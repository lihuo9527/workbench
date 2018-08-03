import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'month',
    pure: false // 如果你的管道不受外界影响，只受参数的影响请遵守FP原则，设置为纯管道
})
export class MonthPipe implements PipeTransform {

    transform(value: any, lang?: any): any {
        switch (value) {
            case 1: return 'January';
            case 2: return 'february';
            case 3: return 'March';
            case 4: return 'April';
            case 5: return 'May';
            case 6: return 'June';
            case 7: return 'July';
            case 8: return 'August';
            case 9: return 'September';
            case 10: return 'October';
            case 11: return 'November';
            case 12: return 'December';
        }
    }
}
