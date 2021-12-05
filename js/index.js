const dice = ["w4", "W6", "W8", "W10", "W12", "W20"];

class Monster {
  constructor(name, tags, atkName, atkDmg, atkRange, atkTag, hp, armor, specialTags, instinct, moves) {
    this.name = name;
    this.tags = tags;
    this.atkDmg = atkDmg;
    this.atkRange = atkRange;
    this.atkTag = atkTag;
    this.hp = hp;
    this.armor = armor;
    this.specialTags = specialTags;
    this.instinct = instinct;
    this.moves = moves;
  }

  input() {
    this.name = getName();
    this.tags = getTags();
    this.atkName = getAtkName();
    this.atkDmg = getAtkDmg();
    this.atkRange = getAtkRange();
    this.atkTag = getAtkTag();
    this.hp = getHp();
    this.armor = getArmor();
    this.specialTags = getSpecialTags();
    this.instinct = getInstinct();
    this.moves = getMoves(); //returns array!
  }

  output() {
    $(".monsterName").text(this.name);
    $(".tags").text(this.tags);
    $(".atkName").text(this.atkName);
    $(".atkDmg").text(this.atkDmg);
    $(".atkRange").text(this.atkRange);
    $(".atkTag").text(this.atkTag);
    $(".hitPoints").text(this.hp);
    $(".armor").text(this.armor);
    $(".specialTags").text(this.specialTags);
    $(".instinctOutput").text(this.instinct);
    $(".move1").text(this.moves[0]);
    for (let i = 1; i < this.moves.length; i++) {
      let appendMove = "<li>" + this.moves[i] + "</li>";
      $(".moveOutput").append(appendMove);
    }
  }
}

function getName() {
  return $("#monsterNameInput").val();
}

function getTags() {
  let tags = "";

  if ($("#grpRadio1").prop("checked")) {
    tags = tags + "Horde";
  } else if ($("#grpRadio2").prop("checked")) {
    tags = tags + "Gruppe";
  } else if ($("#grpRadio3").prop("checked")) {
    tags = tags + "Einzelgänger";
  }

  if ($("#sizRadio1").prop("checked")) {
    tags = tags + ", Winzig";
  } else if ($("#sizRadio2").prop("checked")) {
    tags = tags + ", Klein";
  } else if ($("#sizRadio3").prop("checked")) {
    tags = tags + "";
  } else if ($("#sizRadio4").prop("checked")) {
    tags = tags + ", Groß";
  } else if ($("#sizRadio5").prop("checked")) {
    tags = tags + ", Riesig";
  }

  if ($("#defRadio5").prop("checked")) {
    tags = tags + ", Magisch";
  }

  if ($("#godsCheck").prop("checked")) {
    tags = tags + ", Göttlich";
  }

  if (!$("#defRadio5").prop("checked") && $("#magicCheck").prop("checked")) {
    tags = tags + ", Magisch";
  }

  if ($("#deceitfulCheck").prop("checked")) {
    tags = tags + ", Verschlagen";
  }

  if ($("#grpCheck").prop("checked")) {
    tags = tags + ", Organisiert";
  }

  if ($("#intelCheck").prop("checked")) {
    tags = tags + ", Intelligent";
  }

  if ($("#shieldCheck").prop("checked")) {
    tags = tags + ", Vorsichtig";
  }

  if ($("#hoardCheck").prop("checked")) {
    tags = tags + ", Sammler";
  }

  if ($("#externarCheck").prop("checked")) {
    tags = tags + ", Externar";
  }

  if ($("#terribleCheck").prop("checked")) {
    tags = tags + ", Furchterregend";
  }

  if ($("#amorphousCheck").prop("checked")) {
    tags = tags + ", Amorph";
  }
  return tags
}

function getAtkName() {
  return $("#atkTypeInput").val();
}

