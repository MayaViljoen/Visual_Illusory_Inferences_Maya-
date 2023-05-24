/* global initJsPsych jsConsentDec jsPsychInstructions jsPsychVideoButtonResponse */

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
  subject_id: subject
})

const timeline = []

const consentTrial = {
  type: jsConsentDec,
  platform: 'Prolific',
  language: 'en',
  about: 'visual processing and decision making'
}
timeline.push(consentTrial)

const instructionsTrial = {
  type: jsPsychInstructions,
  pages: [
    '<h1>Instructions</h1><p>The next four pages will display animations illustrating water flowing through a pipe.</p><p>Watch them <b>carefully</b> to understand how they work.</p>'
  ],
  show_page_number: true,
  show_clickable_nav: true
}
timeline.push(instructionsTrial)

const familiarOneTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization1.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}
const familiarTwoTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization2.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}
const familiarThreeTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization3.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}
const familiarFourTrial = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos/familiarization4.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}
//**********************
// Here begin the trials
//**********************



const TestTrialFut = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos2/targetJKawayFUT.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}


const NoControlFut = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos2/NocontrolFUT.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}


const YesControlJFut = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos2/YesControlJBlurredFut.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}

//Do we want mirrored?
const YesControlKFut = {
  type: jsPsychVideoButtonResponse,
  stimulus: ['./videos2/YesControlKBlurredFut.mp4'],
  choices: ['Continue'],
  response_allowed_while_playing: false
}



timeline.push(familiarOneTrial, familiarTwoTrial, familiarThreeTrial, familiarFourTrial,TestTrialFut,NoControlFut,YesControlJFut,  YesControlKFut)

jsPsych.run(timeline)
