import { LoadingService } from "../services/loading.service";
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.changeDetector.detectChanges();
    this.subscribeToLoadingChange();
  }

  subscribeToLoadingChange() {
    this.loadingService.onLoadingChange.subscribe((res: boolean) => {
      this.showLoading = res;
    });
  }

  ngOnDestroy() {
    this.showLoading = true;
  }
}
