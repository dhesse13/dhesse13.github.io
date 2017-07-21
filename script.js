var pokemon = [];
var gameList = [];
var winners = [];
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
    var shiny = document.getElementById("shiny").checked;
    

    if (!(all || g1 || g2 || g3 || g4 || g5 || g6 || g7)){
        alert("At least one checkbox must be selected!");
        return;
    }
    var j;
    for (var i = 0; i < pokemon.length; i++){
        j = false;
        var type = $("#types").val();
        if ((type == "All") || (type == pokemon["Type1"]) || (type == pokemon["Type2"])){
            if (all){
                j = true;
            }
            else if (g1 && (i >= list_data[gen1].first) && (i <= list_data[gen1].last)){
                j = true;
            }
            else if (g2 && (i >= list_data[gen2].first) && (i <= list_data[gen2].last)){
                j = true;
            }
            else if (g3 && (i >= list_data[gen3].first) && (i <= list_data[gen3].last)){
                j = true;
            }
            else if (g4 && (i >= list_data[gen4].first) && (i <= list_data[gen4].last)){
                j = true;
            }
            else if (g5 && (i >= list_data[gen5].first) && (i <= list_data[gen5].last)){
                j = true;
            }
            else if (g6 && (i >= list_data[gen6].first) && (i <= list_data[gen6].last)){
                j = true;
            }
            else if (g7 && (i >= list_data[gen7].first) && (i <= list_data[gen7].last)){
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
    $('#pkm1').text(left["Name"]);
    $('#pkm2').text(right["Name"]);
    $('#pkm1').children().attr("src", left["MugImage"]);
    $('#pkm2').children().attr("src", right["MugImage"]);
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
        if (row < 5){
            $('#winners2').prepend('<td><div><img alt="Hi" height="256" width="216" src="' + entry["MugImage"] + '"/><br><p style="margin: auto; display: block;">#' + (total + 1) + ': ' + entry["Name"] + '</p></div></td>');
            row++;
        }
        else {
            $('#winners1').prepend('<td><div><img alt="Hi" height="256" width="216" src="' + entry["MugImage"] + '"/><br><p style="margin: auto; display: block;">#' + (total + 1) + ': ' + entry["Name"] + '</p></div></td>');
        }
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

function getPokemon(num){
    if (started){
        clicked(num);
    }
    else {
        var file = "pokemon.txt";
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
        reader.readAsText(file);
        started = true;
    }
}




















function populateWrestlers(){
    wrestlers.push({Name: "Aiden English", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: "images/aidenenglish.png"});
    wrestlers.push({Name: "AJ Styles", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Alberto Del Rio", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Alexa Bliss", Type: "F", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Alicia Fox", Type: "F", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Apollo Crews", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Baron Corbin", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Becky Lynch", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Big Cass", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Big E", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Big Show", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bo Dallas", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Booker T", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "wcw", "hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Braun Strowman", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bray Wyatt", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Brie Bella", Type: "F", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Brock Lesnar", Type: "M", Rosters: ["current", "new", "reality", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bubba Ray Dudley", Type: "M", Rosters: ["current", "new", "reality", "ra", "attitude", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Byron Saxton", Type: "O", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Carmella", Type: "F", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Cathy Kelley", Type: "O", Rosters: ["current","nxt", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Cesaro", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Chad Gable", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Charlotte", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Chris Jericho", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Curtis Axel", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "D-Von Dudley", Type: "M", Rosters: ["current", "new", "reality", "ra", "attitude", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dana Brooke", Type: "F", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Daniel Bryan", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Darren Young", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "David Otunga", Type: "O", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dean Ambrose", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dolph Ziggler", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Rock", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Emma", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Enzo Amore", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Epico", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Erick Rowan", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Eva Marie", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Fandango", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Finn Balor", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Goldust", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Heath Slater", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jack Swagger", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jason Jordan", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "JBL", Type: "M", Rosters: ["pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jerry Lawler", Type: "O", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jey Uso", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jimmy Uso", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "John Cena", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "JoJo", Type: "O", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kalisto", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kane", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Karl Anderson", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kevin Owens", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kofi Kingston", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Konnor", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Lana", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Lilian Garcia", Type: "O", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Luke Gallows", Type: "M", Rosters: ["current", "new", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Luke Harper", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mark Henry", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Maryse", Type: "F", Rosters: ["current", "new", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mauro Ranallo", Type: "O", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Michael Cole", Type: "O", Rosters: ["current", "new", "reality", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mick Foley", Type: "M", Rosters: ["attitude", "ng", "wcw", "hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mojo Rawley", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mr. McMahon", Type: "O", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "ng", "golden"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Naomi", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Natalya", Type: "F", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Neville", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Nia Jax", Type: "F", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Nikki Bella", Type: "F", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Paige", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Paul Heyman", Type: "O", Rosters: ["current", "new", "reality", "ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Primo", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "R-Truth", Type: "M", Rosters: ["current", "new", "reality", "pg", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Randy Orton", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Renee Young", Type: "O", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Roman Reigns", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rosa Mendes", Type: "F", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rusev", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ryback", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sami Zayn", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sasha Banks", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Scott Stanford", Type: "O", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Seth Rollins", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Shane McMahon", Type: "O", Rosters: ["current", "new", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sheamus", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Simon Gotch", Type: "M", Rosters: ["current", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sin Cara", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Stephanie McMahon", Type: "O", Rosters: ["current", "new", "reality", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Summer Rae", Type: "F", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tamina", Type: "F", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Miz", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Titus O'Neil", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tom Phillips", Type: "O", Rosters: ["current","nxt", "new"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tony Chimel", Type: "O", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Triple H", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tyler Breeze", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tyson Kidd", Type: "M", Rosters: ["current", "new", "reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Undertaker", Type: "M", Rosters: ["reality", "pg", "ra", "attitude", "ng", "golden"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Viktor", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Xavier Woods", Type: "M", Rosters: ["current", "new", "reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Zack Ryder", Type: "M", Rosters: ["current", "new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Aliyah", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: 'Andrade Almas', Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Angelo Dawkins", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Asuka", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: "images/asuka.png"});
    wrestlers.push({Name: "Austin Aries", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bayley", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Billie Kay", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Blake", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Buddy Murphy", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Corey Graves", Type: "O", Rosters: ["nxt","current"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dash Wilder", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dasha Fuentes", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Elias Samson", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Greg Hamilton", Type: "O", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Hideo Itami", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Johnny Gargano", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Liv Morgan", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mandy Rose", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "No Way Jose", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Paul Ellering", Type: "O", Rosters: ["nxt", "hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Peyton Royce", Type: "F", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Samoa Joe", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sawyer Fulton", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Scott Dawson", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Shinsuke Nakamura", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tommaso Ciampa", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tye Dillinger", Type: "M", Rosters: ["nxt"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "William Regal", Type: "M", Rosters: ["nxt", "pg", "ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Adam Rose", Type: "M", Rosters: ["reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "AJ Lee", Type: "F", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Aksana", Type: "F", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Alex Riley", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bam Bam Bigelow", Type: "M", Rosters: ["attitude", "ng", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Batista", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Beth Phoenix", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Big Daddy V", Type: "M", Rosters: ["pg", "ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Hugh Morris", Type: "M", Rosters: ["ra", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Billy Gunn", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Billy Kidman", Type: "M", Rosters: ["ra", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Blue Meanie", Type: "M", Rosters: ["ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bob Holly", Type: "M", Rosters: ["ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Boogeyman", Type: "M", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Brad Maddox", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Brian Kendrick", Type: "M", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Brian Pillman", Type: "M", Rosters: ["attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "British Bulldog", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Brodus Clay", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Cameron", Type: "F", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Candice Michelle", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Cherry", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Chris Masters", Type: "M", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Christian", Type: "M", Rosters: ["reality", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Christy Hemme", Type: "F", Rosters: ["ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Chyna", Type: "F", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "CM Punk", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Crash Holly", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Curt Hawkins", Type: "M", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Damien Sandow", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "David Hart Smith", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dawn Marie", Type: "F", Rosters: ["ra", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dean Malenko", Type: "M", Rosters: ["ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Diamond Dallas Page", Type: "M", Rosters: ["ra", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Drew McIntyre", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Eden", Type: "O", Rosters: ["reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "El Torito", Type: "M", Rosters: ["reality"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Evan Bourne", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Eve Torres", Type: "F", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ezekiel Jackson", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Finlay", Type: "M", Rosters: ["pg", "ra", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Gillberg", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Goldberg", Type: "M", Rosters: ["wcw", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Haku", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Hornswoggle", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "AJ Lee", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Hurricane", Type: "M", Rosters: ["ra", "pg", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ivory", Type: "F", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jamie Noble", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jazz", Type: "F", Rosters: ["attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jeff Hardy", Type: "M", Rosters: ["pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jeff Jarrett", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jillian", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jim Neidhart", Type: "M", Rosters: ["attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jinder Mahal", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Joey Mercury", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Joey Styles", Type: "O", Rosters: ["pg", "ra", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "John Laurinaitis", Type: "O", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "John Morrison", Type: "M", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jonathan Coachman", Type: "O", Rosters: ["ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Josh Mathews", Type: "O", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "JTG", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Justin Gabriel", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Justin Roberts", Type: "O", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kaitlyn", Type: "F", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kelly Kelly", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ken Shamrock", Type: "M", Rosters: ["attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kharma", Type: "F", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kurt Angle", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Lance Storm", Type: "M", Rosters: ["ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Layla", Type: "F", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Lex Lugar", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Luna Vachon", Type: "F", Rosters: ["attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Maria", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Marty Jannetty", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mason Ryan", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Matt Hardy", Type: "M", Rosters: ["pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Matt Striker", Type: "O", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Maxine", Type: "F", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Melina", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Michelle McCool", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mickie James", Type: "F", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Molly Holly", Type: "F", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "MVP", Type: "M", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Perry Saturn", Type: "M", Rosters: ["ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Psicosis", Type: "M", Rosters: ["ra","attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ranjin Singh", Type: "O", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Raven", Type: "M", Rosters: ["attitude", "ra", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rey Mysterio", Type: "M", Rosters: ["reality", "pg", "ra", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rhyno", Type: "M", Rosters: ["ra", "attitude", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ricardo Rodriguez", Type: "O", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rick Martel", Type: "M", Rosters: ["ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rick Rude", Type: "M", Rosters: ["attitude", "ng", "golden", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rick Steiner", Type: "M", Rosters: ["ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Road Dogg", Type: "M", Rosters: ["attitude", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rob Van Dam", Type: "M", Rosters: ["reality", "ra", "attitude", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sable", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sabu", Type: "M", Rosters: ["ra", "ecw", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Santino Marella", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Savio Vega", Type: "M", Rosters: ["attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Scott Steiner", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Shane Douglas", Type: "M", Rosters: ["ng", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Shelton Benjamin", Type: "M", Rosters: ["current", "new", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sid", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Stacy Keibler", Type: "F", Rosters: ["ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Cody Rhodes", Type: "M", Rosters: ["new", "reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Steve Blackman", Type: "M", Rosters: ["attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Stevie Richards", Type: "M", Rosters: ["attitude", "ra", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tajiri", Type: "M", Rosters: ["ra", "attitude", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tazz", Type: "M", Rosters: ["attitide", "ra", "pg", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ted DiBiase", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Teddy Long", Type: "O", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Great Khali", Type: "M", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Sandman", Type: "M", Rosters: ["ra", "ecw", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tiffany", Type: "F", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Todd Grisham", Type: "O", Rosters: ["pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tommy Dreamer", Type: "M", Rosters: ["pg", "ra", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Torrie Wilson", Type: "F", Rosters: ["ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tyler Reks", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ultimate Warrior", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Umaga", Type: "M", Rosters: ["ra", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Vader", Type: "M", Rosters: ["attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Val Venis", Type: "M", Rosters: ["ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Vickie Guerrero", Type: "O", Rosters: ["reality", "pg", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Victoria", Type: "F", Rosters: ["ra", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Virgil", Type: "M", Rosters: ["ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Vladimir Kozlov", Type: "M", Rosters: ["pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Wade Barrett", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ultimo Dragon", Type: "M", Rosters: ["ra", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "X-Pac", Type: "M", Rosters: ["ra", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Yoshi Tatsu", Type: "M", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Zeb Colter", Type: "O", Rosters: ["reality", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Abdullah the Butcher", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Andre the Giant", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Antonio Inoki", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Arn Anderson", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Big Boss Man", Type: "M", Rosters: ["hof", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Big John Studd", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Billy Graham", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bob Backlund", Type: "M", Rosters: ["hof", "current", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bobby Heenan", Type: "O", Rosters: ["hof", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bob Orton", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bret Hart", Type: "M", Rosters: ["hof", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Bruno Sammartino", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Buddy Rogers", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Dusty Rhodes", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Eddie Guerrero", Type: "M", Rosters: ["hof", "ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Edge", Type: "M", Rosters: ["hof", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Fabulous Moolah", Type: "F", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Freddie Blassie", Type: "O", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Gene Okerlund", Type: "O", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "George Steele", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Gerald Brisco", Type: "O", Rosters: ["hof", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Gorgeous George", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Gorilla Monsoon", Type: "O", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Greg Valentine", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Hacksaw Jim Duggan", Type: "M", Rosters: ["hof", "wcw", "ra"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Harley Race", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Howard Finkel", Type: "O", Rosters: ["hof", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jacqueline", Type: "F", Rosters: ["hof", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jake Roberts", Type: "M", Rosters: ["hof", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jesse Ventura", Type: "O", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jimmy Hart", Type: "O", Rosters: ["hof", "attitude", "ra", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Jim Ross", Type: "O", Rosters: ["hof", "pg", "ra", "attitude", "wcw", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Junkyard Dog", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Kevin Nash", Type: "M", Rosters: ["hof", "ra", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Larry Zbyszko", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Lita", Type: "F", Rosters: ["hof", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Lou Albano", Type: "O", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mae Young", Type: "F", Rosters: ["hof", "pg", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Medusa", Type: "F", Rosters: ["hof", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Michael Hayes", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mr. Fuji", Type: "O", Rosters: ["hof", "ng", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Mr. Perfect", Type: "M", Rosters: ["hof", "ra", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Nikolai Volkoff", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Pat Patterson", Type: "O", Rosters: ["hof", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Paul Bearer", Type: "O", Rosters: ["hof", "pg", "ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Paul Orndorff", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Pedro Morales", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Peter Maivia", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Randy Savage", Type: "M", Rosters: ["hof", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ric Flair", Type: "M", Rosters: ["hof", "pg", "ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ricky Steamboat", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rikishi", Type: "M", Rosters: ["hof", "ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Rocky Johnson", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Roddy Piper", Type: "M", Rosters: ["hof", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Ron Simmons", Type: "M", Rosters: ["hof", "ra", "attitude", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Scott Hall", Type: "M", Rosters: ["hof", "ra", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sensational Sherri", Type: "O", Rosters: ["hof", "attitude", "ng", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sgt. Slaughter", Type: "M", Rosters: ["hof", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Shawn Michaels", Type: "M", Rosters: ["hof", "pg", "ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Steve Austin", Type: "M", Rosters: ["hof", "ra", "attitude", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sting", Type: "M", Rosters: ["hof", "reality", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Sunny", Type: "F", Rosters: ["hof", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Terry Funk", Type: "M", Rosters: ["hof", "attitude", "ng", "wcw", "ecw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Godfather", Type: "M", Rosters: ["hof", "ra", "attitude", "ng"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Iron Sheik", Type: "M", Rosters: ["hof", "wcw"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "The Million Dollar Man", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tito Santana", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Tony Atlas", Type: "M", Rosters: ["hof", "pg"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Trish Stratus", Type: "F", Rosters: ["hof", "ra", "attitude"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Vincent J. McMahon", Type: "M", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Wendi Richter", Type: "F", Rosters: ["hof"], FullImage: "", MugImage: ""});
    wrestlers.push({Name: "Yokozuna", Type: "M", Rosters: ["hof", "ng"], FullImage: "", MugImage: ""});

    for (var i = 0; i < wrestlers.length; i++){
        wrestlers[i]["MugImage"] = 'images/' + wrestlers[i]["Name"].replace(/\s+/g, '').toLowerCase() + '.png';
    }
}