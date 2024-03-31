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
import { VehiclesInStsService } from '../../../services/sts/vehicles-in-sts.service';
import { DistanceCalculatorService } from '../../../services/shared/distance-calculator.service';

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
  // id: string = '';
  userInfo: any = [];
  vehicles: any[] = [];
  landfills: any[] = [];
  sts_Id: string = '';
  landfillInfo: any;
  stsInfo: any;
  dis = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private landfillService: LandfillService,
    private snackBar: SnackbarService,
    private router: Router,
    private stsVehileService: VehiclesInStsService,
    private distanceCalculatorService: DistanceCalculatorService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.initForm();
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      vehicleId: ['', Validators.required],
      vehicleCapacity: 0,
      stsId: this.userInfo.sts ? this.userInfo.sts._id : '',
      landfillId: ['', Validators.required],
      landfillCapacity: 0,
      weightOfWaste: ['', Validators.required],
      distance: 0,
    });
  }

  onSubmit(): void {
    if (this.vehicleForm && this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      console.log('Form Data:', formData);
      formData.stsId = this.sts_Id;

      if (formData.weightOfWaste > formData.landfillCapacity) {
        this.snackBar.openSnackBar(
          'Waste size needs to be smaller or euqal to landfill capacity.',
          'done'
        );
      } else if (formData.weightOfWaste > formData.vehicleCapacity) {
        this.snackBar.openSnackBar(
          'Waste size needs to be smaller or euqal to vehicle capacity.',
          'done'
        );
      } else if (formData.vehicleCapacity > formData.landfillCapacity) {
        this.snackBar.openSnackBar(
          'Vehicle capacity needs to be smaller or euqal to landfill capacity.',
          'done'
        );
      } else {
        this.router.navigateByUrl('/transferdata', { state: { formData } });

        this.snackBar.openSnackBar(
          'The truck started its journey towards landfill.',
          'done'
        );
      }

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
        this.sts_Id = this.userInfo.sts._id;
        this.stsInfo = this.userInfo.sts;
        console.log(this.stsInfo);

        this.getVehiclesList();
        this.getLandfills();
      });
    } else {
      console.log('User not found');
    }
  }
  getVehiclesList() {
    if (this.sts_Id) {
      this.stsVehileService.getVehicles(this.sts_Id).subscribe({
        next: (res) => {
          this.vehicles = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('STS not assigned');
    }
  }

  getLandfills(): void {
    this.landfillService.getLandfillList().subscribe(
      (landfills: any[]) => {
        this.landfills = landfills; // Assign fetched landfills to the component property
      },
      (error: any) => {
        console.error('Error fetching landfills:', error); // Log error to console
        this.snackBar.openSnackBar('Error', 'done');
      }
    );
  }

  onVehicleSelection(vehicleId: string): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle._id === vehicleId
    );
    if (selectedVehicle) {
      this.vehicleForm.patchValue({
        vehicleCapacity: selectedVehicle.capacity,
      });
    }
  }
  onLandfillSelection(landfillId: string): void {
    const selectedLandfill = this.landfills.find(
      (landfill) => landfill._id === landfillId
    );
    if (selectedLandfill) {
      (this.landfillInfo = selectedLandfill),
        this.vehicleForm.patchValue({
          landfillCapacity: selectedLandfill.capacity,
        });
    }
    this.calculate();
  }
  calculate() {
    console.log(this.landfillInfo);
    if (this.stsInfo && this.landfillInfo) {
      const calculate_distance =
        this.distanceCalculatorService.calculateDistance(
          this.stsInfo.gpsCoordinates[0],
          this.stsInfo.gpsCoordinates[1],
          this.landfillInfo.gpsCoordinates[0],
          this.stsInfo.gpsCoordinates[1]
        );
      console.log(calculate_distance);
      this.vehicleForm.patchValue({
        distance: calculate_distance,
      });
    }
  }
}
