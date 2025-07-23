import { Component, inject, input, output, signal } from '@angular/core';
import { WindowManagerService } from '../../services/window-manager.service';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AppInstance, Status } from '../../../core/models/desktop.model';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent {
  window = input<AppInstance>();

  windowService = inject(WindowManagerService);

  status = Status;

  closeWindow() {
    this.windowService.closeWindow(this.window()?.id!);
  }

  minimizeWindow() {
    this.windowService.minimizeWindow(this.window()?.id!);
  }

  expandWindow() {
    this.windowService.expandWindow(this.window()?.id!);
  }

  onFocus() {
    this.windowService.onFocus(this.window()?.id!);
  }
}
