import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ITableColumn } from './table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TableModule, CommonModule],
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: ITableColumn[] = [];
  @Input() customBodyTemplate!: TemplateRef<any>;
}
