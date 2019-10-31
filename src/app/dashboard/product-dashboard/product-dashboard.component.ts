import { ProductCart } from '../../shared/services/product-cart.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, HostListener } from '@angular/core';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  isModalEnabled: boolean = false;
  editMode = new Subscription();

  constructor(private editModal: EditModalService,
              private cartService: ProductCart,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeToModalToggling();
    this.cartService.checkCartExistenseByUserId();
    this.cartService.getCartFromServer();
  }

  public subscribeToModalToggling(): void {
    this.editMode = this.editModal.onEditChange.subscribe(
      (res: boolean) => {
        this.isModalEnabled = res;
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.editMode.unsubscribe();
  }

  @HostListener('scroll', ['$event.target'])
  onDashboardScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop == event.target.scrollHeight) {
          console.log('end of the page!');
    }
 }
}

