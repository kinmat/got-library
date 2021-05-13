import { BookDetailsComponent } from './components/book-details/book-details.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';
import { ResultsComponent } from './components/results/results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharDetailsComponent } from './components/char-details/char-details.component';

const routes: Routes = [
  { path: '', component: ResultsComponent },
  { path: 'character/:id', component: CharDetailsComponent },
  { path: 'house/:id', component: HouseDetailsComponent },
  { path: 'book/:id', component: BookDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
