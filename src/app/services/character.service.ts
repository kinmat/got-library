import { SearchParam } from './../model/search-param';
import { Character } from './../model/character';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private url = 'https://anapioficeandfire.com/api/characters/';

  constructor(private http: HttpClient) { }

    /**
   * @param sParams a megadott keresési paraméterek
   * @param page hányadik oldalt kéri le
   * @param pageSize az egyszerre lekért karakterek száma
   * @returns A karakterek tömbjét, vagy üres tömböt
   */
  public getCharactersBy(sParams: SearchParam, page: number, pageSize: number): Observable<Character[]> {
   return this.http.get<Character[]>(`${this.url}?${sParams.key}=${sParams.value}&page=${page}&pageSize=${pageSize}`);
  }

  /**
   * @param id a keresett karakter id-je
   * @returns Az adott karaktert vagy null-t
   */
  public getCharById(id: number) {
    return this.http.get<Character>(`${this.url}/${id}`);
  }

}
