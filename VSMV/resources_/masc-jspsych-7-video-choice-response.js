const jsPsychMascVideoChoiceResponse = (function (jspsych) {
  'use strict'

  const info = {
    name: 'video-choice-response',
    parameters: {
      /** Array of the video file(s) to play. Video can be provided in multiple file formats for better cross-browser support. */
      stimulus: {
        type: jspsych.ParameterType.VIDEO,
        pretty_name: 'Video',
        default: undefined,
        array: true
      },
      /** Any content here will be displayed below the video and above the choices. */
      question: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: 'Question',
        default: null
      },
      /** Array containing the labels for the choices. */
      choices: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Choices',
        default: undefined,
        array: true
      },
      /**  Array containing the names for the choices */
      names: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Names',
        default: undefined,
        array: true
      },
      /** The name of the button to continue */
      button_label: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Button label',
        default: 'Continue'
      },
      /** The width of the video in pixels. */
      width: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Width',
        default: ''
      },
      /** The height of the video display in pixels. */
      height: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Height',
        default: ''
      },
      /** If true, the video will begin playing as soon as it has loaded. */
      autoplay: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Autoplay',
        default: true
      },
      /** If true, the subject will be able to pause the video or move the playback to any point in the video. */
      controls: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Controls',
        default: false
      },
      /** Time to start the clip. If null (default), video will start at the beginning of the file. */
      start: {
        type: jspsych.ParameterType.FLOAT,
        pretty_name: 'Start',
        default: null
      },
      /** Time to stop the clip. If null (default), video will stop at the end of the file. */
      stop: {
        type: jspsych.ParameterType.FLOAT,
        pretty_name: 'Stop',
        default: null
      },
      /** The playback rate of the video. 1 is normal, <1 is slower, >1 is faster. */
      rate: {
        type: jspsych.ParameterType.FLOAT,
        pretty_name: 'Rate',
        default: 1
      },
      /** If true, the trial will end immediately after the video finishes playing. */
      trial_ends_after_video: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'End trial after video finishes',
        default: false
      },
      /** How long to show trial before it ends. */
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Trial duration',
        default: null
      },
      /** If true, the trial will end when subject makes a response. */
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true
      },
      /** If true, then responses are allowed while the video is playing. If false, then the video must finish playing before a response is accepted. */
      response_allowed_while_playing: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: 'Response allowed while playing',
        default: true
      }
    }
  }
  /**
   * **video-choice-response**
   *
   * jsPsych plugin for playing a video file and getting a multiple choice response
   *
   * @author Salvador Mascarenhas
   */
  class VideoChoiceResponsePlugin {
    constructor (jsPsych) {
      this.jsPsych = jsPsych
    }

    trial (displayElement, trial) {
      if (!Array.isArray(trial.stimulus)) {
        throw new Error(`
        The stimulus property for the video-choice-response plugin must be an array
        of files. See https://www.jspsych.org/latest/plugins/video-button-response/#parameters
      `)
      }
      // setup stimulus
      let videoHtml = '<div>'
      videoHtml += '<video id="jspsych-video-choice-response-stimulus"'
      if (trial.width) {
        videoHtml += ' width="' + trial.width + '"'
      }
      if (trial.height) {
        videoHtml += ' height="' + trial.height + '"'
      }
      if (trial.autoplay && trial.start == null) {
        // if autoplay is true and the start time is specified, then the video will start automatically
        // via the play() method, rather than the autoplay attribute, to prevent showing the first frame
        videoHtml += ' autoplay '
      }
      if (trial.controls) {
        videoHtml += ' controls '
      }
      if (trial.start !== null) {
        // hide video element when page loads if the start time is specified,
        // to prevent the video element from showing the first frame
        videoHtml += ' style="visibility: hidden;"'
      }
      videoHtml += '>'
      const videoPreloadBlob = this.jsPsych.pluginAPI.getVideoBuffer(trial.stimulus[0])
      if (!videoPreloadBlob) {
        for (let i = 0; i < trial.stimulus.length; i++) {
          let fileName = trial.stimulus[i]
          if (fileName.indexOf('?') > -1) {
            fileName = fileName.substring(0, fileName.indexOf('?'))
          }
          let type = fileName.substr(fileName.lastIndexOf('.') + 1)
          type = type.toLowerCase()
          if (type == 'mov') {
            console.warn('Warning: video-choice-response plugin does not reliably support .mov files.')
          }
          videoHtml += '<source src="' + fileName + '" type="video/' + type + '">'
        }
      }
      videoHtml += '</video>'
      videoHtml += '</div>'
      // display choices
      videoHtml += '<form id="jspsych-video-choice-response-form" autocomplete="off">'
      videoHtml += '<div id="jspsych-video-choice-response-questions" class="jspsych-survey-multi-choice-question" data-name="Q0">'
      // add question if there is one
      if (trial.question !== null) {
        videoHtml += '<div id="jspsych-video-choice-response-question" class="jspsych-video-choice-response-text"' + trial.question + '</div>'
      }
      // create option radio buttons
      for (let i = 0; i < trial.choices.length; i++) {
        const optionIdName = 'jspsych-video-choice-response-option-' + i
        const inputName = 'jspsych-video-choice-response'
        const inputId = 'jspsych-video-choice-response-' + i
        videoHtml += '<div id="' + optionIdName + '" class="jspsych-video-choice-response-option">'
        videoHtml += '<label class="jspsych-video-choice-response-text" for="' + inputId + '">'
        videoHtml +=
          '<input type="radio" name="' + inputName +
          '" id="' + inputId +
          '" value="' + trial.names[i] +
          '"></input>'
        videoHtml += trial.choices[i] + '</label></div>'
      }
      videoHtml += '</div>'
      // add submit button
      videoHtml += '<input type="button" id="jspsych-video-choice-response-next" class="jspsych-video-choice-response jspsych-btn"' + (trial.button_label ? ' value="' + trial.button_label + '"' : '') + '></input>'
      videoHtml += '</form>'

      displayElement.innerHTML = videoHtml
      const startTime = performance.now()
      const videoElement = displayElement.querySelector('#jspsych-video-choice-response-stimulus')
      if (videoPreloadBlob) {
        videoElement.src = videoPreloadBlob
      }
      videoElement.onended = () => {
        if (trial.trial_ends_after_video) {
          endTrial()
        } else if (!trial.response_allowed_while_playing) {
          enableResponses()
        }
      }
      videoElement.playbackRate = trial.rate
      // if video start time is specified, hide the video and set the starting time
      // before showing and playing, so that the video doesn't automatically show the first frame
      if (trial.start !== null) {
        videoElement.pause()
        videoElement.onseeked = () => {
          videoElement.style.visibility = 'visible'
          videoElement.muted = false
          if (trial.autoplay) {
            videoElement.play()
          } else {
            videoElement.pause()
          }
          videoElement.onseeked = () => { }
        }
        videoElement.onplaying = () => {
          videoElement.currentTime = trial.start
          videoElement.onplaying = () => { }
        }
        // fix for iOS/MacOS browsers: videos aren't seekable until they start playing, so need to hide/mute, play,
        // change current time, then show/unmute
        videoElement.muted = true
        videoElement.play()
      }
      let stopped = false
      if (trial.stop !== null) {
        videoElement.addEventListener('timeupdate', (e) => {
          const currentTime = videoElement.currentTime
          if (currentTime >= trial.stop) {
            if (!trial.response_allowed_while_playing) {
              enableResponses()
            }
            videoElement.pause()
            if (trial.trial_ends_after_video && !stopped) {
              // this is to prevent endTrial from being called twice, because the timeupdate event
              // can fire in quick succession
              stopped = true
              endTrial()
            }
          }
        })
      }
      if (trial.response_allowed_while_playing) {
        enableResponses()
      } else {
        disableResponses()
      }
      // store response
      const response = {
        rt: null,
        choice: null
      }
      // function to end trial when it is time
      const endTrial = () => {
        // kill any remaining setTimeout handlers
        this.jsPsych.pluginAPI.clearAllTimeouts()
        // stop the video file if it is playing
        // remove any remaining end event handlers
        displayElement
          .querySelector('#jspsych-video-choice-response-stimulus')
          .pause()
        displayElement.querySelector('#jspsych-video-choice-response-stimulus').onended = () => { }
        // gather the data to store for the trial
        const trialData = {
          rt: response.rt,
          stimulus: trial.stimulus,
          response: response.choice
        }
        // clear the display
        displayElement.innerHTML = ''
        // move on to the next trial
        this.jsPsych.finishTrial(trialData)
      }
      // function to handle responses by the subject
      function afterResponse (choice) {
        // measure rt
        const endTime = performance.now()
        const rt = Math.round(endTime - startTime)
        response.choice = choice
        response.rt = rt
        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        videoElement.className += ' responded'
        // disable all the buttons after a response
        disableResponses()
        if (trial.response_ends_trial) {
          endTrial()
        }
      }
      function buttonResponse (e) {
        const match = displayElement.querySelector('#jspsych-video-choice-response-form')
        let value
        if (match.querySelector('input[type=radio]:checked') !== null) {
          value = match.querySelector('input[type=radio]:checked').value
        } else {
          value = ''
        }
        afterResponse(value)
      }
      function disableResponses () {
        document.getElementById('jspsych-video-choice-response-next').disabled = true
        document.getElementById('jspsych-video-choice-response-next').style.visibility = 'hidden'
        document.getElementById('jspsych-video-choice-response-form').style.visibility = 'hidden'
      }
      function enableResponses () {
        document.getElementById('jspsych-video-choice-response-next').disabled = false
        document.getElementById('jspsych-video-choice-response-next').style.visibility = 'visible'
        document.getElementById('jspsych-video-choice-response-next').addEventListener('click', buttonResponse)
        document.getElementById('jspsych-video-choice-response-form').style.visibility = 'visible'
      }
      // end trial if time limit is set
      if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(endTrial, trial.trial_duration)
      }
    }

    /** Dunno what this is about... */
    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
        load_callback()
        this.simulate_data_only(trial, simulation_options)
      }
      if (simulation_mode == "visual") {
        this.simulate_visual(trial, simulation_options, load_callback)
      }
    }
    create_simulation_data(trial, simulation_options) {
      const default_data = {
        stimulus: trial.stimulus,
        rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
        response: this.jsPsych.randomization.randomInt(0, trial.choices.length - 1),
      }
      const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options)
      this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data)
      return data
    }
    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options)
      this.jsPsych.finishTrial(data)
    }
    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options)
      const displayElement = this.jsPsych.getDisplayElement()
      this.trial(displayElement, trial)
      load_callback()
      const videoElement = displayElement.querySelector("#jspsych-video-choice-response-stimulus")
      const respond = () => {
        if (data.rt !== null) {
          this.jsPsych.pluginAPI.clickTarget(displayElement.querySelector(`div[data-choice="${data.response}"] button`), data.rt)
        }
      }
      if (!trial.response_allowed_while_playing) {
        videoElement.addEventListener("ended", respond)
      }
      else {
        respond()
      }
    }
  }
  VideoChoiceResponsePlugin.info = info

  return VideoChoiceResponsePlugin

})(jsPsychModule)
