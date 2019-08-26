var pokemon = [];
var gameList = [];
var winners = [];
var ranklist = [];
var lList = [];
var rList = [];
var newpoke;
var oldpoke;
var topGridImgArray = document.querySelectorAll('#grid img');
var started = false;
var total = 0;
var row = 0
var left;
var right;
var ranked;
var list_data = {
	all : {
		id : 0,
		first : 1,
		last : 807
	},
	gen1 : {
		id : 1,
		first : 1,
		last : 151
	},
	gen2 : {
		id: 2,
		first : 152,
		last : 251
	},
	gen3 : {
		id : 3,
		first : 252,
		last : 386
	},
	gen4 : {
		id : 4,
		first : 387,
		last : 493
	},
	gen5 : {
		id : 5,
		first : 494,
		last : 649
	},
	gen6 : {
		id : 6,
		first : 650,
		last : 721
	},
	gen7 : {
		id : 7,
		first : 722,
		last : 807
	},
	test: {
		id : 8,
		first : 1,
		last : 12
	}

};

function filter(){
    var all = document.getElementById("gen-all").checked;
    var g1 = document.getElementById("gen1").checked;
    var g2 = document.getElementById("gen2").checked;
    var g3 = document.getElementById("gen3").checked;
    var g4 = document.getElementById("gen4").checked;
    var g5 = document.getElementById("gen5").checked;
    var g6 = document.getElementById("gen6").checked;
    var g7 = document.getElementById("gen7").checked;
    var forms = document.getElementById("forms").checked;
    var mega = document.getElementById("mega").checked;
    ranked = document.getElementById("ranking").checked;
    //var shiny = document.getElementById("shiny").checked;
    

    if (!(all || g1 || g2 || g3 || g4 || g5 || g6 || g7 || mega)){
        alert("At least one checkbox must be selected!");
        return;
    }
    var j;
	var type = $("#types").val().trim();
    for (var i = 0; i < pokemon.length; i++){
        j = false;
		//alert(pokemon[i]["Type1"] == type);
        if ((type == "All") || (pokemon[i]["Type1"] == type) || (pokemon[i]["Type2"] == type)){
            if (all){
                j = true;
            }
            else if (g1 && (pokemon[i]["Number"] >= list_data["gen1"].first) && (pokemon[i]["Number"] <= list_data["gen1"].last)){
                j = true;
            }
            else if (g2 && (pokemon[i]["Number"] >= list_data["gen2"].first) && (pokemon[i]["Number"] <= list_data["gen2"].last)){
                j = true;
            }
            else if (g3 && (pokemon[i]["Number"] >= list_data["gen3"].first) && (pokemon[i]["Number"] <= list_data["gen3"].last)){
                j = true;
            }
            else if (g4 && (pokemon[i]["Number"] >= list_data["gen4"].first) && (pokemon[i]["Number"] <= list_data["gen4"].last)){
                j = true;
            }
            else if (g5 && (pokemon[i]["Number"] >= list_data["gen5"].first) && (pokemon[i]["Number"] <= list_data["gen5"].last)){
                j = true;
            }
            else if (g6 && (pokemon[i]["Number"] >= list_data["gen6"].first) && (pokemon[i]["Number"] <= list_data["gen6"].last)){
                j = true;
            }
            else if (g7 && (pokemon[i]["Number"] >= list_data["gen7"].first) && (pokemon[i]["Number"] <= list_data["gen7"].last)){
                j = true;
            }
            if (j && (pokemon[i]["Mega"] == mega)){
                if (forms || (!forms && !pokemon[i]["Form"]))
                gameList.push(pokemon[i]);
            }
        }
    }

    /*var str;
    for (i = 0; i < gameList.length; i++){
        str = str + '\n' + gameList[i].Name;
    }
    alert(str);*/
    $('#settings').hide();
    total = gameList.length;
    max = gameList.length;
    $('#remaining').text(max-total)
    $('#total').text(max)
    if (ranked){
        $('#button-skip').hide();
        newpoke = gameList[Math.floor(Math.random() * gameList.length)];
        gameList.remove(newpoke)
        oldpoke = gameList[Math.floor(Math.random() * gameList.length)];
        gameList.remove(oldpoke)
        ranklist.push(oldpoke);
        gen_ranked();
    } else {
        $('#grid').show();
        generate();
    }
}

function gen_ranked(){
    $('#pic1').attr("src", newpoke["MugImage"]);
    $('#pic2').attr("src", oldpoke["MugImage"]);
    var txt = "";
    for (var i = 1; i < ranklist.length + 1; i++){
        txt = txt + i.toString() + ". " + ranklist[i - 1]["Name"] + "<br>";
    }
    $('#ranks').html(txt);
}

function generate(){
    left = gameList[Math.floor(Math.random() * gameList.length)];
    right = gameList[Math.floor(Math.random() * gameList.length)];
    if (total > 1){
        while (right == left){
            right = gameList[Math.floor(Math.random() * gameList.length)];
        }
    }
    //$('#text1').text(left["Name"]);
    //$('#text2').text(right["Name"]);
    $('#pic1').attr("src", left["MugImage"]);
    $('#pic2').attr("src", right["MugImage"]);
}

