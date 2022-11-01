import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  json!: { username: string; password: string; firstname: string; lastname: string; email: string; Phone: string; };

  constructor(private userService: UserService, private snack: MatSnackBar) { }
  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    Phone: '',
  };
  ngOnInit(): void {
  }
  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('username is required!!', '', {
        duration: 3000,
      })

      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success done !!', 'user id is ' + data.id, 'success');
      },
      (error) => {
        console.log(error);
        this.snack.open('something went wrong', '', {
          duration: 3000,
        })
      }
    )
  }

}
