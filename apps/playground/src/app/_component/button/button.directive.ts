import { Component, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Loader2, LucideAngularModule } from 'lucide-angular';

export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  neutral: 'neutral',
};
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

@Component({
  standalone: true,
  selector: `button[appButton]`,
  templateUrl: './button.component.html',
  host: {
    class: 'btn',
    '[class.btn-primary]': `variant() === "primary"`,
    '[class.btn-secondary]': `variant() === "secondary"`,
    '[class.btn-tertiary]': `variant() === "tertiary"`,
    '[class.btn-neutral]': `variant() === "neutral"`,
    '[class.btn-small]': `size() === "small"`,
    '[class.btn-medium]': `size() === "medium"`,
    '[class.btn-large]': `size() === "large"`,
    '[class.btn-disabled]': 'disable()',
    '[class.btn-loading]': 'loading()',
  },
  imports: [NgTemplateOutlet, LucideAngularModule],
})
export class MsbButtonComponent {
  readonly disable = input(false);
  readonly loading = input(false);
  readonly startIcon = input<TemplateRef<any> | null>(null);
  readonly endIcon = input<TemplateRef<any> | null>(null);
  readonly loadingRef = input<TemplateRef<any> | null>(null);

  readonly variant = input<ButtonVariant>(ButtonVariant.primary);
  readonly size = input<ButtonSize>(ButtonSize.medium);
  protected readonly Loader2 = Loader2;
}
