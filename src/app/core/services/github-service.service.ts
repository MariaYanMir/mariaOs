import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Octokit } from '@octokit/rest';

@Injectable({
  providedIn: 'root',
})
export class GithubServiceService {
  constructor() {}

  http = inject(HttpClient);

  octokit = new Octokit({
    auth: 'YOUR-TOKEN',
  });

  private readonly username = 'MariaYanMir';
  private readonly apiUrl = `https://api.github.com/users/${this.username}/repos`;

  getPublicRepositoires() {
    this.http.get(this.apiUrl).subscribe((repos) => console.log(repos));
  }
}
