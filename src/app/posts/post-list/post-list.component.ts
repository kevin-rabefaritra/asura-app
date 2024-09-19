import { Component, HostListener, OnInit, signal, Signal } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";
import { MenuComponent } from "../../shared/menu/menu.component";
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ActivatedRoute } from '@angular/router';
import { NoResultsBlockComponent } from "../../shared/no-results-block/no-results-block.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, MenuComponent, SpinnerComponent, NoResultsBlockComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  postList = signal<Post[]>([]);

  isLastPage: boolean = false;
  isLoading: boolean = false;
  page: number = 0;

  // Used by search feature
  query: string = '';

  constructor(
    private postService: PostService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.query = queryParams['q'];
      this.resetList();
      this.loadPosts();
    });
  }

  resetList(): void {
    this.page = 0;
    this.postList.set([]);
  }

  loadPosts(): void {
    this.isLoading = true;
    this.postService.findAll(this.page, this.query).subscribe({
      next: (value) => {
        this.isLoading = false;
        this.postList.update((list) => list.concat(value.content));
        this.isLastPage = value.last;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll(): void {
    let position = window.innerHeight + window.scrollY;
    let limit = document.body.offsetHeight;

    if (position >= limit && !this.isLoading && !this.isLastPage) {
      this.page += 1;
      this.loadPosts();
    }
  }
}
