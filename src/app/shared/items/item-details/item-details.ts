import { Component, OnInit, signal, WritableSignal } from "@angular/core";

@Component({
  template: ''
})
export abstract class ItemDetails<T> implements OnInit {

  item = signal<T | undefined>(undefined);
  isLoading: WritableSignal<boolean> = signal(true);

  isGalleryDisplayed = signal<boolean>(false);
  selectedMediaIndex = signal<number>(0);

  abstract fetch(): void;

  ngOnInit(): void {
    this.fetch();
  }

  displayGallery(event: {mediaIndex: number}): void {
    this.selectedMediaIndex.set(event.mediaIndex);
    this.isGalleryDisplayed.set(true);
  }
}