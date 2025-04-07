import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-input',
  imports: [InputIcon, IconField, InputTextModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  standalone: true,
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
  @Input() loading: boolean = false;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
