import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router'; // Import Router

import { AuthenticationService } from '../../../services/authentiction/authentiction.service';
import { UserService } from '../../../services/user/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { NgFor } from '@angular/common';
import { LandfillService } from '../../../services/landfill/landfill.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-vehicle-transfer',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NgFor],
  templateUrl: './vehicle-transfer.component.html',
  styleUrl: './vehicle-transfer.component.scss',
})
export class VehicleTransferComponent implements OnInit {
  vehicleForm!: FormGroup; // Add ! to indicate that it will be initialized in ngOnInit
  user: any; // Define a variable to store user information
  id: string = '';
  userInfo: any = [];
  vehicles: any[] = [];
  landfills: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private landfillService: LandfillService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getVehicles();
    this.getLandfills();
    this.initForm();
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      vehicleId: ['', Validators.required],
      stsId: this.userInfo.sts ? this.userInfo.sts._id : '',
      landfillId: ['', Validators.required],
      weightOfWaste: ['', Validators.required],
      distance: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.vehicleForm && this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      console.log('Form Data:', formData);
      this.router.navigateByUrl('/transferdata', { state: { formData } });

      // Process the form data (e.g., send it to the server)
    } else {
      console.log('Form is invalid or not initialized.');
    }
  }

  getUserData() {
    this.user = this.authService.getUser();
    if (this.user != null) {
      const userId = this.user.id;

      // Call getUserById function with the retrieved user ID
      this.userService.getUserById(userId).subscribe((userData) => {
        // Handle the response here
        this.userInfo = userData;
        console.log('User Data:', userData);
      });
    } else {
      console.log('User not found');
    }
  }

  getVehicles(): void {
    this.vehicleService.getVehiclesList().subscribe(
      (vehicles: any[]) => {
        this.vehicles = vehicles;
        console.log(vehicles[0]);
      },
      (error: any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  getLandfills(): void {
    this.landfillService.getLandfillList().subscribe(
      (landfills: any[]) => {
        this.landfills = landfills; // Assign fetched landfills to the component property
        console.log(landfills[0]); // Log the first landfill to the console (optional)
      },
      (error: any) => {
        console.error('Error fetching landfills:', error); // Log error to console
        this.snackBar.openSnackBar('Error', 'done');
      }
    );
  }
}
