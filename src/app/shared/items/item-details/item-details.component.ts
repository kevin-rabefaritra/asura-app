import { Component, Input, signal, WritableSignal } from '@angular/core';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { NoResultsBlockComponent } from "../../no-results-block/no-results-block.component";
import { MediaGalleryComponent } from "../../media/media-gallery/media-gallery.component";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [SpinnerComponent, NoResultsBlockComponent, MediaGalleryComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {

  @Input({required: true}) item = signal<any>(undefined);
  @Input({required: true}) isLoading: WritableSignal<boolean> = signal(true);

  @Input({required: true}) isGalleryDisplayed = signal<boolean>(false);
  @Input({required: true}) selectedMediaIndex = signal<number>(0);

  dismissGallery(): void {
    this.isGalleryDisplayed.set(false);
  }
}
