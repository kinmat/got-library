import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { House } from 'src/app/model/house';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent {
  id: number;
  house: House;

  /**
   * A konstruktor inicializálja a routert, a route-ot és ház service-ét
   * A jelenlegi route-ból kiszedi az id-t ami alapján megjeleníti az adott háznak minden tulajdonságát
   * @param route a jelenlegi route
   * @param houseService a házak service-e
   * @param router a router ami tovább tud irányítani
   */
  constructor(private route: ActivatedRoute, private houseService: HouseService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.setHouse(this.id);
    });
    this.house = new House();

   }

  /**
   * Az adott Id alapján a service segítségével lekéri az adott házat
   * @param id a megjelenítendő ház id-je
   */
  setHouse(id: number) {
    this.houseService.getHouseById(id).subscribe(data => {
      this.house = data;
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
