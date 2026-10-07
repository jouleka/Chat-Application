import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter', pure: false
})
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[] | null | undefined, term: unknown): T[] {
    if (!items) return [];
    const search = String(term ?? '').trim().toLocaleLowerCase();
    if (!search) return items;
    return items.filter(item => this.matches(item, search));
  }

  private matches(value: unknown, search: string): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'object') return Object.values(value).some(field => this.matches(field, search));
    return String(value).toLocaleLowerCase().includes(search);
  }
}
