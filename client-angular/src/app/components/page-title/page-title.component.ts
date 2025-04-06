import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
  standalone: true,
})
export class PageTitleComponent {
  @Input() title: string;
}
