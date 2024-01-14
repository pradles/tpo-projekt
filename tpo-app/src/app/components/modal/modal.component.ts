// modal.component.ts
import {Component, Input, Output, EventEmitter, HostListener, OnInit} from '@angular/core';

import { CostsService } from '../../services/costs.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  name = "";

  constructor(private costsService: CostsService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.name = this.route.snapshot.params['name']
  }

  @Input() isModalOpen: boolean = false;
  @Input() message: string = '';
  @Input() removeExpenseId: number | undefined;
  @Output() closeModal = new EventEmitter<void>();

  toggleModal() {
    this.closeModal.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (this.isModalOpen && !targetElement.closest('#popup-modal')) {
      this.closeModal.emit();
    }
  }

  /**
   * Get expense name by selected expense id
   * @returns - name of expense
   */
  getExpenseName() {
    return this.costsService.getExpenseName(this.removeExpenseId ?? -1);
  }

  /**
   * Remove expense with the selected expense id
   */
  removeExpense() {
    this.costsService.removeExpense(this.removeExpenseId ?? -1,this.name);
  }

}
