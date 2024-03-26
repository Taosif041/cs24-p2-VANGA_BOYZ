import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { UserService } from './../../../services/user/user.service';
interface Post {
  // Define the properties of a single post
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  posts: any[] = []; // Specify posts as an array of any type

  constructor(private service: UserService) {}

  ngOnInit() {
    // this.service.getPosts().subscribe((response: any) => {
    //   // Specify response as an array of Post type
    //   this.posts = response; // Assign the response to posts
    // });
  }

  // users: any[] = [];
  // newUser: any = {};

  // constructor(private userService: UserService) {}

  // ngOnInit(): void {
  //   this.getAllUsers();
  // }

  // getAllUsers(): void {
  //   this.userService.getAllUsers().subscribe((users) => {
  //     this.users = users;
  //   });
  //   console.log(this.users[0]);
  // }

  // addUser(): void {
  //   this.userService.addUser(this.newUser).subscribe(() => {
  //     this.getAllUsers();
  //     this.newUser = {}; // Clear the form
  //   });
  // }

  // updateUser(user: any): void {
  //   this.userService.updateUser(user).subscribe(() => {
  //     this.getAllUsers();
  //   });
  // }

  // deleteUser(userId: number): void {
  //   this.userService.deleteUser(userId).subscribe(() => {
  //     this.getAllUsers();
  //   });
  // }
}
