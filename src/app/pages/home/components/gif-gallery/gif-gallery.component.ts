import { Component, input, output } from '@angular/core';
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { GifPreviewAdapted } from '../../../../shared/models/gif.model';
import { GifComponent } from '../../../../shared/components/gif/gif.component';
import { LoadingStatus } from '../../../../shared/models/loader.model';

@Component({
  selector: 'app-gif-gallery',
  imports: [NgxMasonryModule, InfiniteScrollDirective, GifComponent],
  templateUrl: './gif-gallery.component.html',
  styleUrl: './gif-gallery.component.scss',
})
export class GifGalleryComponent {
  public data = input.required<GifPreviewAdapted[]>();
  public loadingStatus = input.required<LoadingStatus>();
  public updateMasonryLayout = input.required<boolean>();
  public masonryOptions = input<NgxMasonryOptions>({ gutter: 12 });
  public changePaginationParams = output<boolean>();

  protected readonly LOADING_STATUS = LoadingStatus;

  public updatePaginationParams(): void {
    this.changePaginationParams.emit(true);
  }
}
