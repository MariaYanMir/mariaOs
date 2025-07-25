import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { AppInstance } from '../../../core/models/desktop.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dock-icon',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './dock-icon.component.html',
  styleUrl: './dock-icon.component.scss',
})
export class DockIconComponent {
  item = input<AppInstance>();
  itemSelected: OutputEmitterRef<AppInstance> = output<AppInstance>();

  isHovered: boolean = false;

  emitSelectedItem() {
    this.itemSelected.emit(this.item()!);
  }
}
