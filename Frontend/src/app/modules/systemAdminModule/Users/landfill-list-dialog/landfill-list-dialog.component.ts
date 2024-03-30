import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LandfillService } from '../../../../services/landfill/landfill.service';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../../../../services/authentiction/authentiction.service';

@Component({
  selector: 'app-landfill-list-dialog',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './landfill-list-dialog.component.html',
  styleUrl: './landfill-list-dialog.component.scss',
})
export class LandfillListDialogComponent {
  landfills: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<LandfillListDialogComponent>,
    private landfillService: LandfillService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getLandfillList();
  }

  getLandfillList(): void {
    this.landfillService.getLandfillList().subscribe(
      (response: any) => {
        this.landfills = response;
      },
      (error: any) => {
        console.error('Error fetching landfill list:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
