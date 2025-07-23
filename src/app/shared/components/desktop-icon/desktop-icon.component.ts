import {
  Component,
  EventEmitter,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AppInstance } from '../../../core/models/desktop.model';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  imports: [MatTooltipModule, CdkDrag],
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
