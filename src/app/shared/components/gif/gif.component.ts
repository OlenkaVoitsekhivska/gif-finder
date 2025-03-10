import { Component, input } from '@angular/core';
import { GifPreviewAdapted } from '../../models/gif.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gif',
  imports: [RouterLink],
  templateUrl: './gif.component.html',
  styleUrl: './gif.component.scss',
})
export class GifComponent {
  public data = input.required<GifPreviewAdapted>();
}
