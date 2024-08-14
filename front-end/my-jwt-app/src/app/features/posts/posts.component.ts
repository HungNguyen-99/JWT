import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../bases/base-component.component';
import { PostsService } from '../../services/posts.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  template: ` <h1>Posts</h1> `,
  standalone: true,
  imports: [],
  providers: [],
})
export class PostsComponent extends BaseComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.postsService
      .getPosts()
      .pipe(
        tap((res) => {
          console.log(res);
        })
      )
      .subscribe();
  }
}