function clicked_ranked(side){
    if (side == 1){
        if (lList.length == 0){
            ranklist.splice(ranklist.indexOf(oldpoke),0,newpoke);
            newpoke = gameList[Math.floor(Math.random() * gameList.length)];
            gameList.remove(newpoke);
            var center = Math.round((ranklist.length - 1) / 2);
            oldpoke = ranklist[center];
            rList = ranklist.slice(center + 1, ranklist.length);
            lList = ranklist.slice(0,center);
            gen_ranked()
        } else {
            var center = Math.round((lList.length - 1) / 2);
            oldpoke = lList[center];
            rList = lList.slice(center + 1, lList.length);
            lList = lList.slice(0,center);
            gen_ranked()
        }
    }
    else if (side == 2){
        if (rList.length == 0){
            ranklist.splice(ranklist.indexOf(oldpoke) + 1,0,newpoke);
            newpoke = gameList[Math.floor(Math.random() * gameList.length)];
            gameList.remove(newpoke);
            var center = Math.round((ranklist.length - 1) / 2);
            oldpoke = ranklist[center];
            rList = ranklist.slice(center + 1, ranklist.length);
            lList = ranklist.slice(0,center);
            gen_ranked()
        } else {
            var center = Math.round((rList.length - 1) / 2);
            oldpoke = rList[center];
            lList = rList.slice(0,center);
            rList = rList.slice(center + 1, rList.length);
            gen_ranked()
        }
    }
}

function clicked(side){
    if (ranked){
        clicked_ranked(side);
        return;
    }
    var entry;
    if (side == 1) {
        winners.push(left);
        entry = right;
        total -= 1;
    }
    else if (side == 2){
        winners.push(right);
        entry = left;
        total -= 1;
    }
    else if (side == 3){
        winners.push(left);
        winners.push(right);
    }
    else {
        total -= 2;
    }
    if (total <= Math.floor(max / 2)){
        //$('#neither').hide();
    }
    if ((total < 10) && (side != 3)){
        $("#i" + total.toString()).attr('src',entry["MugImage"]);
    }
    gameList.splice(gameList.indexOf(left), 1);
    gameList.splice(gameList.indexOf(right), 1);
    if (total <= 0){
        $('#leftButton').prop("disabled", true);
        $('#rightButton').prop("disabled", true);
    }
    //$('#count').text((max - total) + '/' + max + ' Eliminated');
    $('#remaining').text(max-total);
    $('#total').text(max);
    if (gameList.length <= 1){
        if (gameList.length == 1){
            winners.push(gameList[0]);
        }
        gameList = winners;
        winners = [];
    }
    generate();
}

readStringFromFileAtPath = function(pathOfFileToReadFrom)
{
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToReadFrom, false);
	request.send(null);
	var returnValue = request.responseText;

	return returnValue;
}

function getPokemon(num){
    if (started){
        clicked(num);
    }
    else {
		var text = readStringFromFileAtPath ("pokemon.txt");
		text = text.split('\n');
		var i = 0;
		var path = 'regular/';
		if (document.getElementById("shiny").checked){
			path = 'shiny/';
		}
		while (!started){
			if (text[i][0] == '['){
				var Number = parseInt(text[i].replace('[','').replace(']',''));
				if (Number == 807){
					started = true;
				}
				i++;
				var NameForm = text[i].replace('Name=','').split(',');
                var Name = NameForm[0];
                Nameform = NameForm.shift();
				i++;
                var intName = text[i].replace('InternalName=','').toLowerCase();
				var MugImage = path + intName + '.gif';
				i++;
				var Type1 = text[i].replace('Type1=','').replace(" ","").trim();
				i++;
				if (text[i][0] == "T"){
					var Type2 = text[i].replace('Type2=','').replace(' ','').trim();
				}
				else {
					Type2 = "";
				}
				pokemon.push({Number: Number, Name: Name, MugImage: MugImage, Type1: Type1, Type2: Type2, Form: false, Mega: false});
                if (NameForm.length > 0){
                    for (var j=0; j < NameForm.length; j++){
                        if (NameForm[j].search('mega') != -1){
                            pokemon.push({Number: 666, Name: Name, MugImage: path + intName + '-' + NameForm[j] + '.gif', Type1: Type1, Type2: Type2, Form: false, Mega: true});
                        }
                        else if (NameForm[j].search('alola') != -1){
                            pokemon.push({Number: 800, Name: Name, MugImage: path + intName + '-' + NameForm[j] + '.gif', Type1: Type1, Type2: Type2, Form: true, Mega: false});
                        }
                        else {
                            pokemon.push({Number: Number, Name: Name, MugImage: path + intName + '-' + NameForm[j] + '.gif', Type1: Type1, Type2: Type2, Form: true, Mega: false});
                        }
                    }
                }
			}
			i++;
		}
		//alert(pokemon[0]["Type1"]);
		filter();
    }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
