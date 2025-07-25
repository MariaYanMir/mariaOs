import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { map, Observable } from 'rxjs';

export interface GitHubRepo {
  name: string;
  url: string;
  created: string;
  language: string;
}

@Injectable({
  providedIn: 'root',
})
export class GithubServiceService {
  constructor() {}

  http = inject(HttpClient);

  private readonly username = 'MariaYanMir';
  private readonly apiUrl = `https://api.github.com/users/${this.username}/repos`;

  getPublicRepositoires(): Observable<GitHubRepo[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((repos) =>
        repos.map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          created: repo.created_at,
          language: repo.language,
        }))
      )
    );
  }
}
