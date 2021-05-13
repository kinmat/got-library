import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../model/house';
import { SearchParam } from '../model/search-param';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private url = 'https://anapioficeandfire.com/api/houses/';

  constructor(private http: HttpClient) {
  }

  /**
   * @param id a keresett ház id-je
   * @returns Az adott házat vagy null-t
  */
  public getHouseById(id: number) {
    return this.http.get<House>(`${this.url}/${id}`);
  }

  /**
   * @param sParams a megadott keresési paraméterek
   * @param page hányadik oldalt kéri le
   * @param pageSize az egyszerre lekért házak száma
   * @returns A házak tömbjét, vagy üres tömböt
   */
  public getHousesBy(sParams: SearchParam, page: number, pageSize: number): Observable<House[]> {
    return this.http.get<House[]>(`${this.url}?${sParams.key}=${sParams.value}&page=${page}&pageSize=${pageSize}`);
   }
  
}