function getAtkDmg() {

  let diceNum = 0;
  // number in array associated with correct die
  //1=D4, 2=D6 3=D8 4=D10 5=D12 6=D20
  let dmgBonus = 0;
  let doubleDmg = 0;
  // if doubleDmg > 0: better of 2 dice
  // if doubleDmg < 0: worse of 2 dice

  if ($("#grpRadio1").prop("checked")) {
    diceNum = 2;
  } else if ($("#grpRadio2").prop("checked")) {
    diceNum = 3;
  } else if ($("#grpRadio3").prop("checked")) {
    diceNum = 4;
  }

  if ($("#sizRadio1").prop("checked")) {
    dmgBonus -= 2;
  } else if ($("#sizRadio4").prop("checked")) {
    dmgBonus += 1;
  } else if ($("#sizRadio5").prop("checked")) {
    dmgBonus += 3;
  }

  if ($("#strCheck").prop("checked")) {
    dmgBonus += 2;
  }

  if ($("#skilledAtkCheck").prop("checked")) {
    doubleDmg += 1;
  }

  if ($("#godsCheck").prop("checked") && ($("#godsRadio1").prop("checked") || $("#godsRadio3").prop("checked"))) {
    dmgBonus += 2;
  }

  if ($("#cruelWeaponCheck").prop("checked")) {
    dmgBonus += 2;
  }

  if ($("#smallWeaponCheck").prop("checked")) {
    diceNum -= 1;
  }

  if ($("#deceitfulCheck").prop("checked")) {
    diceNum -= 1;
  }

  if ($("#oldCheck").prop("checked")) {
    diceNum += 1;
  }

  if ($("#pacifistCheck").prop("checked")) {
    doubleDmg -= 1;
  }

  if (diceNum > 6) {
    diceNum = 6;
  } else if (diceNum < 1) {
    diceNum = 1;
  }
  //make sure DiceNum is min 1 max 6

  if (doubleDmg > 0) {
    var damage = "b[" + dice[diceNum - 1] + "]";
  } else if (doubleDmg < 0) {
    var damage = "s[" + dice[diceNum - 1] + "]";
  } else {
    var damage = dice[diceNum - 1];
  }

  if (dmgBonus > 0) {
    damage = damage + "+" + dmgBonus;
  } else if (dmgBonus < 0) {
    damage = damage + "-" + Math.abs(dmgBonus);
  }

  return damage
}

function getAtkRange() {
  let hand = false;
  let close = false;
  let reach = false;
  let short = false;
  let long = false;
  let range = ""

  if ($("#sizRadio1").prop("checked")) {
    hand = true;
  } else if ($("#sizRadio2").prop("checked") || $("#sizRadio3").prop("checked")) {
    close = true;
  } else if ($("#sizRadio4").prop("checked")) {
    close = true;
    reach = true;
  } else if ($("#sizRadio5").prop("checked")) {
    reach = true;
  }

  if ($("#distanceWeaponCheck").prop("checked")) {
    reach = true;
  }

  if ($("#rangedCheck").prop("checked")) {
    if ($("#rangedRadio1").prop("checked") || $("#rangedRadio3").prop("checked")) {
      short = true;
    }
    if ($("#rangedRadio2").prop("checked") || $("#rangedRadio3").prop("checked")) {
      long = true;
    }
  }

  if (hand) {
    range = range + ", Hand";
  }
  if (close) {
    range = range + ", kurz";
  }
  if (reach) {
    range = range + ", lang"
  }
  if (short) {
    range = range + ", nah"
  }
  if (long) {
    range = range + ", fern";
  }
  return range;
}

function getAtkTag() {
  let atkTags = "";
  let piercing = 0;
  let str = false;
  let ignore = false;

  if ($("#strCheck").prop("checked")) {
    str = true;
  }

  if ($("#deftStrikeCheck").prop("checked")) {
    piercing += 1;
  }

  if ($("#metalCheck").prop("checked")) {
    if ($("#metalRadio1").prop("checked")) {
      piercing += 1;
    }
    if ($("#metalRadio2").prop("checked")) {
      piercing += 3;
    }
  }

  if ($("#ignoreWeaponCheck").prop("checked")) {
    ignore = true;
  }

  if (str) {
    atkTags = atkTags + ", wuchtig"
  }
  if (ignore) {
    atkTags = atkTags + ", ignoriert Rüstung"
  } else if (piercing > 0) {
    atkTags = atkTags + ", Durchdringung " + piercing;
  }

  return atkTags
}

function getHp() {
  let hp = 0

  if ($("#grpRadio1").prop("checked")) {
    hp = 3;
  } else if ($("#grpRadio2").prop("checked")) {
    hp = 6;
  } else if ($("#grpRadio3").prop("checked")) {
    hp = 12;
  }

  if ($("#sizRadio4").prop("checked")) {
    hp += 4;
  } else if ($("#sizRadio5").prop("checked")) {
    hp += 8;
  }

  if ($("#endurCheck").prop("checked")) {
    hp += 4;
  }

  if ($("#godsCheck").prop("checked") && ($("#godsRadio2").prop("checked") || $("#godsRadio3").prop("checked"))) {
    hp += 2;
  }

  if ($("#unliveCheck").prop("checked")) {
    hp += 4;
  }

  if ($("#amorphousCheck").prop("checked")) {
    hp += 3;
  }

  return hp;
}

