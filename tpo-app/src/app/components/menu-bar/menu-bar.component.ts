import { Component } from '@angular/core';
import { CostsService } from '../../services/costs.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  constructor(private costsService: CostsService) {}

  getUserNumber() {
    return this.costsService.getUsersLenght();
  }
}
