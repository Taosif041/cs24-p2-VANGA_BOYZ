import { Component, OnInit } from '@angular/core';
import { ContructorService } from '../../../../services/contructor/contructor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-list',
  standalone: true,
  imports: [],
  templateUrl: './contractor-list.component.html',
  styleUrl: './contractor-list.component.scss',
})
export class ContractorListComponent implements OnInit {
  constructors: any[] = [];
  constructor(
    private _contructorService: ContructorService,
    private route: ActivatedRoute
  ) {}
  user_id = '';

  ngOnInit(): void {
    this.getAllContructors();
    this.route.queryParams.subscribe((params) => {
      this.user_id = params['id'];
      console.log('user_id', this.user_id);
      // Do something with the _id
    });
  }

  getAllContructors() {
    this._contructorService.getContructorList().subscribe({
      next: (contructors: any[]) => {
        console.log('Contructors:', contructors);
        this.constructors = contructors;
        // Do something with the fetched contructors list
      },
      error: (error) => {
        console.error('Error fetching contructors:', error);
      },
    });
  }
  managerId = '';
  addManagerToContructor(contractorId: string) {
    this.managerId = this.user_id;
    this._contructorService
      .addManagerToContructor(contractorId, this.managerId)
      .subscribe({
        next: (response: any) => {
          console.log('Manager added successfully:', response);
          // Handle success, if needed
        },
        error: (error) => {
          console.error('Error adding manager:', error);
          // Handle error, if needed
        },
      });
  }
}