function getArmor() {
  let arm = 0;

  if ($("#defRadio2").prop("checked")) {
    arm += 1;
  } else if ($("#defRadio3").prop("checked")) {
    arm += 2;
  } else if ($("#defRadio4").prop("checked")) {
    arm += 3;
  } else if ($("#defRadio5").prop("checked")) {
    arm += 4;
  }

  if ($("#skilledDefCheck").prop("checked")) {
    arm += 1;
  }

  if ($("#shieldCheck").prop("checked")) {
    arm += 1;
  }

  if ($("#amorphousCheck").prop("checked")) {
    arm += 1;
  }

  return arm;
}

function getSpecialTags() {
  let spec = "";

  if ($("#adaptationCheck").prop("checked")) {
    spec = spec + ", " + $("#adaptationInput").val();
  }

  if ($("#constructCheck").prop("checked")) {
    if ($("#constructInput1").val() !== ""){
    spec = spec + ", " + $("#constructInput1").val();
    }
    if ($("#constructInput2").val() !== "") {
    spec = spec + ", " + $("#constructInput2").val();
    }
  }

  if ($("#terribleCheck").prop("checked")) {
    spec = spec + ", " + $("#terribleInput").val();
  }

  spec = spec.slice(2);
  return spec;
}

function getInstinct() {
  inst = $("#instinctInput").val();
  return inst;
}

function getMoves() {
  let mov = [];

  mov.push($("#moveInput").val())
  //add first move to array mov

  var othMov = ["trickery", "magic", "deceitful", "grp", "externar"];

  for (let y of othMov) {
    if ($("#" + y + "Check").prop("checked")) {
      mov.push($("#" + y + "Input").val());
    }
  }
  //add further moves from html to array mov

  return mov; //returns array
}

function checkEmpty() {
  missing = "";

  missing = checkAlwaysOnTexts() + checkCheckedTexts()

  //add all missing input field tag names to string "missing"
  //use for loops on the 4 arrays for types of inputs
  //make helper functions to check for these

  console.log("empty fields: " + missing)
  if (missing !== "") {
    return true;
  } else {
    return false;
  }
  //returns false if a required field is not filled
}

function checkAlwaysOnTexts() {
  let missing = "";
  var alwaysOnTexts = ["#moveInput", "#instinctInput", "#atkTypeInput", "#monsterNameInput"];
  for (let x of alwaysOnTexts) {
    if ($(x).val() === "") {
      missing = missing + x + ", ";
    }
  }
  return missing
}

function checkCheckedTexts() {
  let missing = "";
  var checkedTexts = ["#trickery", "#adaptation", "#magic", "#deceitful", "#grp", "#externar", "#construct", "#terrible"];
  //to be used with +"Check" AND +"Input"
  for (let x of checkedTexts) {
    if ($(x + "Check").prop("checked")) {
      if (x === "#construct" && $("#constructInput1").val() === "" && $("#constructInput2").val() === "") {
        missing = missing + x + "Input" + ", ";
      } else if ($(x + "Input").val() === "") {
        missing = missing + x + "Input" + ", ";
      }
    }
  }
  return missing
}

//hide empty results before calculation:
$(".outputBox").hide();


//eventlisteners:

$("#createBtn").click(function() {
  if (checkEmpty()) {
    alert("Nicht alle notwendigen Felder sind ausgefüllt.")
  } else {
    newMon = new Monster;
    newMon.input();
    newMon.output();
    $(".controlsBox").hide();
    $(".outputBox").show();
  }
})

//HIDING AND UNHIDING DIVS BEHIND INPUTS:

var checkedDivs = ["trickery", "adaptation", "gods", "magic", "metal", "ranged", "deceitful", "grp", "externar", "construct", "terrible"];
for (let x of checkedDivs) {
  $("." + x + "Div").hide();
}
//initially hide text behind checkboxes
for (let x of checkedDivs) {
  $("#" + x + "Check").click(function() {
    $("." + x + "Div").toggle();
  })
}
//toggle hiding unhiding text behind checkboxes
