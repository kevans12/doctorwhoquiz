angular.module('myQuiz').service('QuizService', function($http){
  this.test = "testing";
  this.getQuiz = function() {  
  $http.get('quiz_data.json').then(function(quizData){
    this.myQuestions = quizData.data;
    this.totalQuestions = myQuestions.length;

   });
  }
})
