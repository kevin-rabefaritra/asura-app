import { Component, HostListener, OnInit } from '@angular/core';
import { PostCardComponent } from "../post-card/post-card.component";
import { MenuComponent } from "../../shared/menu/menu.component";
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent, MenuComponent, SpinnerComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  postList: Post[] = [];
  isLastPage: boolean = false;
  isLoading: boolean = false;
  page: number = 0;

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    console.log(`Fetch posts at page ${this.page}`);
    this.isLoading = true;
    this.postService.findAll(this.page).subscribe({
      next: (value) => {
        this.isLoading = false;
        this.postList = this.postList.concat(value.content);
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
