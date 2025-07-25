import { Injectable, signal, computed } from '@angular/core';
import { AppInstance, Status } from '../../core/models/desktop.model';
import { DEFAULT_APP_INSTANCES } from '../../core/data/app-instances.config';

@Injectable({
  providedIn: 'root',
})
export class WindowManagerService {
  windows = signal<AppInstance[]>([]);
  private readonly minimizedSet = new Set<string>();

  zIndexCounter = signal(100);
  windowOffset = signal(0);

  desktopOptions = computed(() => {
    return this.windows().filter((window) => !window.inDockBar);
  });

  dockBarOptions = computed(() => {
    return this.windows().filter(
      (window) => window.inDockBar || this.minimizedSet.has(window.id)
    );
  });

  openWindows = computed(() => {
    return this.windows().filter((window) => window.isOpen);
  });

  constructor() {
    this.windows.set(DEFAULT_APP_INSTANCES);
  }

  openWindow(windowItem: AppInstance) {
    const isAlreadyOpen = this.openWindows().some(
      (w) => w.id === windowItem.id
    );
    if (isAlreadyOpen) {
      this.windows.update((currentWindow) =>
        currentWindow.map((w) =>
          w.id === windowItem.id
            ? {
                ...w,
                zIndex: this.getNextZIndex(),
              }
            : w
        )
      );

      return;
    }

    const openWindows = this.openWindows();

    const baseTop = (window.innerHeight - 500) / 2;
    const baseLeft = (window.innerWidth - 750) / 2;

    const offsetStep = 24;
    const maxSteps = 10;

    let newTop = baseTop;
    let newLeft = baseLeft;

    for (let i = 0; i < maxSteps; i++) {
      const trialTop = baseTop + i * offsetStep;
      const trialLeft = baseLeft + i * offsetStep;

      const overlapping = openWindows.some(
        (w) =>
          Math.abs(w.top! - trialTop) < 10 && Math.abs(w.left! - trialLeft) < 10
      );

      if (!overlapping) {
        newTop = trialTop;
        newLeft = trialLeft;
        break;
      }
    }

    this.windows.update((currentWindow) =>
      currentWindow.map((w) =>
        w.id === windowItem.id
          ? {
              ...w,
              zIndex: this.getNextZIndex(),
              top: windowItem.top ? windowItem.top : newTop,
              left: windowItem.left ? windowItem.left : newLeft,
              width: windowItem.width ? windowItem.width : '750px',
              height: windowItem.height ? windowItem.height : '500px',
              isOpen: true,
              status: Status.NORMAL,
            }
          : w
      )
    );
  }

  closeWindow(id: string) {
    this.windows.update((currentWindow) =>
      currentWindow.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: false,
              status: Status.NORMAL,
            }
          : w
      )
    );

    this.minimizedSet.delete(id);
  }

  expandWindow(id: string) {
    this.windows.update((currentWindow) =>
      currentWindow.map((w) =>
        w.id === id
          ? {
              ...w,
              previousTop: w.top,
              previousLeft: w.left,
              previousWidth: w.width,
              previousHeight: w.height,
              status: Status.MAX,
            }
          : w
      )
    );
  }

  minimizeWindow(id: string) {
    this.windows.update((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;

        const wasMax = w.status === Status.MAX;

        return {
          ...w,
          top: wasMax ? w.previousTop : w.top,
          left: wasMax ? w.previousLeft : w.left,
          width: wasMax ? w.previousWidth : w.width,
          height: wasMax ? w.previousHeight : w.height,
          status: wasMax ? Status.NORMAL : Status.MIN,
          isOpen: wasMax ? true : false,
        };
      })
    );

    this.minimizedSet.add(id);
  }

  onFocus(id: string) {
    this.windows.update((currentWindow) =>
      currentWindow.map((w) =>
        w.id === id
          ? {
              ...w,
              zIndex: this.zIndexCounter() + 1,
            }
          : w
      )
    );

    this.zIndexCounter.set(this.zIndexCounter() + 1);
  }

  private getNextZIndex(): number {
    const next = this.zIndexCounter() + 1;
    this.zIndexCounter.set(next);
    return next;
  }
}
