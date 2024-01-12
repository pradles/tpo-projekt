import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  constructor(private router: Router) {}

  logout() {
    
    this.router.navigate(['/join-room']);
  }
}
