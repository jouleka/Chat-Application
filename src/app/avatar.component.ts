import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-avatar',
    template: `<span class="avatar" [style.width.px]="size" [style.height.px]="size" [style.background]="bgColor" [style.color]="fgColor" [style.border-color]="borderColor" [style.border-radius]="round ? '50%' : '0'" [attr.aria-label]="name">{{ initials }}</span>`,
    styles: [`.avatar { display: inline-flex; align-items: center; justify-content: center; border: 1px solid; font-weight: 600; vertical-align: middle; flex-shrink: 0; }`]
})
export class AvatarComponent {
  @Input() name = '';
  @Input() size: number | string = 40;
  @Input() bgColor = 'white';
  @Input() fgColor = 'black';
  @Input() borderColor = 'transparent';
  @Input() round = true;
  get initials(): string { return String(this.name ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => Array.from(part)[0]).join('').toLocaleUpperCase(); }
}
