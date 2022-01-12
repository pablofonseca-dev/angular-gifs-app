import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  constructor(private gifsService: GifsService){

  }
  //non null assertion operator. Asegurarse que el elemento no es nulo. 
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar = () => {
    const value = this.txtBuscar.nativeElement.value;
    
    if(!(value && value.trim().length > 0)) return; 
    
    this.gifsService.searchGifs(value);
    this.txtBuscar.nativeElement.value = "";
    
  }
}
