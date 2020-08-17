import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ListItemModel } from "./models";

@Component({
  selector: 'app-chip-autocomplete',
  templateUrl: './chip-autocomplete.component.html',
  styleUrls: ['./chip-autocomplete.component.scss']
})
export class ChipAutocompleteComponent implements OnInit, OnDestroy {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemControl = new FormControl();
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  selectedItems: string[] = [];
  allItems: ListItemModel[];

  private itemsSubscription;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input() placeholder;
  @Input() filteredItems$: Observable<ListItemModel[]>;

  constructor() {
  }

  ngOnInit(): void {
    this.itemsSubscription = this.filteredItems$.subscribe((items) => this.allItems = items);

    this.filteredItems$ = this.itemControl.valueChanges.pipe(
      startWith(''),
      map((stuffTyped: string) => this._filter(stuffTyped)));
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our item
    if ((value || '').trim()) {
      this.selectedItems.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.itemControl.setValue(null);
  }

  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemControl.setValue(null);
  }

  private _filter(value: string): ListItemModel[] {

    if (!value || value === '') {
      return this.allItems;
    }

    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.display.toLowerCase().indexOf(filterValue) === 0);
  }

}
