import React from 'react' ;


class ExamQuestion extends React.Component{

  state ={
    timer: 5 ,
    timer_it : null
  }
  componentDidMount(){

   this.timerIntv = setInterval(()=>{

        if(this.state.timer == 0 && this.props.question_idx != -1){
          this.nextQuestion()
          this.setState({timer:6})
        }
        this.setState({timer: this.state.timer-1 })

    },1000)
  }
  componentWillUnmount(){
    clearInterval(this.timerIntv)
  }
  nextQuestion = ()=>{
    let type = 'answer' ;
    console.log('type');
  if(this.props.question.order < (this.props.questions_len - 1)){
      type = 'answer_and_pre_answer' ;
    }
    console.log(type);
    this.props.next(type)
  }

  render(){
    // if (this.props.question_idx == -1){
    //   console.log('clear');
    //
    // }
    // let timer  = this.state.timer ;
    let question = this.props.question.question_type
    console.log(question);
    // if(timer == -1){
    //   this.props.next()
    // }
    return(
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <h1>{this.state.timer}</h1>
          <h5>{question.name}</h5>
          {question.possible_answers.map((answer,idx)=>{
            return(
              <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked={answer.checked} onClick={()=>{this.props.toogleAnswer(idx)}} />
                    <label class="form-check-label" for="inlineCheckbox1">{answer.name}</label>
              </div>
            )
          })
        }
        <button onClick={this.nextQuestion} >next</button>
    </div>
      )
    }
  }

export default ExamQuestion
