import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonSize,
  ButtonVariant,
  MsbButtonComponent,
} from './_component/button/button.directive';
import { Check, Loader, Loader2, LucideAngularModule, X } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, MsbButtonComponent, LucideAngularModule, FormsModule],
  template: `
    <div
      class="p-8 mx-auto flex flex-col gap-4 max-w-[900px] divide-y prose lg:prose-xl prose-slate"
    >
      <ng-template #startIcon>
        <i-lucide [img]="Check"></i-lucide>
      </ng-template>

      <ng-template #endIcon>
        <i-lucide [img]="X"></i-lucide>
      </ng-template>

      <div class="p-4 space-y-4">
        <h1>Default button</h1>

        <div class="flex items-center gap-4">
          <button appButton (click)="incrementCount()">Click me</button>

          <p class="flex-1">Clicked: {{ clickCount() }}</p>
        </div>

        <pre><code>&lt;button appButton (click)="incrementCount()"&gt;Click me&lt;/button&gt;</code></pre>
      </div>

      <div class="p-4 space-y-4">
        <h1>Default button with icons</h1>

        <div class="flex gap-4">
          <button appButton [startIcon]="startIcon">Click me</button>
          <button appButton [startIcon]="startIcon" [endIcon]="endIcon">
            Click me
          </button>
        </div>
        <pre><code>{{ BLOCK_2 }}</code></pre>
      </div>

      <div class="p-4 space-y-4">
        <h1>Default button with variants/size</h1>

        <div class="flex gap-4">
          <button
            appButton
            [variant]="variant()"
            [size]="size()"
            [startIcon]="startIcon"
          >
            Click me
          </button>
          <button
            appButton
            [variant]="variant()"
            [startIcon]="startIcon"
            [endIcon]="endIcon"
          >
            Click me
          </button>
        </div>

        <div class="flex gap-4">
          <select
            [(ngModel)]="size"
            class="block flex-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            @for (v of buttonSizes; track v) {
              <option [value]="v">{{ v }}</option>
            }
          </select>

          <select
            [(ngModel)]="variant"
            class="block flex-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            @for (v of buttonVariants; track v) {
              <option [value]="v">{{ v }}</option>
            }
          </select>
        </div>
        <pre><code>{{ BLOCK_3() }}</code></pre>
      </div>

      <div class="p-4 space-y-4">
        <h1>Default button with disable</h1>

        <div class="flex gap-4">
          <button appButton [disable]="disabled()" [startIcon]="startIcon">
            Click me
          </button>

          <button (click)="toggleDisabled()">
            toggle disabled: {{ disabled() }}
          </button>
        </div>
        <pre><code>{{ BLOCK_4() }}</code></pre>
      </div>

      <div class="p-4 space-y-4">
        <h1>Default button with loading</h1>

        <div class="flex gap-4">
          <button appButton [loading]="loading()" [startIcon]="startIcon">
            Click me
          </button>

          <button (click)="toggleLoading()">
            toggle loading: {{ loading() }}
          </button>
        </div>
        <pre><code>{{ BLOCK_5() }}</code></pre>
      </div>

      <div class="p-4 space-y-4">
        <h1>Default button with custom loading</h1>

        <div class="flex gap-4">
          <button
            appButton
            [loading]="loadingCustom()"
            [startIcon]="startIcon"
            [loadingRef]="customLoading"
          >
            Click me
          </button>

          <ng-template #customLoading>
            <i-lucide [img]="Loader" class="animate-spin"></i-lucide>
          </ng-template>

          <button (click)="toggleLoadingCustom()">
            toggle loading: {{ loadingCustom() }}
          </button>
        </div>
        <pre><code>{{ BLOCK_6() }}</code></pre>
      </div>

      <div class="p-4 space-y-4">
        <h1>Component</h1>
        <pre><code>{{ componentContent() }}</code></pre>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {
  readonly buttonVariants = Object.keys(ButtonVariant);
  readonly buttonSizes = Object.keys(ButtonSize);
  readonly variant = signal<ButtonVariant>(ButtonVariant.primary);
  readonly size = signal<ButtonSize>(ButtonSize.medium);
  readonly clickCount = signal(0);
  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly loadingCustom = signal(false);

  readonly BLOCK_2 = `
  <button appButton [startIcon]="startIcon">
    Click me
  </button>
  <button
    appButton
    [startIcon]="startIcon"
    [endIcon]="endIcon"
  >
    Click me
  </button>

  <ng-template #startIcon>
    <i-lucide [img]="Check"></i-lucide>
  </ng-template>

  <ng-template #endIcon>
    <i-lucide [img]="X"></i-lucide>
  </ng-template>
  `;

  readonly BLOCK_3 = computed(
    () => `
  <button appButton [variant]="'${this.variant()}'" [size]="'${this.size()}'" [startIcon]="startIcon" >
    Click me
  </button>
  `,
  );

  readonly BLOCK_4 = computed(
    () => `<button appButton [disable]="${this.disabled()}" [startIcon]="startIcon">
  Click me
</button>`,
  );

  readonly BLOCK_5 = computed(
    () => `<button appButton [loading]="${this.loading()}" [startIcon]="startIcon">
  Click me
</button>`,
  );

  readonly BLOCK_6 = computed(
    () => `<button appButton [loading]="${this.loadingCustom()}" [loadingRef]="customLoading" [startIcon]="startIcon">
  Click me
</button>

<ng-template #customLoading>
  <i-lucide [img]="Loader" class="animate-spin"></i-lucide>
</ng-template>`,
  );
  readonly componentContent = signal('');
  protected readonly Check = Check;
  protected readonly X = X;
  protected readonly Loader2 = Loader2;
  protected readonly Loader = Loader;
  private readonly httpClient = inject(HttpClient);

  incrementCount() {
    this.clickCount.update((count) => count + 1);
  }

  toggleDisabled() {
    this.disabled.update((disabled) => !disabled);
  }

  toggleLoading() {
    this.loading.update((loading) => !loading);
  }

  toggleLoadingCustom() {
    this.loadingCustom.update((loading) => !loading);
  }

  ngOnInit() {
    this.httpClient
      .get('/btn-component.txt', { responseType: 'text' })
      .subscribe((res) => {
        this.componentContent.set(res);
      });
  }
}
