import { SearchParam } from './../../model/search-param';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent{
  searchBy: string[];
  searchByType: string[];

  characterProps: string[];
  houseProps: string[];
  bookProps: string[];
  params: SearchParam;

  @Output() sParams = new EventEmitter<SearchParam>();

  /**
   * inicializálja a változókat, beállítja, hogy egyes típusoknál mire lehet rákeresni
   * Az alapbeállítás a karakter szerinti keresés
   */
  constructor() {
    this.params = new SearchParam();
    this.params.value = '';
    this.searchByType = ['Character', 'House', 'Book'];
    this.params.type = "Character";
    this.characterProps = [
      'url',
      'name',
      'gender',
      'culture',
      'born',
      'died',
      'father',
      'mother',
      'spouse',
    ];
    this.bookProps = [
      'url',
      'name',
      'publisher',
      'country'
    ];

    this.houseProps = [
      'url',
      'name',
      'region'
    ];

    this.setProperties(this.params.type);
  }

  /**
   * A Search gomb megnyomásakor a komponens átadja a beírt paramétereket a szülőkomponensének (ResultsComponent)
   */
  onSubmit() {
    this.sParams.emit(this.params);
  }

  /**
   * A füüggvény azerint változtatja meg a kereshető tulajdonságokat, hogy milyen típus van beállítva a select elementben
   * @param type a beállított típus
   */
  setProperties(type: string) {
    if (type == 'Character') this.searchBy = this.characterProps;
    if (type == 'House') this.searchBy = this.houseProps;
    if (type == 'Book') this.searchBy = this.bookProps;
  }

  /**
   * A Select elementben a változott értékre meghívja a setProperties függvényt
   * @param event A történt esemény, hogy megváltozott a selection
   */
  onTypeSelectionChanged(event) {
    const value = event.value;
    this.setProperties(value);
  }
}
