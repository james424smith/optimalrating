

export class Register {
  constructor (){
    this.firstname  = null;
    this.middle_name  = null;
    this.lastname  = null;
    this.email = null;
    this.phone_number = null;
    this.sms_verify_code = null;
    this.password = null;
    this.confirm = null;
  }
}

/**
 * Choice
 */
export class Choice {
  constructor() {
    this.id = null
    this.choice_title = null
    this.choice_description = null
    this.marking = 0
    this.image = null
  }
}

/**
 * Survey
 */
export class Survey {
  constructor() {
      this.title = null,
      this.choices = [],
      this.category_id = []
      this.type ='normal'
  }
}
