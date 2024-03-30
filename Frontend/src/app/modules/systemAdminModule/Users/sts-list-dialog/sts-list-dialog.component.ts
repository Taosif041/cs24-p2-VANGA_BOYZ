import { StsService } from './../../../../services/sts/sts.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../../../../services/authentiction/authentiction.service';

@Component({
  selector: 'app-sts-list-dialog',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './sts-list-dialog.component.html',
  styleUrl: './sts-list-dialog.component.scss',
})
export class StsListDialogComponent {
  sts: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<StsListDialogComponent>,
    private stsService: StsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getstsList();
  }

  getstsList(): void {
    this.stsService.getStsList().subscribe(
      (response: any) => {
        this.sts = response;
      },
      (error: any) => {
        console.error('Error fetching sts list:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
