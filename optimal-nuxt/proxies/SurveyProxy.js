import Proxy from './BaseProxy';


class SurveyProxy extends Proxy {
  constructor(parameters = {}) {
    super('surveys', parameters);
  }
  SpecialSurveyList(){
    return this.submit('get', `/surveys/special`);
  }
  createSurvey(payload){
    return this.submit( 'post',`/surveys`, payload);
  }
  detail(id) {
    return this.submit('get', `/surveys/detail/${id}`);
  }
  showHomeSurvey(){
    return this.submit('get', `/home-special-survey`);
  }

  homeSurveyApproval(){
    return this.submit('get', `/home-survey-approval`);
  }

  updateSurveyStatus(payload){
    return this.submit('patch', `/surveys/status/${payload.id}`, {status:payload.status});
  }
  pushVote(data){
    return this.submit('post',`/pushVote`, data)
  }

  saveComment(data){
    return this.submit('post',`/comments`, data)
  }

  editComment(data){
    return this.submit('put',`/comments/${data.comment_id}`, {body:data.body})
  }

  deleteComment(data){
    return this.submit('delete',`/comments/${data.id}`)
  }

  likeComment(data){
    return this.submit('post',`/likes`, data)
  }

  addChoice(payload){
    return this.submit('post',`/addChoice/${payload.survey}`, payload.data)
  }

  checkVote(payload){
    return this.submit('get',`/checkVote/${payload.survey}/${payload.choice}`)
  }

  cancelVote(payload){
    return this.submit('get',`/cancelVote/${payload.survey}/${payload.choice}`)
  }

  subjects(){
    return this.submit('get',`/subjects`)
  }

  subjectDetail(id){
  return this.submit('get',`/subjectHasSurvey/${id}`)
  }

  newest(id){
  return this.submit('get',`/surveys/newest`)
  }

  submitVote(payload){
    return this.submit('post',`/submitVote/${payload.survey}`, payload.data)
  }

  hasSurvey(id){
    return this.submit('get',`/hasSurvey/${id}`)
  }
}

export default SurveyProxy;
