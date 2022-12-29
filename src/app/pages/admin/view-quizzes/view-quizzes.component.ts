import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid: 23,
      title: 'Basic java',
      description: 'sasd',
      maxMarks: 20,
      numberOfQuestions: 10,
      active: false,
      category: {
        title: 'program',
        description: "This quiz category contains questions"
      }
    },
    {
      qid: 24,
      title: 'Basic py',
      description: 'sasd',
      maxMarks: 20,
      numberOfQuestions: 10,
      active: false,
      category: {
        title: 'program',
        description: "This quiz category contains questions"
      },

    },
  ];




  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', "Loading Error ", 'error');

      })
  }
  deleteQuiz(qid: any) {
    Swal.fire({
      icon: 'info',
      'title': "Are you sure?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // alert(qid);
        this._quiz.deleteQuiz(qid).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid)
            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error In deletion', 'error');
          }
        );
      }
    })
  }
}

