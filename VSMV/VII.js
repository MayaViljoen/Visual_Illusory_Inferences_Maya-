/* global initJsPsych jsConsentDec jsPsychInstructions jsPsychVideoButtonResponse jsPsychImageButtonResponse */

let subject = ''

const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: '',
  on_finish: function (data) {
    jsPsych.data.displayData()
    /*
     * What's below is for saving data, we'll uncomment it before running for real:
     */
    /*
      SaveData("quillien-2a-plural-version", subject, jsPsych.data.get().csv())
      $(".jspsych-content").html('<center><p>Thank you for completing the experiment. <strong>Please use the following link to confirm your participation: </strong><a href="https://app.prolific.co/submissions/complete?cc=4EE4DE9D">https://app.prolific.co/submissions/complete?cc=4EE4DE9D</a>. Your payment will be processed <strong>within 24 hours</strong>.</p></center>')
     */
  }
})

subject = jsPsych.randomization.randomID(10)

jsPsych.data.addProperties({
  subject_id: subject,
  condition: group
})

const timeline = []

const consentTrial = {
  type: jsConsentDec,
  platform: 'Prolific',
  language: 'en',
  about: 'visual processing and decision making'
}



const instructionsFam = {
  type: jsPsychInstructions,
  pages: [
    '<h1>Instructions</h1><p>The next five pages will display animations illustrating water flowing through a pipe.</p><p>Watch them <b>carefully</b> to understand how they work.</p>'
  ],
  show_page_number: true,
  show_clickable_nav: true
}

// future experimental condition

//familiarization block n=4

const familiarOneTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/fam1.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false,
  width: 800
}
const familiarTwoTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization2.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false,
  width: 800
}

const familiarThreeTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./Fut_Movies/FAM4_increasedGateMov.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false,
  width: 800
}
const familiarFourTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization3.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false,
  width: 800
}
const familiarFiveTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization4.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false,
  width: 800
}

/** SM: Use the trial below as a template for the multiple-choice questions with video */

const instructionsTrial = {
  type: jsPsychInstructions,
  pages: ['<h1>Instructions</h1><p>The next few pages will display more animations of water flowing through a system of pipes.<br>Watch them carefully and answer the questions.</p>'
  ],
  show_page_number: true,
  show_clickable_nav: true
}

const instructionsfut_exp = {
  type: jsPsychInstructions,
  pages: [
    '<h1>Instructions</h1><p>Note that in each trial water is guaranteed to flow down the pipe.</p>'
  ],
  show_page_number: true,
  show_clickable_nav: true
}

const TestTrialFutIN = {
  type: jsPsychMascVideoChoiceResponse,
  stimulus: ['./Fut_Movies/TargetIN_FUT.mp4'],
  response_allowed_while_playing: false,
  question: '<p> Which Gate do you think will open? </p>',
  choices: ['Gate J', 'Gate K', "I don't know"],
  names: ['j', 'k', 'dunno'],
  response_allowed_while_playing: false,
  width: 800
}

//only want one side? 

const TestTrialFut_MIRROR_IN = {
  type: jsPsychMascVideoChoiceResponse,
  stimulus: ['./Fut_Movies/TargetINMirror_FUT.mp4'],
  response_allowed_while_playing: false,
  question: '<p> Which Gate do you think will open? </p>',
  choices: ['Gate J', 'Gate K', "I don't know"],
  names: ['j', 'k', 'dunno'],
  response_allowed_while_playing: false,
  width: 800
}


const BaselineFUT_IN = {
  type: jsPsychMascVideoChoiceResponse,
  stimulus: ['./Fut_Movies/BaselineIN_FUT.mp4'],
  response_allowed_while_playing: false,
  question: '<p> Which Gate do you think will open? </p>',
  choices: ['Gate J', 'Gate K', "I don't know"],
  names: ['j', 'k', 'dunno'],
  response_allowed_while_playing: false,
  width: 800
}




const BaselineFUT_IN_mirror = {
  type: jsPsychMascVideoChoiceResponse,
  stimulus: ['./Fut_Movies/BaselineINMirror_FUT.mp4'],
  response_allowed_while_playing: false,
  question: '<p> Which Gate do you think will open? </p>',
  choices: ['Gate J', 'Gate K', "I don't know"],
  names: ['j', 'k', 'dunno'],
  response_allowed_while_playing: false,
  width: 800
}

