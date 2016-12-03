angular.module('myQuiz').controller('QuizController', ['$scope', 'QuizService', '$sce','$http', function($scope, QuizService, $sce, $http){
  $scope.k = "hello";
  $scope.test = QuizService.test;
  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0;
  // $scope.getQuiz = function {
  //   QuizService.getQuiz().then(function(quizData){
  //     $scope.myQuestions = QuizService.myQuestions;
  //     $scope.totalQuestions = QuizService.totalQuestions;
  //   })
  // };
  // $scope.getQuiz();
  $http.get('quiz_data.json').then(function(quizData){
    $scope.myQuestions = quizData.data;
    $scope.totalQuestions = $scope.myQuestions.length;
  });
  console.log($scope.totalQuestions);
  $scope.selectAnswer = function(qIndex, aIndex){
    var questionState = $scope.myQuestions[qIndex].questionState;

    if (questionState != 'answered') {
      $scope.myQuestions[qIndex].selectedAnswer = aIndex;
      var correctAnswer = $scope.myQuestions[qIndex].correct;
      $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
      if (aIndex === correctAnswer) {
        $scope.myQuestions[qIndex].correctness = 'correct';
        $scope.score += 1;
      } else {
        $scope.myQuestions[qIndex].correctness = 'incorrect';
      }
      $scope.myQuestions[qIndex].questionState = 'answered';
    }
    $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(0);
  };

 $scope.isSelected = function(qIndex, aIndex) {
   return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
 }
 $scope.isCorrect = function(qIndex, aIndex) {
   return $scope.myQuestions[qIndex].correctAnswer === aIndex;
 }
 $scope.selectContinue = function(){
   return $scope.activeQuestion += 1;
 }
 $scope.createShareLinks = function(percentage){
   var url = 'http://codifydesign.com';
   var emailLink = '<a class="btn email" href="mailto:?subject= Try to beat my score!&amp;body=I scored '+percentage+' percent on this quiz. Try to beat my score at '+url+'">Email a friend</a>';
   var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a '+percentage+' percent on this quiz. Try to beat my score at&amp;hashtags=SaturnQuiz&url='+url+'">Tweet your score</a>';
   var newMarkup = emailLink + twitterLink;
   return $sce.trustAsHtml(newMarkup);
 }

}])
