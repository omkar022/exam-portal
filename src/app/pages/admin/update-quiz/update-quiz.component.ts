import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  categories: any;
  // [
  //   {
  //     cid: 23,
  //     title: 'Programming',
  //   },
  //   {
  //     cid: 24,
  //     title: 'Apti',
  //   },
  // ]
  constructor(private _router: Router, private _route: ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService, private _snack: MatSnackBar) { }
  qid = 0;
  quiz: any;
  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid'];
    // alert(this.qid)
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      }, (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Loading Error', 'error');
      }
    );
  }
  updateQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open("Required title!!", '', {
        duration: 3000,
      });
      return;
    }
    console.log(this.quiz);
    this._quiz.updateQuiz(this.quiz).subscribe((data: any) => {
      Swal.fire('Success', 'quiz is updated', 'success').then((e) => {
        this._router.navigate(['/admin/quizzes']);
      })
      // this.quiz = {
      //   title: '',
      //   description: '',
      //   maxMarks: '',
      //   numberOfQuestions: '',
      //   active: true,
      //   category: {
      //     cid: '',
      //   },
      // }
    },
      (error) => {
        Swal.fire('error!!', 'updating quiz error', 'error')
        console.log(error);
      }
    )
  }
}
