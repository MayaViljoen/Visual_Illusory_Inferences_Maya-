/**
 * consent-dec
 * Salvador Mascarenhas
 *
 * based on Mathias Sablé-Meyer's external consent form
 *
 * requires `utf-16be-with-signature-unix` encoding
 *
**/

var jsConsentDec = (function(jspsych) {
  "use strict";

  const info = {
    name: "jsConsentDec",
    description: 'Show a standard consent form for DEC, collect consent',
    parameters: {
      platform: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Platform',
        default: "Prolific",
        description: "Platform on which the experiment is run."
      },
      language: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Language",
        default: "en",
        description: "Language for consent form."
      },
      about: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "About",
        default: "reasoning",
        description: "What the experiment is about."
      }
    }
  };

  class jsConsentDecPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      if (trial.language == "fr") {
        var theForm = "<div id=\"consent\"><section id=\"consent_body\"><h1>ENS Département d'études cognitives</h1><p>Nous vous invitons à participer à une étude menée par des chercheurs de l'Ecole Normale Supérieure. L'objectif de cette étude est d'en savoir plus sur le raisonnement.</p><p>Nous vous demanderons de remplir un questionnaire en français, comportant des tâches telles que lire des phrases ou des mots, nommer des images ou décrire des scènes, déterminer quelles phrases découlent d'autres phrases, ou participer à des jeux linguistiques simples.</p><p>Si vous avez lu ce formulaire et que vous avez décidé de participer à cette expérience, veuillez comprendre que votre participation est volontaire et que vous avez le le droit de retirer votre consentement ou d'interrompre votre participation à tout moment Cependant, veuillez noter qu'afin de valider le tâche, vous devez terminer l'expérience et saisir le code que vous obtiendrez à la fin sur Prolific.  Sinon, nous n'avons aucun moyen de traiter votre paiement.</p><p>Cette étude ne comporte aucun risque ni avantage d'aucune sorte. Vous serez rémunéré pour votre participation au taux affiché.</p><ul class=\"left\"><li>Votre participation à cette étude restera confidentielle.</li><li>Votre identité sera préservée dans toutes les données publiées et écrites résultant de cette étude.</li><li>Vous pouvez imprimer ce formulaire pour le garder.</li></ul><p>En cochant la case et en cliquant sur le bouton en bas de cette page vous indiquez que vous êtes avez minimum <strong>18 ans</strong>, que vous comprenez cette déclaration, et que vous acceptez de <strong>effectuer cette tâche volontairement</strong>.</p></section><section id=\"consent_form\"><input type=\"checkbox\" id=\"consent_checkbox\" class=\"checkbox-custom\" onClick=\"document.getElementById('start').disabled ^= true;\"/><label for=\"consent_checkbox\" id=\"consent_label\">J'accepte de participer à cette expérience</label> <br/><button type=\"button\" class=\"jspsych-btn\" id=\"start\" disabled=\"true\">Commencer l'expérience</button></section></div>";
      }
      else {
        switch (trial.platform) {
        case "MTurk":
          var theForm = "<div id=\"consent\"><section id=\"consent_body\"><h1>ENS Department of Cognitive Studies</h1><p>We invite you to participate in a research study being conducted by investigators from Ecole Normale Sup&eacute;rieure.  The purpose of the study is to learn about " + trial.about + ".</p><p>We will ask you to fill out a questionnaire in English, involving such tasks as reading sentences or words, naming pictures or describing scenes, deciding what sentences follow from other sentences, or participating in simple language games.</p><p>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time.  However, please note that in order to validate the HIT you need to complete the experiment and type in the code you will get at the end on the HIT's page on Mechanical Turk.  Otherwise we have no way to process your payment.</p><p>There are no risks or benefits of any kind involved in this study. You will be paid for your participation at the posted rate.</p><ul class=\"left\"><li>Your participation in this study will remain confidential.</li><li>Your individual privacy will be maintained in all published and written data resulting from this study.</li><li>You may print this form for your records.</li></ul><p>By ticking the box and clicking on the button at the bottom of this page you indicate that you are at least <strong>18 years of age</strong>, that you understand this statement, and that you agree to <strong>complete this HIT voluntarily</strong>.</p></section><section id=\"consent_form\"><input type=\"checkbox\" id=\"consent_checkbox\" class=\"checkbox-custom\" onClick=\"document.getElementById('start').disabled ^= true;\"/><label for=\"consent_checkbox\" id=\"consent_label\">I agree to participate in this experiment</label> <br/><button type=\"button\" class=\"jspsych-btn\" id=\"start\" disabled=\"true\">Start the experiment</button></section></div>";
          break;
        case "Prolific":
          var theForm = "<div id=\"consent\"><section id=\"consent_body\"><h1>ENS Department of Cognitive Studies</h1><p>We invite you to participate in a research study being conducted by investigators from Ecole Normale Sup&eacute;rieure.  The purpose of the study is to learn about " + trial.about + ".</p><p>We will ask you to fill out a questionnaire in English, involving such tasks as reading sentences or words, naming pictures or describing scenes, deciding what sentences follow from other sentences, or participating in simple language games.</p><p>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time.  However, please note that in order to validate the task you need to complete the experiment and type in the code you will get at the end into Prolific or click the link you will get at the end.  Otherwise we have no way to process your payment.</p><p>There are no risks or benefits of any kind involved in this study. You will be paid for your participation at the posted rate.</p><ul class=\"left\"><li>Your participation in this study will remain confidential.</li><li>Your individual privacy will be maintained in all published and written data resulting from this study.</li><li>You may print this form for your records.</li></ul><p>By ticking the box and clicking on the button at the bottom of this page you indicate that you are at least <strong>18 years of age</strong>, that you understand this statement, and that you agree to <strong>complete this experiment voluntarily</strong>.</p></section><section id=\"consent_form\"><input type=\"checkbox\" id=\"consent_checkbox\" class=\"checkbox-custom\" onClick=\"document.getElementById('start').disabled ^= true;\"/><label for=\"consent_checkbox\" id=\"consent_label\">I agree to participate in this experiment</label> <br/><button type=\"button\" class=\"jspsych-btn\" id=\"start\" disabled=\"true\">Start the experiment</button></section></div>";
          break;
        default:
        }
      }
  
      display_element.innerHTML = '<div style="inline-size: 800px; margin:auto; text-align: left">' + theForm + '</div>';
      const start = performance.now()
      const btn = document.getElementById("start")
      btn.addEventListener('click', () => {
				display_element.innerHTML = '';
				this.jsPsych.finishTrial({rt: performance.now() - start});
      })
    }
  }
  jsConsentDecPlugin.info = info;
  return jsConsentDecPlugin;
})(jsPsychModule);
