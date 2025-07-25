import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AppInstance } from '../../../core/models/desktop.model';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './desktop-icon.component.html',
  styleUrl: './desktop-icon.component.scss',
})
export class DesktopIconComponent {
  item = input<AppInstance>();
  itemSelected: OutputEmitterRef<AppInstance> = output<AppInstance>();

  isHovered: boolean = false;

  emitSelectedItem() {
    this.itemSelected.emit(this.item()!);
  }
}
