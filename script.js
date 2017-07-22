var pokemon = [];
var gameList = [];
var winners = [];
var topGridImgArray = document.querySelectorAll('#grid img');
var started = false;
var total = 0;
var row = 0
var left;
var right;
var list_data = {
	all : {
		id : 0,
		first : 1,
		last : 802
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
		last : 802
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
    //var shiny = document.getElementById("shiny").checked;
    

    if (!(all || g1 || g2 || g3 || g4 || g5 || g6 || g7)){
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
            if (j){
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
    $('#grid').show();
    total = gameList.length;
    max = gameList.length;
    $('#remaining').text(max-total)
    $('#total').text(max)
    generate();
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

function clicked(side){
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
        /*var file = new File([""],"pokemon.txt");
        var reader = new FileReader();
        reader.onload = function(progressEvent){
            // Entire file
            alert(this.result);

            // By lines
            var lines = this.result.split('\n');
            alert(lines);
            for(var line = 0; line < lines.length; line++){
                //console.log(lines[line]);
            }
        };
        reader.readAsText(file);*/
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
				if (Number == 802){
					started = true;
				}
				i++;
				var Name = text[i].replace('Name=','');
				i++;
				var MugImage = path + text[i].replace('InternalName=','').toLowerCase() + '.gif';
				i++;
				var Type1 = text[i].replace('Type1=','').replace(" ","").trim();
				i++;
				if (text[i][0] == "T"){
					var Type2 = text[i].replace('Type2=','').replace(' ','').trim();
				}
				else {
					Type2 = "";
				}
				pokemon.push({Number: Number, Name: Name, MugImage: MugImage, Type1: Type1, Type2: Type2});
			}
			i++;
		}
		//alert(pokemon[0]["Type1"]);
		filter();
    }
}
