document.body.onkeydown = pressed;

var craft = document.getElementById('ship');
var space = document.getElementById('space');
var stars1 = document.getElementById('stars1');
var stars2 = document.getElementById('stars2');
var stars3 = document.getElementById('stars3');
var ship = new Ship();
var message = document.getElementById('message');
var messageContent = document.getElementById('messageContent');
var totalMonsters = 0;
var score = document.getElementById('score');
var ammo = document.getElementById('ammo');
var lifes = 5;
score.innerHTML=0;
ammo.innerHTML = lifes;

var var1, var2;

showMenu();

function showMenu() {
	messageContent.innerHTML = '<ul class="mainMenu" id="mainMenu"><div class="gametitle">Space of despair</div><li id="newgame" class="current">Start Game</li><li id="authors">Authors</li></ul>';
	message.style.display = "block";

	$('#newgame').click(function() {
		ship.run();
	});

	$('#authors').click(function() {
		messageContent.innerHTML = '<div class="authors"><div><span class="text">Music: </span>bitaruka</div><div><span class="text">Art: </span>Megacat21</div><div><span class="text">Code: </span>oshibka404</div></div>';
	});
}

function pause() {
	ship.stop();
	messageContent.innerHTML = '<ul class="mainMenu" id="mainMenu"><li id="continuegame" class="current">Continue Game</li><li id="authors">Authors</li></ul>';
	message.style.display = "block";
	$('#continuegame').click(function() {
		message.style.display = 'none';
	});
	$('#authors').click(function() {
		messageContent.innerHTML = '<div class="authors"><div><span class="text">Music: </span>bitaruka</div><div><span class="text">Art: </span>Megacat21</div><div><span class="text">Code: </span>oshibka404</div></div>';
	});
}

function pressed(e) {
	e = e || event;
	if (message.style.display == "block") {
		if (e.keyCode == 13 || e.keyCode == 32) 
			$('li.current').click();
		if (e.keyCode == 38 || e.keyCode == 40) 
			$('.mainMenu li').toggleClass('current');
		if (e.keyCode == 27) {
			if (document.getElementById('mainMenu'))  
				ship.run();
			else
				showMenu();
		}
	}
	else {
		if (e.keyCode == 39)
			ship.moveRight();
		if (e.keyCode == 37)
			ship.moveLeft();
		if (e.keyCode == 32)
			ship.shoot();
		if (e.ctrlKey)
			ship.rocket();
		if (e.keyCode == 27) 
			pause();
	}
}

function createMonster() {	
	var monster = document.createElement('div');
	monster.className = 'monster';
	monster.style.left = randomPos() + 'px';
	monster.style.bottom = '600px';
	var rnd = Math.ceil(Math.random()*3);
	monster.style.backgroundImage = "url('images/monster" + rnd + ".png')";
	space.appendChild(monster);

	var randomSpeed = Math.floor(Math.random()*20)+10;

	var monsterInterval = setInterval(function() {
		monster.style.bottom = parseInt(monster.style.bottom) - 1 + 'px';
		if (parseInt(monster.style.bottom) < 60) {
			clearInterval(monsterInterval);
			monster.parentNode.removeChild(monster);
			monster = undefined;
			ammo.innerHTML-=1;
			lifes--;
			if (lifes==0) {
				gameOver('All your base are belong to us');
			}
		}
	}, randomSpeed);
	totalMonsters++;
}

function Ship() {
	craft.style.left='400px';
	craft.style.bottom = '0px';
	craft.style.height = '90px';
	var movingstars;
	stars1.style.backgroundPositionY = '1px';
	stars2.style.backgroundPositionY = '1px';
	stars3.style.backgroundPositionY = '1px';

	this.moveRight = function() {
		if (parseInt(craft.style.left) < 720)
			craft.style.left = parseInt(craft.style.left) + 50 + 'px';
	}
	this.moveLeft = function() {
		if (parseInt(craft.style.left) > 80)
			craft.style.left = parseInt(craft.style.left) - 50 + 'px';
	}

	this.shoot = function() {
		var bullet = document.createElement('div');
		bullet.className = "bullet";
		bullet.style.left = craft.style.left;
		bullet.style.bottom = parseInt(craft.style.bottom) + parseInt(craft.style.height) + 'px';
		space.appendChild(bullet);

		var bulletInterval = setInterval(function() {
			bullet.style.bottom = parseInt(bullet.style.bottom) + 5 + 'px';
			var enemies = document.getElementsByClassName('monster');
			var bulletY = parseInt(bullet.style.bottom);
			var bulletX = parseInt(bullet.style.left);
			if (enemies.length > 0) {
				for (enemy in enemies) {
					if (enemies[enemy].style) {
						var enemyY = parseInt(enemies[enemy].style.bottom);
						var enemyX = parseInt(enemies[enemy].style.left);
						if (bulletY >= enemyY-40 && bulletX == enemyX) {
							enemies[enemy].parentNode.removeChild(enemies[enemy]);
							bullet.parentNode.removeChild(bullet);
							score.innerHTML = parseInt(score.innerHTML) + 2;
							clearInterval(bulletInterval);
							bullet = undefined;
						}
					}
				}
			}
			if (parseInt(bullet.style.bottom) > 600) {
				bullet.parentNode.removeChild(bullet);
				bullet = undefined;
			}
		}, 30);

		score.innerHTML--;
	}

	this.run = function() {
		message.style.display = 'none';

		movingstars = setInterval(function() {
			stars1.style.backgroundPositionY = parseInt(stars1.style.backgroundPositionY) + 1 + 'px';
			stars2.style.backgroundPositionY = parseInt(stars2.style.backgroundPositionY) + 2 + 'px';
			stars3.style.backgroundPositionY = parseInt(stars3.style.backgroundPositionY) + 3 + 'px';
		}, 30);

		var monsterInterval = setInterval(createMonster, 700);
		document.getElementById('music').play();
	}

	this.stop = function() {
		clearInterval(movingstars);
	}

	return this;
}

function gameOver(why) {
	ship.stop();
	messageContent.innerHTML = '<div class="gameover">Game Over</div>' + why;
	message.style.display = "block";
}


function randomPos() {
	return 400 + (Math.floor(Math.random() * 15 - 7) * 50);
}
