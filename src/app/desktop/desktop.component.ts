import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AppInstance, Status } from '../core/models/desktop.model';
import { WindowComponent } from './components/window/window.component';
import { DockBarComponent } from './components/dock-bar/dock-bar.component';
import { DesktopIconComponent } from '../shared/components/desktop-icon/desktop-icon.component';
import { WindowManagerService } from './services/window-manager.service';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [DockBarComponent, DesktopIconComponent, WindowComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
})
export class DesktopComponent implements OnInit {
  windowService = inject(WindowManagerService);

  desktopOptions = this.windowService.desktopOptions;
  dockbarOptions = this.windowService.dockBarOptions;
  openWindows = this.windowService.openWindows;

  ngOnInit(): void {}

  openWindow(windowItem: AppInstance) {
    if (!windowItem.isExternal) {
      this.windowService.openWindow(windowItem);
    }
  }
}
