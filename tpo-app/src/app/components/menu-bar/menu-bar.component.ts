import {Component, OnInit} from '@angular/core';
import { CostsService } from '../../services/costs.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent implements OnInit{
  name:string = ""
  constructor(private costsService: CostsService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
  }

  getUserNumber() {
    return this.costsService.getUsersLenght();
  }
}
