import { CharacterService } from './../../services/character.service';
import { Character } from 'src/app/model/character';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-char-details',
  templateUrl: './char-details.component.html',
  styleUrls: ['./char-details.component.css']
})
export class CharDetailsComponent {
  id: number;
  char: Character;

    /**
   * A konstruktor inicializálja a routert, a route-ot és karakterek service-ét
   * A jelenlegi route-ból kiszedi az id-t ami alapján megjeleníti az adott karakternek minden tulajdonságát
   * @param route a jelenlegi route
   * @param charService a karakterek service-e
   * @param router a router ami tovább tud irányítani
   */
  constructor(private route: ActivatedRoute, private charService: CharacterService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.setChar(this.id);
    });
    this.char = new Character();

  }
  
  /**
   * Az adott Id alapján a service segítségével lekéri az adott karaktert
   * @param id a megjelenítendő karakter id-je
   */
  setChar(id: number) {
    this.charService.getCharById(id).subscribe(data => {
      this.char = data;
    })
  }

  /**
   * Adott karakter linkjének kattintására átirányít annak a karakternek az oldalára
   * @param url az adott link
   */
   charUrlClicked(url: string) {
    var splitted = url.split("/");
    let id = splitted[splitted.length - 1];
    this.router.navigate([`character/${id}`]);
  }

  /**
   * Adott könyv linkjének kattintására átirányít annak a könyvnek az oldalára
   * @param url az adott link
   */
  bookUrlClicked(url: string) {
    var splitted = url.split("/");
    let id = splitted[splitted.length - 1];
    this.router.navigate([`book/${id}`]);
  }

  /**
   * Adott ház linkjének kattintására átirányít annak a háznak az oldalára
   * @param url az adott link
   */
  houseUrlClicked(url: string) {
    var splitted = url.split("/");
    let id = splitted[splitted.length - 1];
    this.router.navigate([`house/${id}`]);
  }


}
