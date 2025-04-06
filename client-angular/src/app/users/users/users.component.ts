import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableComponent } from '../../components/table/table.component';
import {
  ITableColumn,
  TableColumnText,
} from '../../components/table/table.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
  standalone: true,
  providers: [UserService],
  imports: [
    TableComponent,
    AsyncPipe,
    PageTitleComponent,
    SearchInputComponent,
  ],
})
export class UsersComponent implements OnInit {
  userService = inject(UserService);
  users$: Observable<User[]>;

  columns: ITableColumn[] = [
    { type: TableColumnText.Text, field: 'id', header: 'Id' },
    { type: TableColumnText.Text, field: 'name', header: 'Name' },
    { type: TableColumnText.Text, field: 'email', header: 'Email' },
    { type: TableColumnText.Text, field: 'country', header: 'Country' },
    { type: TableColumnText.Text, field: 'state', header: 'State' },
    { type: TableColumnText.Text, field: 'city', header: 'City' },
    { type: TableColumnText.Date, field: 'createdAt', header: 'Created At' },
    { type: TableColumnText.Active, field: 'active', header: 'Active' },
  ];

  search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.users$ = this.search.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((search) => this.userService.get(search)),
      startWith([])
    );
  }

  ngOnInit(): void {}

  onSearch(search: string) {
    this.search.emit(search);
  }
}
