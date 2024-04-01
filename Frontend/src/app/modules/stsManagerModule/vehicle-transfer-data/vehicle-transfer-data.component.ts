import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentiction/authentiction.service';
import { UserService } from '../../../services/user/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle-transfer-data',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './vehicle-transfer-data.component.html',
  styleUrl: './vehicle-transfer-data.component.scss',
})
export class VehicleTransferDataComponent implements OnInit {
  user: any;
  userInfo: any = [];
  roleName = '';
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getUserData();
  }
  navigateToWasteLogs() {
    this.router.navigate(['/wastelogs']);
  }
  navigateToStsVehicles() {
    this.router.navigate(['/stsvehicle']);
  }

  navigateToLandfillVehicles() {
    this.router.navigate(['/landfillvehicle']);
  }

  getUserData() {
    this.user = this.authService.getUser();
    if (this.user != null) {
      const userId = this.user.id;

      // Call getUserById function with the retrieved user ID
      this.userService.getUserById(userId).subscribe((userData) => {
        // Handle the response here
        this.userInfo = userData;
        this.roleName = this.userInfo.roles[0].roleName;
        console.log('userInfo', this.userInfo);
      });
    } else {
      console.log('User not found');
    }
  }
}