//Depending on experimental for it will either be  YesControlLEFTFut  or YesControlLEFTFut. (Depending on revealed gates in no control )

//So if In NoControlFut we reveal J, participants are forced to say K. So in the YesControl, we reveal K.

const NoControlJFut = {
  type: jsPsychMascVideoChoiceResponse,
  stimulus: ['./Fut_Movies/FutMovie_NewGate/NoControl_FUT.mp4'],
  response_allowed_while_playing: false,
  question: '<p> Which gate do you think wil open? </p>',
  choices: ['Gate J', 'Gate K', "I don't know"],
  names: ['j', 'k', 'dunno'],
  response_allowed_while_playing: false,
  width: 800
}

 
const YesControlLEFTFut = {
  type: jsPsychMascVideoChoiceResponse,
  stimulus: ['./Fut_Movies/FutMovie_NewGate/YesControlK_FUT.mp4'],
  response_allowed_while_playing: false,
  question: '<p> Do you think J will open? </p>',
  choices: ['Yes I do',  "I don't know"],
  names: ['yes', 'dunno'],
  response_allowed_while_playing: false,
  width: 800
}

const static_instructions = {
  type: jsPsychInstructions,
  pages: ['<h1>Instructions</h1><p>Excellent!<br>Next, we will show static images of systems pipes that control the flow of water and ask a few questions.</p>'
  ],
  show_page_number: true,
  show_clickable_nav: true
}

//need to centre 
const ABnotC = {
  type: jsPsychImageButtonResponse,
  stimulus: ['static__controls/images_static/imagesA/abNotC.jpeg'],
  choices: ['Yes', 'No'],
  prompt: "<p>In this situation, is it possible for the water to flow down the pipe?</p>",
  stimulus_width: 800,
  data: {
    question_id: 'static-1',
    config: 'ABnotC'
  }
};

const bNotANotC = {
  type: jsPsychImageButtonResponse,
  stimulus: ['static__controls/images_static/imagesA/bNotANotC.jpeg'],
  choices: ['Yes', 'No'],
  prompt: "<p>In this situation, is it possible for the water to flow down the pipe?</p>",
  stimulus_width: 800
};

const aNotBNotC = {
  type: jsPsychImageButtonResponse,
  stimulus: ['static__controls/images_static/imagesA/aNotBNotC.jpeg'],
  choices: ['Yes', 'No'],
  prompt: "<p>In this situation, is it possible for the water to flow down the pipe?</p>",
  stimulus_width: 800
};

const cNotANotB = {
  type: jsPsychImageButtonResponse,
  stimulus: ['static__controls/images_static/imagesA/cNotANotB.jpeg'],
  choices: ['Yes', 'No'],
  prompt: "<p>In this situation, is it possible for the water to flow down the pipe?</p>",
  stimulus_width: 800
};

const NotANotBNotC = {
  type: jsPsychImageButtonResponse,
  stimulus: ['static__controls/images_static/imagesA/NotANotBNotC.jpeg'],
  choices: ['Yes', 'No'],
  prompt: "<p>In this situation, is it possible for the water to flow down the pipe?</p>",
  stimulus_width: 800
};

// Define the timeline
// consent, instructions
timeline.push(consentTrial, instructionsFam)

// familiarizations
timeline.push(familiarOneTrial, familiarTwoTrial, familiarThreeTrial, familiarFourTrial, familiarFiveTrial)

// second batch of instructions
timeline.push(instructionsTrial, instructionsfut_exp)

// test/baseline plus yes control
switch (group) {
  case 1:
    timeline.push(TestTrialFutIN, YesControlLEFTFut)
    break
  case 2:
    timeline.push(TestTrialFut_MIRROR_IN, YesControlRIGHTFut)
    break
  case 3:
    timeline.push(BaselineFUT_IN, YesControlLEFTFut)
    break
  case 4:
    timeline.push(BaselineFUT_IN_mirror, YesControlRIGHTFut)
    break
}

// no control
timeline.push(NoControlJFut)

// instructions for static controls
timeline.push(static_instructions)

// static controls
timeline.push(ABnotC, NotANotBNotC, bNotANotC, aNotBNotC, cNotANotB)

jsPsych.run(timeline)
