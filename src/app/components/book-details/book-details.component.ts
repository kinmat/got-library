import { Book } from './../../model/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  id: number;
  book: Book;

  /**
   * A konstruktor inicializálja a routert, a route-ot és könyvek service-ét
   * A jelenlegi route-ból kiszedi az id-t ami alapján megjeleníti az adott könyvnek minden tulajdonságát
   * @param route a jelenlegi route
   * @param charService a könyvek service-e
   * @param router a router ami tovább tud irányítani
   */
  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.setBook(this.id);
    });
    this.book = new Book();

  }
  
  /**
   * Az adott Id alapján a service segítségével lekéri az adott könyvet
   * @param id a megjelenítendő könyv id-je
   */
  setBook(id: number) {
    this.bookService.getBookById(id).subscribe(data => {
      this.book = data;
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


}
