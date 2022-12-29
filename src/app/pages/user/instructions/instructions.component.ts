import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private route: Router,) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe((data: any) => {
      this.quiz = data;
    },

      (error) => {
        console.log("Error")
      }
    )
  }
  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `No`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.route.navigate(['/start/' + this.qid]);
      }

      if (result.isConfirmed) {
        Swal.fire('Starting!', '', 'warning')
      }
      else if (result.isDenied) {
        Swal.fire('Denied', '', 'info')
      }
    })
  }
}
