import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-custom-multi-select',
  templateUrl: './custom-multi-select.component.html',
  styleUrls: ['./custom-multi-select.component.scss']
})
export class CustomMultiSelectComponent {

  @Input() optionsSelect: { id: number, itemName: string }[] = [];
  selectedItems: { id: number, itemName: string }[] = [];
  showDropdown: boolean = false;
  filterValue: string = '';
  filteredOptions: { id: number, itemName: string }[] = [];
  hiddenItemCount: number = 0;

  @Output() selectionChanged: EventEmitter<{ id: number, itemName: string }[]> = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
    if (changes.optionsSelect && changes.optionsSelect.currentValue) {
      this.filteredOptions = changes.optionsSelect.currentValue;
    }
  }
 
filterOptions() {
  if (this.filterValue) {
    this.filteredOptions = this.optionsSelect.filter(option => option.itemName.toLowerCase().includes(this.filterValue.toLowerCase()));
  } else {
    this.filteredOptions = [...this.optionsSelect];
  }
}


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleSelection(option: { id: number, itemName: string }) {
    const index = this.selectedItems.findIndex(item => item.id === option.id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems = [...this.selectedItems, option];
    }
    this.selectionChanged.emit(this.selectedItems);
    this.hiddenItemCount = this.selectedItems.length > 3 ? this.selectedItems.length - 3 : 0;
  }

  removeItem(item: { id: number, itemName: string }) {
    this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem.id !== item.id);
    this.selectionChanged.emit(this.selectedItems);
  }

  clearAll() {
    this.selectedItems = [];
    this.selectionChanged.emit(this.selectedItems);
    this.hiddenItemCount = 0;
  }

  toggleAll() {
    if (this.selectedItems.length === this.optionsSelect.length) {
      this.selectedItems = [];
    } else {
      this.selectedItems = [...this.optionsSelect];
    }
    this.selectionChanged.emit(this.selectedItems);
    this.hiddenItemCount = this.selectedItems.length > 3 ? this.selectedItems.length - 3 : 0;
  }

  isOptionSelected(option: { id: number, itemName: string }): boolean {
    return this.selectedItems.some(item => item.id === option.id);
  }
  
}
