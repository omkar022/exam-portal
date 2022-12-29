import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  cid: any;
  quizzes: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
    // this.cid = this._route.snapshot.params['cid'];
    this._route.params.subscribe(
      (params) => {
        // console.log(params);
        // this.cid = this._route.snapshot.params['cid'];
        this.cid = params['cid'];
        if (this.cid == 0) {
          console.log("Load all the quiz");
          this._quiz.getActiveQuizzes().subscribe(
            (data: any) => {
              this.quizzes = data;
              console.log(this.quizzes);
            })
        }
        else {
          console.log("Load specific quiz");
          // alert("Error");
          this._quiz.getActiveQuizzesOfCategory(this.cid).subscribe(
            (data: any) => {
              this.quizzes = data;
            },
            (error) => {
              alert("Error");
            }
          )
        }
      })

  }

}
