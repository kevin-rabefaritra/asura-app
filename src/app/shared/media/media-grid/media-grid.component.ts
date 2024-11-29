import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-media-grid',
  standalone: true,
  imports: [],
  templateUrl: './media-grid.component.html',
  styleUrl: './media-grid.component.css'
})
export class MediaGridComponent implements OnInit {

  @Input({required: true}) mediaUris: string[] = [];
  @Input() displayAll: boolean = false;

  @Output() onClickMore: EventEmitter<any> = new EventEmitter();
  @Output() onMediaSelected: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    
  }

  showMore(): void {
    this.onClickMore.emit();
  }

  selectMedia(index: number): void {
    this.onMediaSelected.emit(index);
  }
}
