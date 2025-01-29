var valinp = document.getElementsByClassName("pflicht");
var errors = document.getElementById("errcont");
var pw = "Bitte geben Sie ein Passwort ein.";
var ml = "Bitte füllen Sie das Feld E-Mail aus.";
var pr = false;
var zeit;
var trap = document.getElementById("falle");

//Tastaturfalle
function caught() {
  console.log("CAUGHT");
  setTimeout("trap.focus();", 0);
};

//Formularvalidieung
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
    errors.innerHTML = "<h4>Es sind Fehler aufgetreten:</h4><ul><li><a id=\"lnk1\" href=\"#inp3\">" + pw + "</a></li></ul>";
    errors.style.padding ="6px";
    document.getElementById("erp").style.display = "block";
    document.getElementById("erm").style.display = "none";
    document.getElementById("inp3").removeAttribute("aria-describedby");
    document.getElementById("inp2").removeAttribute("aria-describedby");
    document.getElementById("inp3").setAttribute("aria-describedby", "erp");
    document.getElementById("lnk1").focus();
  }

  if (valmail == "" && valpass !== "") {
    console.log("Email fehlt");
    errors.innerHTML = "<h4>Es sind Fehler aufgetreten:</h4><ul><li><a id=\"lnk2\" href=\"#inp2\">" + ml + "</a></li></ul>";
    errors.style.padding ="6px";
    document.getElementById("erp").style.display = "none";
    document.getElementById("erm").style.display = "block";
    document.getElementById("inp2").removeAttribute("aria-describedby");
    document.getElementById("inp3").removeAttribute("aria-describedby");
    document.getElementById("inp2").setAttribute("aria-describedby", "erm");
    document.getElementById("lnk2").focus();
  }

  if (valmail == "" && valpass == "") {
    console.log("Email und Passwort fehlt");
    errors.innerHTML = "<h4>Es sind Fehler aufgetreten:</h4><ul><li><a id=\"lnk1\" href=\"#inp2\">" + ml + "</a></li><li><a id=\"lnk2\" href=\"#inp3\">" + pw + "</a></li></ul>";
    errors.style.padding ="6px";
    document.getElementById("erp").style.display = "block";
    document.getElementById("erm").style.display = "block";
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
  document.getElementById("pgt").innerHTML = "Formular erfolgreich abgesendet - Formularelemente - Screenreaderausgaben";
}

// Favorit speichern
function favorit() {
  pr = !pr;
  document.getElementById("star").setAttribute("aria-pressed", pr);
  if (pr == true) {
    document.getElementById("rate").setAttribute("src", "Zusatzdateien/StarFilled.svg");
    document.getElementById("favorit").innerHTML = "Die Seite der Pfennigparade ist als Favorit gesetzt.";
    clearTimeout(zeit);
    zeit = setTimeout(statusleer, 12000);

  }
  if (pr == false) {
    document.getElementById("rate").setAttribute("src", "Zusatzdateien/Star.svg");
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

/*
         *   This content is licensed according to the W3C Software License at
         *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
         *
         *   File:   sortable-table.js
         *
         *   Desc:   Adds sorting to a HTML data table that implements ARIA Authoring Practices
         */


'use strict';

class SortableTable {
  constructor(tableNode) {
    this.tableNode = tableNode;

    this.columnHeaders = tableNode.querySelectorAll('thead th');

    this.sortColumns = [];

    for (var i = 0; i < this.columnHeaders.length; i++) {
      var ch = this.columnHeaders[i];
      var buttonNode = ch.querySelector('button');
      if (buttonNode) {
        this.sortColumns.push(i);
        buttonNode.setAttribute('data-column-index', i);
        buttonNode.addEventListener('click', this.handleClick.bind(this));
      }
    }

    this.optionCheckbox = document.querySelector(
      'input[type="checkbox"][value="show-unsorted-icon"]'
    );

    if (this.optionCheckbox) {
      this.optionCheckbox.addEventListener(
        'change',
        this.handleOptionChange.bind(this)
      );
      if (this.optionCheckbox.checked) {
        this.tableNode.classList.add('show-unsorted-icon');
      }
    }
  }

  setColumnHeaderSort(columnIndex) {
    if (typeof columnIndex === 'string') {
      columnIndex = parseInt(columnIndex);
    }

    for (var i = 0; i < this.columnHeaders.length; i++) {
      var ch = this.columnHeaders[i];
      var buttonNode = ch.querySelector('button');
      if (i === columnIndex) {
        var value = ch.getAttribute('aria-sort');
        if (value === 'descending') {
          ch.setAttribute('aria-sort', 'ascending');
          this.sortColumn(
            columnIndex,
            'ascending',
            ch.classList.contains('num', 'aria-live')
          );
        } else {
          ch.setAttribute('aria-sort', 'descending');
          this.sortColumn(
            columnIndex,
            'descending',
            ch.classList.contains('num', 'aria-live')
          );
        }
      } else {
        if (ch.hasAttribute('aria-sort') && buttonNode) {
          ch.removeAttribute('aria-sort');
        }
      }
    }
  }

  sortColumn(columnIndex, sortValue, isNumber) {
    function compareValues(a, b) {
      if (sortValue === 'ascending') {
        if (a.value === b.value) {
          return 0;
        } else {
          if (isNumber) {
            return a.value - b.value;
          } else {
            return a.value < b.value ? -1 : 1;
          }
        }
      } else {
        if (a.value === b.value) {
          return 0;
        } else {
          if (isNumber) {
            return b.value - a.value;
          } else {
            return a.value > b.value ? -1 : 1;
          }
        }
      }
    }

    if (typeof isNumber !== 'boolean') {
      isNumber = false;
    }

    var tbodyNode = this.tableNode.querySelector('tbody');
    var rowNodes = [];
    var dataCells = [];

    var rowNode = tbodyNode.firstElementChild;

    var index = 0;
    while (rowNode) {
      rowNodes.push(rowNode);
      var rowCells = rowNode.querySelectorAll('th, td');
      var dataCell = rowCells[columnIndex];

      var data = {};
      data.index = index;
      data.value = dataCell.textContent.toLowerCase().trim();
      if (isNumber) {
        data.value = parseFloat(data.value);
      }
      dataCells.push(data);
      rowNode = rowNode.nextElementSibling;
      index += 1;
    }

    dataCells.sort(compareValues);

    // remove rows
    while (tbodyNode.firstChild) {
      tbodyNode.removeChild(tbodyNode.lastChild);
    }

    // add sorted rows
    for (var i = 0; i < dataCells.length; i += 1) {
      tbodyNode.appendChild(rowNodes[dataCells[i].index]);
    }
  }

  /* EVENT HANDLERS */

  handleClick(event) {
    var tgt = event.currentTarget;
    this.setColumnHeaderSort(tgt.getAttribute('data-column-index'));
  }

  handleOptionChange(event) {
    var tgt = event.currentTarget;

    if (tgt.checked) {
      this.tableNode.classList.add('show-unsorted-icon');
    } else {
      this.tableNode.classList.remove('show-unsorted-icon');
    }
  }
}

// Initialize sortable table buttons
window.addEventListener('load', function () {
  var sortableTables = document.querySelectorAll('table.sortable');
  for (var i = 0; i < sortableTables.length; i++) {
    new SortableTable(sortableTables[i]);
  }
});


