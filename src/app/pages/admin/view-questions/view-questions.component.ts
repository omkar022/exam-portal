import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qid!: any;
  qtitle!: any;
  question: any;
  quesId: any;
  // [
  //   {
  //     "quesId": 37,
  //     "content": "What is Java",
  //     "image": "java.png",
  //     "option1": "OOPS",
  //     "option2": "Function",
  //     "option3": "Method",
  //     "option4": "Collection",
  //     "answer": "OOPS",
  //     "quiz": {
  //       "qid": 34,
  //       "title": "JavaBasicsMCQ",
  //       "description": "Basics Of Java",
  //       "maxMarks": "200",
  //       "numberOfQuestions": "20",
  //       "active": false,
  //       "category": {
  //         "cid": 31,
  //         "title": "Programming languages",
  //         "description": "This quiz category contains questions"
  //       }
  //     }
  //   }
  // ];

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _router: Router, private _quiz: QuizService, private _cat: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['id'];
    // alert(this.qid)
    this.qtitle = this._route.snapshot.params['title'];
    // console.log(this.qid);
    // console.log(this.qtitle);
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data) => {
        console.log(data);
        this.question = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteQuestion(qid: any) {
    // alert(this.qid);
    // console.log(this.qid);
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure,want to delete this question?',

    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snack.open('Deleted', '', { duration: 3000 });
            this.question = this.question.filter((q: { quesId: any; }) => q.quesId != qid);
          },
          (error) => {
            this._snack.open('Error', '', { duration: 3000 })
          }
        )
      }
    }

    )
  }
}

