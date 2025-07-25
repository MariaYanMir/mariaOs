import { Component, inject, OnInit } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { WindowManagerService } from '../../services/window-manager.service';
import { GithubServiceService } from '../../../core/services/github-service.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NgxTypedJsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent implements OnInit {
  private windowService = inject(WindowManagerService);

  githubService = inject(GithubServiceService);

  typedLines = [
    "$ Welcome to my mind's operating system\n",
    '$ System name: mariaOS\n',
    '$ Starting...',
  ];

  ngOnInit(): void {
    this.githubService.getPublicRepositoires();
  }

  closeTerminal() {
    setTimeout(() => {
      this.windowService.closeWindow('terminal');
    }, 2000);
  }
}
