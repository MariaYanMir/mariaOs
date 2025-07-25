import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { WindowManagerService } from '../../services/window-manager.service';
import { AppInstance } from '../../../core/models/desktop.model';
import { DockIconComponent } from '../dock-icon/dock-icon.component';

@Component({
  selector: 'app-dock-bar',
  standalone: true,
  imports: [DockIconComponent],
  templateUrl: './dock-bar.component.html',
  styleUrl: './dock-bar.component.scss',
})
export class DockBarComponent implements OnInit {
  private windowService = inject(WindowManagerService);
  items = input<AppInstance[] | null>(null);

  private now = signal(new Date());
  private subscription!: Subscription;

  readonly permanentItems = computed(() =>
    this.items()?.filter((i) => i.inDockBar)
  );

  readonly temporaryItems = computed(() =>
    this.items()?.filter((i) => !i.inDockBar)
  );

  time = computed(() => {
    const date = this.now();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => {
      this.now.set(new Date());
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openWindow(windowItem: AppInstance) {
    this.windowService.openWindow(windowItem);
  }
}
