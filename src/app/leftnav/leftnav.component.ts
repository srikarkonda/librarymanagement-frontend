import { Component } from '@angular/core';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent {
  isLibraryManager = false;
  constructor() { 
    this.isLibraryManager = JSON.parse(sessionStorage.getItem('user') || '{}')[0]['libraryManager'];
  }
}
