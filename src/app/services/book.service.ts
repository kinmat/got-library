import { Book } from './../model/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchParam } from '../model/search-param';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = 'https://anapioficeandfire.com/api/books/';

  constructor(private http: HttpClient) {
  }

  /**
   * @param id a keresett konyv id-je
   * @returns Az adott könyvet vagy null-t
   */
  public getBookById(id: number) {
    return this.http.get<Book>(`${this.url}/${id}`);
  }

  /**
   * @param sParams a megadott keresési paraméterek
   * @param page hányadik oldalt kéri le
   * @param pageSize az egyszerre lekért könyvek száma
   * @returns A könyvek tömbjét, vagy üres tömböt
   */
  public getBooksBy(sParams: SearchParam, page: number, pageSize: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}?${sParams.key}=${sParams.value}&page=${page}&pageSize=${pageSize}`);
   }
}
