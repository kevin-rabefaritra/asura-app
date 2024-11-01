import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post-media-grid',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './post-media-grid.component.html',
  styleUrl: './post-media-grid.component.css'
})
export class PostMediaGridComponent implements OnInit {

  @Input({required: true}) mediaFiles: {url: string, tags: string[]}[] = [];
  @Input() displayAll: boolean = false;

  @Output() onClickMore: EventEmitter<any> = new EventEmitter();
  @Output() onMediaSelected: EventEmitter<number> = new EventEmitter();

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    
  }

  showMore(): void {
    this.onClickMore.emit();
  }

  selectMedia(index: number): void {
    this.onMediaSelected.emit(index);
  }
}
