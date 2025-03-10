import { Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { GifApiService } from '../../shared/services/gif-api.service';
import { finalize, map, take, tap } from 'rxjs';
import { GifAdapter } from '../../shared/utils/gif.adapter';
import { CopiedStatus, GifDetailsAdapted } from '../../shared/models/gif.model';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { LoadingStatus } from '../../shared/models/loader.model';

@Component({
  selector: 'app-gif-details',
  imports: [ClipboardModule, ToastModule, ButtonComponent, RouterLink],
  templateUrl: './gif-details.component.html',
  styleUrl: './gif-details.component.scss',
  providers: [MessageService],
})
export class GifDetailsComponent implements OnChanges {
  private readonly gifApiService = inject(GifApiService);

  private readonly messageService = inject(MessageService);

  private copiedStatus = signal<CopiedStatus>(CopiedStatus.idle);

  protected readonly COPIED_STATUS = CopiedStatus;

  protected readonly LOADING_STATUS = LoadingStatus;

  public loadingStatus = signal<LoadingStatus>(LoadingStatus.idle);

  public gifId = input.required<string>();

  public data = signal<GifDetailsAdapted | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    const id = this.gifId();
    if (id) {
      this.getGifById(id);
    }
  }

  private getGifById(id: string): void {
    this.loadingStatus.set(LoadingStatus.pending);
    this.gifApiService
      .getGifById(id)
      .pipe(
        take(1),
        map((res) =>
          res.data.length ? res.data.map((gif) => new GifAdapter(gif).getDetails()) : [],
        ),
        tap((res) => this.data.set(res[0])),
        finalize(() => this.loadingStatus.set(LoadingStatus.finished)),
      )
      .subscribe();
  }

  private showSuccessToast(summary: string, detail: string): void {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  private showErrorToast(summary: string, detail: string): void {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  public updateCopiedStatus(value: CopiedStatus): void {
    this.copiedStatus.set(value);
    switch (value) {
      case CopiedStatus.success:
        this.showSuccessToast('Success', 'Copied the gif url');
        break;
      case CopiedStatus.error:
        this.showErrorToast('Error', 'Things went south...');
        break;
      default:
        break;
    }
  }
}
