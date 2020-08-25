import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ListItemModel } from "./models";

@Component({
  selector: 'app-chip-autocomplete',
  templateUrl: './chip-autocomplete.component.html',
  styleUrls: ['./chip-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChipAutocompleteComponent),
    multi: true
  }
]
})
export class ChipAutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  visible = true;
  selectable = true;
  removable = true;
  disabled = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemControl = new FormControl();
  allItems: ListItemModel[];
  chipForm: FormGroup;
  onTouch: any = () => { };
  onChange: any = () => { };

  private itemsSubscription;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input() placeholder;
  @Input() filteredItems$: Observable<ListItemModel[]>;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.chipForm = this.fb.group({
      control: []
    });

    this.chipForm.valueChanges.subscribe(form => {
      setTimeout(() => this.onChange(form.control), 0);
    });

    this.itemsSubscription = this.filteredItems$.subscribe((items) => this.allItems = items);

    this.filteredItems$ = this.itemControl.valueChanges.pipe(
      startWith(''),
      map((stuffTyped: string) => this._filter(stuffTyped)));
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  get control() {
    return this.chipForm.get('control');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our item
    this.control.setValue([...this.control.value || [], value.trim()]);

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.itemControl.setValue(null);
  }

  remove(chip: string): void {
    const index = this.control.value.findIndex((ctr) => ctr === chip );

    if (index >= 0) {
      this.control.value.splice(index, 1);
      if (this.control.value.length === 0) {
        this.control.setValue(null);
      } else {
        this.control.updateValueAndValidity();
      }
      this.disabled = false;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.control.setValue([...this.control.value || [], event.option.value]);
    this.itemInput.nativeElement.value = '';
    this.itemControl.setValue(null);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: string) {
    this.control.setValue(val);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private _filter(value: any): ListItemModel[] {

    if (!value || value === '' || value instanceof ListItemModel) {
      return this.allItems;
    }

    const filterValue = value.toLowerCase();

    return this.allItems.filter(item => item.display.toLowerCase().indexOf(filterValue) === 0);
  }

}
