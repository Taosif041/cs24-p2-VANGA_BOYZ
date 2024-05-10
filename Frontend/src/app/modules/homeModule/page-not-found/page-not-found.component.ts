import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatPaginatorModule, NgFor, MatCardModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit {
  // Sample data, replace this with your actual data
  p: any;

  allItems: any[] = [
    {
      title: 'Item 1',
      description: 'Description for Item 1',
    },
    {
      title: 'Item 2',
      description: 'Description for Item 2',
    },
    {
      title: 'Item 1',
      description: 'Description for Item 3',
    },
    {
      title: 'Item 2',
      description: 'Description for Item 4',
    },

    { title: 'Item 1', description: 'Description for Item 1' },
    { title: 'Item 2', description: 'Description for Item 2' },

    { title: 'Item 1', description: 'Description for Item 1' },
    { title: 'Item 2', description: 'Description for Item 2' },

    { title: 'Item 1', description: 'Description for Item 1' },
    { title: 'Item 2', description: 'Description for Item 2' },

    { title: 'Item 1', description: 'Description for Item 1' },
    { title: 'Item 2', description: 'Description for Item 2' },

    { title: 'Item 1', description: 'Description for Item 1' },
    { title: 'Item 2', description: 'Description for Item 2' },

    // Add more items as needed
  ];

  currentPage: any[] = [];
  pageSize = 8; // Number of items per page
  pageSizeOptions = [8, 16, 24]; // Options for items per page
  totalItems = this.allItems.length;

  constructor() {}

  ngOnInit(): void {
    // Initial page load
    this.updatePage(0);
  }

  onPageChange(event: any) {
    this.updatePage(event.pageIndex);
  }

  updatePage(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPage = this.allItems.slice(startIndex, endIndex);
  }
}
