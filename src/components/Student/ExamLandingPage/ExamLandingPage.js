import React from 'react' ;
import axios from 'axios' ;
import HOST_URL from '../../../config' ;
import './examlandingpage-scss.scss' ;

class ExamLandingPage extends React.Component {

  componentDidMount(){
    let data = {user_id:5,course_id:1}
    console.log(data);
    console.log(HOST_URL);
    axios.post(HOST_URL+'/api/user-exam/',data).then(res=>{
        let user_exam = res.data  ;
        for(let i=0 ; i < user_exam.exam.questions.length ; i++){
          for (var i_2 = 0; i_2 < user_exam.exam.questions[i].question_type.possible_answers.length; i_2++) {
            user_exam.exam.questions[i].question_type.possible_answers[i_2]['checked'] = false  ;
          }
        }
        console.log(user_exam);
        this.props.setUserExam(user_exam)
    })
  }

  render(){
    let exam = this.props.user_exam ? this.props.user_exam.exam  : null ;
    let fields = ['name','duration']  ;
    return(
        <div class="exam-container">
          {exam ?
              <div class="exam-info">
              {fields.map(field=>{
                return(
                  <div>
                     <span class='key'>{field} : </span><span  class='value' >{exam[field]}</span>
                  </div>
                )
              })
              }
              </div>
           : null}
           <button class="start-exam-btn" onClick={()=>{this.props.next('pre_answer')}}>start</button>
        </div>
    )
  }
}
export default ExamLandingPage ;
