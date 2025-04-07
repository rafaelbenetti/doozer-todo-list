import { provideHttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableComponent } from '../../components/table/table.component';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { UsersComponent } from './users.component';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    country: 'USA',
    state: 'NY',
    city: 'New York',
    phone: '1234567890',
    createdAt: new Date(),
    active: true,
  },
];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['get']);

    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        TableComponent,
        SearchInputComponent,
        PageTitleComponent,
      ],
      providers: [provideHttpClient()],
    }).overrideProvider(UserService, { useValue: userServiceMock });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty user list', (done) => {
    component.users$.subscribe((users) => {
      expect(users).toEqual([]);
      done();
    });
  });

  it('should call UserService.get when a search term is emitted', fakeAsync(() => {
    userServiceMock.get.and.returnValue(of(mockUsers));

    component.users$.subscribe();
    component.onSearch('John');
    tick(300);
    fixture.detectChanges();

    expect(userServiceMock.get).toHaveBeenCalledWith('John');
  }));

  it('should debounce search input and update users$', fakeAsync(() => {
    userServiceMock.get.and.returnValue(of(mockUsers));

    let users: User[] = [];
    component.users$.subscribe((result) => {
      users = result;
    });

    component.onSearch('Jane');
    tick(300);

    fixture.detectChanges();

    expect(users).toEqual(mockUsers);
    expect(userServiceMock.get).toHaveBeenCalledWith('Jane');
  }));

  it('should render the table with the correct columns', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = Array.from(compiled.querySelectorAll('th')).map((header) =>
      header.textContent?.trim()
    );

    const expectedHeaders = component.columns.map((col) => col.header);
    expect(headers).toEqual(expectedHeaders);
  });
});
