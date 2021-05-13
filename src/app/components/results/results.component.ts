import { HouseService } from 'src/app/services/house.service';
import { BookService } from 'src/app/services/book.service';
import { CharacterService } from './../../services/character.service';
import { SearchParam } from './../../model/search-param';
import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/model/character';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { House } from 'src/app/model/house';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
  
export class ResultsComponent {
  chars: Character[] = [];
  books: Book[] = [];
  houses: House[] = [];
  currentPage = 1;
  resultParams: SearchParam;
  pageSize: number = 10;
  rightClickable: boolean;
  leftClickable: boolean;

  /**
   *  A konstruktor inicializálja a service-eket és a routert.
   * @param charService a karakterek lekéréséez használt service
   * @param bookService a könyvek lekéréséhez használt service
   * @param houseServie a házak lekéréséhez használt service
   * @param router a router, ami akkor irányít át, ha valamelyik találatnál a details-re kattintunk
   */
  constructor(
    private charService: CharacterService,
    private bookService: BookService,
    private houseServie: HouseService,
    private router: Router
  ) {
    this.rightClickable = false;
    this.leftClickable = false;
    this.resultParams = new SearchParam();
  }

  /**
   * Ez a függvény az ezen komponens gyerek-komponensének (SearchComponent) az outputja
   * Meghívja az addResults függvényt, úgy, hogy az első oldalnyi adatot kérje le
   * @param params a search komponensből kapott paraméterek amik alapján az eredményeket megjeleníti
   */
  getParams(params: SearchParam) {
    this.currentPage = 1;
    this.resultParams = params;
    this.addResults(params, 1, this.pageSize);
  }

  /**
   * A függvény attól függően hogy milyen típusú a keresés mehívja megfelelő függvényt
   * @param params az átadott keresési paraméterek
   * @param page az eredmény oldal indexe
   * @param pageSize az oldalon hány max keresési eredmény lehet
   */
  addResults(params: SearchParam, page: number, pageSize: number) {
    if (params.type == 'Character') this.addChars(params, page, pageSize);
    if (params.type == 'House') this.addHouses(params, page, pageSize);
    if (params.type == 'Book') this.addBooks(params, page, pageSize);
  }

  /**
   * A függvény meghívja a könyvek service-ét és eltárolja a visszakapott könyv tömböt
   * Kezeli az eredémnyek függvényében a lépés gombokat
   * @param params az átadott keresési paraméterek
   * @param page az eredmény oldal indexe
   * @param pageSize az oldalon hány max keresési eredmény lehet
   */
  addBooks(params: SearchParam, page: number, pageSize: number) {
    this.bookService.getBooksBy(params, page, pageSize).subscribe((data) => {
      this.books = data;
      if (data.length == pageSize) this.rightClickable = true;
      else this.rightClickable = false;
      if (this.currentPage > 1) this.leftClickable = true;
      else this.leftClickable = false;
    });
  }

  /**
   * A függvény meghívja a házak service-ét és eltárolja a visszakapott könyv tömböt
   * Kezeli az eredémnyek függvényében a lépés gombokat
   * @param params az átadott keresési paraméterek
   * @param page az eredmény oldal indexe
   * @param pageSize az oldalon hány max keresési eredmény lehet
   */
  addHouses(params: SearchParam, page: number, pageSize: number) {
    this.houseServie.getHousesBy(params, page, pageSize).subscribe((data) => {
      this.houses = data;
      if (data.length == pageSize) this.rightClickable = true;
      else this.rightClickable = false;
      if (this.currentPage > 1) this.leftClickable = true;
      else this.leftClickable = false;
    });
  }

    /**
   * A függvény meghívja a karakterek service-ét és eltárolja a visszakapott karakterek tömböt
   * Kezeli az eredémnyek függvényében a lépés gombokat
   * @param params az átadott keresési paraméterek
   * @param page az eredmény oldal indexe
   * @param pageSize az oldalon hány max keresési eredmény lehet
   */
  addChars(params: SearchParam, page: number, pageSize: number) {
    this.charService
      .getCharactersBy(params, page, pageSize)
      .subscribe((data) => {
        this.chars = data;
        if (data.length == pageSize) this.rightClickable = true;
        else this.rightClickable = false;
        if (this.currentPage > 1) this.leftClickable = true;
        else this.leftClickable = false;
      });
  }

  /**
   * A keresési eredmények között az eggyel előbbi oldalra visszalép
   */
  clickLeft() {
    this.currentPage--;
    this.addResults(this.resultParams, this.currentPage, this.pageSize);
  }

  /**
   * A keresési eredmények között következő oldalra továbblép
   */
  clickRight() {
    this.currentPage++;
    this.addResults(this.resultParams, this.currentPage, this.pageSize);
  }

  /**
   * A függvény átirányít annak a találatnak a részletes megjelenítésére amire kattintottunk
   * @param url a kattintott találat url-je
   */
  onDetailsClick(url: string) {
    var splitted = url.split('/');
    let id = splitted[splitted.length - 1];
    if (this.resultParams.type == 'Character')
      this.router.navigate([`character/${id}`]);
    if (this.resultParams.type == 'House')
      this.router.navigate([`house/${id}`]);
    if (this.resultParams.type == 'Book') this.router.navigate([`book/${id}`]);
  }
}
