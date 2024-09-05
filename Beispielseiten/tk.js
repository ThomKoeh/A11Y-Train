var valinp = document.getElementsByClassName("pflicht");
var errors = document.getElementById("errcont");
var pw = "Bitte geben Sie ein Passwort ein.";
var ml = "Bitte füllen Sie das Feld E-Mail aus.";
var pr = false;
var zeit;
var trap = document.getElementById("falle");

function caught() {
	console.log("CAUGHT");
	setTimeout("trap.focus();", 0);
};

function validate() {
	console.log("Funktion Status aufgerufen");
	valmail = valinp[0].value;
	valpass = valinp[1].value;

	if (valmail && valpass !== "") {
		console.log("Erfolg");
		erfolg();
	}

	if (valmail !== "" && valpass == "") {
		console.log("Passwort fehlt");
		errors.innerHTML = "<h3>Es sind Fehler aufgetreten:</h3><ul><li><a id=\"lnk1\" href=\"#inp3\">" + pw + "</a></li></ul>";
		document.getElementById("erp").style.display ="block";
		document.getElementById("erm").style.display ="none";
		document.getElementById("inp3").removeAttribute("aria-describedby");
		document.getElementById("inp2").removeAttribute("aria-describedby");
		document.getElementById("inp3").setAttribute("aria-describedby", "erp");
		document.getElementById("lnk1").focus();
	}

	if (valmail == "" && valpass !== "") {
		console.log("Email fehlt");
		errors.innerHTML = "<h3>Es sind Fehler aufgetreten:</h3><ul><li><a id=\"lnk2\" href=\"#inp2\">" + ml + "</a></li></ul>";
		document.getElementById("erp").style.display ="none";
		document.getElementById("erm").style.display ="block";
		document.getElementById("inp2").removeAttribute("aria-describedby");
		document.getElementById("inp3").removeAttribute("aria-describedby");
		document.getElementById("inp2").setAttribute("aria-describedby", "erm");
		document.getElementById("lnk2").focus();
	}

	if (valmail == "" && valpass == "") {
		console.log("Email und Passwort fehlt");
		errors.innerHTML = "<h3>Es sind Fehler aufgetreten:</h3><ul><li><a id=\"lnk1\" href=\"#inp2\">" + ml + "</a></li><li><a id=\"lnk2\" href=\"#inp3\">" + pw + "</a></li></ul>";
		document.getElementById("erp").style.display ="block";
		document.getElementById("erm").style.display ="block";
		document.getElementById("inp2").removeAttribute("aria-describedby");
		document.getElementById("inp3").removeAttribute("aria-describedby");
		document.getElementById("inp2").setAttribute("aria-describedby", "erm");
		document.getElementById("inp3").setAttribute("aria-describedby", "erp");
		document.getElementById("lnk1").focus();
		
	}
}

function erfolg() {
	maincont.setAttribute("aria-live", "assertive");
	document.getElementById("maincont").innerHTML = "<p id=\"success\">Das Formular wurde übermittelt. Sie müssen nun die Seite neu laden.</p>";
}

function favorit() {
	pr = !pr;
	document.getElementById("star").setAttribute("aria-pressed", pr);
	if (pr == true) {
		document.getElementById("rate").setAttribute("src", "StarFilled.svg");
   	document.getElementById("favorit").innerHTML = "Die Seite der Pfennigparade ist als Favorit gesetzt.";
		clearTimeout(zeit);
		zeit = setTimeout(statusleer, 12000);

	}
	if (pr == false) {
		document.getElementById("rate").setAttribute("src", "Star.svg");
    document.getElementById("favorit").innerHTML = "Die Seite der Pfennigparade wurde aus den Favoriten entfernt.";
		clearTimeout(zeit);
		zeit = setTimeout(statusleer, 12000);
	}
}

function statusleer() {
	document.getElementById("favorit").innerHTML = "";
}

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   radio.js
 *
 *   Desc:   Radio group widget that implements ARIA Authoring Practices
 */

'use strict';

class RadioGroup {
  constructor(groupNode) {
    this.groupNode = groupNode;

    this.radioButtons = [];

    this.firstRadioButton = null;
    this.lastRadioButton = null;

    var rbs = this.groupNode.querySelectorAll('[role=radio]');

    for (var i = 0; i < rbs.length; i++) {
      var rb = rbs[i];

      rb.tabIndex = -1;
      rb.setAttribute('aria-checked', 'false');

      rb.addEventListener('keydown', this.handleKeydown.bind(this));
      rb.addEventListener('click', this.handleClick.bind(this));
      rb.addEventListener('focus', this.handleFocus.bind(this));
      rb.addEventListener('blur', this.handleBlur.bind(this));

      this.radioButtons.push(rb);

      if (!this.firstRadioButton) {
        this.firstRadioButton = rb;
      }
      this.lastRadioButton = rb;
    }
    this.firstRadioButton.tabIndex = 0;
  }

  setChecked(currentItem) {
    for (var i = 0; i < this.radioButtons.length; i++) {
      var rb = this.radioButtons[i];
      rb.setAttribute('aria-checked', 'false');
      rb.tabIndex = -1;
    }
    currentItem.setAttribute('aria-checked', 'true');
    currentItem.tabIndex = 0;
    currentItem.focus();
  }

  setCheckedToPreviousItem(currentItem) {
    var index;

    if (currentItem === this.firstRadioButton) {
      this.setChecked(this.lastRadioButton);
    } else {
      index = this.radioButtons.indexOf(currentItem);
      this.setChecked(this.radioButtons[index - 1]);
    }
  }

  setCheckedToNextItem(currentItem) {
    var index;

    if (currentItem === this.lastRadioButton) {
      this.setChecked(this.firstRadioButton);
    } else {
      index = this.radioButtons.indexOf(currentItem);
      this.setChecked(this.radioButtons[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  handleKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case ' ':
        this.setChecked(tgt);
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
      case 'Left':
      case 'ArrowLeft':
        this.setCheckedToPreviousItem(tgt);
        flag = true;
        break;

      case 'Down':
      case 'ArrowDown':
      case 'Right':
      case 'ArrowRight':
        this.setCheckedToNextItem(tgt);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick(event) {
    this.setChecked(event.currentTarget);
  }

  handleFocus(event) {
    event.currentTarget.classList.add('focus');
  }

  handleBlur(event) {
    event.currentTarget.classList.remove('focus');
  }
}

// Initialize radio button group
window.addEventListener('load', function () {
  var radios = document.querySelectorAll('[role="radiogroup"]');
  for (var i = 0; i < radios.length; i++) {
    new RadioGroup(radios[i]);
  }
});
