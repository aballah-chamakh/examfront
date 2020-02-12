import React from 'react' ;
import {Route,Switch} from 'react-router-dom' ;
import ExamLandingPage from './ExamLandingPage/ExamLandingPage' ;
import ExamQuestion from './ExamQuestion/ExamQuestion' ;
import ExamResult from './ExamResult/ExamResult' ;
import axios from 'axios' ;
import HOST_URL from '../../config' ;
class StudentExam extends React.Component {
  state = {
    user_exam : null ,
    current_question_idx : null ,
  }
  next = (type)=>{
    console.log(type);
    let current_question_idx = this.state.current_question_idx ;
  //  here create user_answer
    if(current_question_idx == null){
       current_question_idx = 0 ;
    }else if(current_question_idx != null){
      current_question_idx += 1
    }
    if(current_question_idx == this.state.user_exam.exam.questions.length){
      current_question_idx = -1
    }
    // answer pre_answer
    //
    switch (type) {
      case 'answer':
        this.answer(current_question_idx)
      break;
      case 'pre_answer':
        this.pre_answer(current_question_idx)
      break;
      case 'answer_and_pre_answer':
        this.answer_and_pre_answer(current_question_idx)
      break;
      // default:

    }
  }
  pre_answer = (current_question_idx)=>{
    let user_exam_id = this.state.user_exam.id
    let question_id = this.state.user_exam.exam.questions[current_question_idx].id
    axios.put(HOST_URL+'/api/user-exam/'+user_exam_id+'/pre_answer/',{question_id:question_id}).then(res=>{
        this.setState({current_question_idx:current_question_idx})
    })
  }
  answer = (current_question_idx)=>{
    let question = this.state.user_exam.exam.questions[this.state.user_exam.exam.questions.length-1]
    let possible_answer_ids = question.question_type.possible_answers.filter(q=> q.checked == true)
    let user_exam_id = this.state.user_exam.id
    let data = {possible_answer_ids:possible_answer_ids,question_id:question.id}
    axios.put(HOST_URL+'/api/user-exam/'+user_exam_id+'/answer/',data).then(res=>{
      this.setState({current_question_idx:current_question_idx})
    })
  }
  answer_and_pre_answer = (current_question_idx)=>{
    let question = this.state.user_exam.exam.questions[current_question_idx-1] ;
    let possible_answer_ids = question.question_type.possible_answers.filter(q=> q.checked == true)
    let user_exam_id = this.state.user_exam.id
    let data = {possible_answer_ids:possible_answer_ids,question_id:question.id}
    axios.put(HOST_URL+'/api/user-exam/'+user_exam_id+'/answer_and_pre_answer/',data).then(res=>{
      this.setState({current_question_idx:current_question_idx})
    })
  }
  setUserExam= (user_exam)=>{
    console.log(user_exam);
     this.setState({user_exam:user_exam})
  }
  toogleAnswer = (a_idx)=>{
    let user_exam = this.state.user_exam ;
    let current_question_idx =  this.state.current_question_idx
    user_exam.exam.questions[current_question_idx].question_type.possible_answers[a_idx].checked = !user_exam.exam.questions[current_question_idx].question_type.possible_answers[a_idx].checked
    this.setState({user_exam:user_exam})
  }
  render(){
    let question_idx = this.state.current_question_idx ;
    console.log(question_idx);
    return(
      <div>
          {this.state.current_question_idx == null ?
              <ExamLandingPage user_exam={this.state.user_exam} setUserExam={this.setUserExam} next={this.next} />
            : this.state.current_question_idx != -1 ?
               <ExamQuestion  next={this.next} question={this.state.user_exam.exam.questions[question_idx]} question_idx={question_idx} questions_len={this.state.user_exam.exam.questions.length} toogleAnswer={this.toogleAnswer} />
            :  <ExamResult />
          }
      </div>
    )
  }
}
export default StudentExam ;
