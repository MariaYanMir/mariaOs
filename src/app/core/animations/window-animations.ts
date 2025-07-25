import {
  trigger,
  transition,
  style,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const fadeWindowAnimation: AnimationTriggerMetadata = trigger(
  'fadeWindow',
  [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.95)' }),
      animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
    transition(':leave', [
      animate('250ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
    ]),
  ]
);
