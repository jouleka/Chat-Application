import { TestBed } from '@angular/core/testing';
import { FilterPipe } from './filter.pipe';
import { AvatarComponent } from './avatar.component';
import { appendChatMessage } from './message-rendering';

describe('migrated chat features', () => {
  it('filters names and nested fields literally without modifying the source list', () => {
    const users = [{ fullname: 'Ada Lovelace', details: { city: 'London' } }, { fullname: 'Grace Hopper' }];
    const pipe = new FilterPipe();
    expect(pipe.transform(users, '  LONDON ')).toEqual([users[0]]);
    expect(pipe.transform(users, '[.*]')).toEqual([]);
    expect(pipe.transform(users, '')).toBe(users);
    expect(pipe.transform(undefined, 'Ada')).toEqual([]);
    expect(users).toHaveLength(2);
  });
  it('renders initials, dimensions and an accessible name', () => {
    TestBed.configureTestingModule({ imports: [AvatarComponent] });
    const fixture = TestBed.createComponent(AvatarComponent);
    fixture.componentRef.setInput('name', 'Ada Lovelace');
    fixture.componentRef.setInput('size', 30);
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.avatar');
    expect(avatar.textContent).toBe('AL');
    expect(avatar.getAttribute('aria-label')).toBe('Ada Lovelace');
    expect(avatar.style.width).toBe('30px');
  });
  it('does not execute or create markup from websocket message content', () => {
    const container = document.createElement('div');
    container.className = 'chat';
    document.body.appendChild(container);
    try {
      const malicious = '<img src=x onerror="window.compromised=true">';
      appendChatMessage(malicious);
      expect(container.textContent).toBe(malicious);
      expect(container.querySelector('img')).toBeNull();
      expect(container.querySelector('.message')).not.toBeNull();
    } finally { container.remove(); }
  });
});
