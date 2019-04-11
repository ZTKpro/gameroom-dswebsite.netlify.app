// PingPong
// PingPong
// PingPong

let PingPongSwitch = "off";

function PingPong() {
	const canvas = document.querySelector("#PingPong");
	const ctx = canvas.getContext('2d');

	canvas.width = 450;
	canvas.height = 600;

	const cw = canvas.width;
	const ch = canvas.height;

	const ballSize = 20;

	let ballX = cw / 2 - ballSize / 2;
	let ballY = ch / 2 - ballSize / 2;

	let ballSpeedX = 1;
	let ballSpeedY = 1;



	const paddelHeight = 100;
	const paddelwitdth = 20;

	const playerY = 550;
	let playerX = 180;
	const aiY = 20;
	let aiX = 180;



	function table() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, cw, ch);
	}

	function Player() {
		ctx.fillStyle = '#16cae6';
		ctx.fillRect(playerX, playerY, paddelHeight, paddelwitdth);
	}

	function AI() {
		ctx.fillStyle = 'red';
		ctx.fillRect(aiX, aiY, paddelHeight, paddelwitdth);
	}


	function ball() {
		ctx.fillStyle = "white";
		ctx.fillRect(ballX, ballY, ballSize, ballSize);

		ballX += ballSpeedX;
		ballY += ballSpeedY;

		if (ballX <= 0 || ballX + ballSize >= cw) {
			ballSpeedX = -ballSpeedX;
			speedUp();

		}

		if (ballY <= 0 || ballY + ballSize >= ch) {
			ballSpeedY = -ballSpeedY;
			ballY = ch / 2;
			ballX = cw / 2;
			ballSpeedX = 1;
			ballSpeedY = 1;

		}

	};


	leftCanvas = canvas.offsetLeft;


	function playerPosition(e) {
		playerX = e.clientX - leftCanvas - paddelwitdth / 2;

		if (playerX <= 0) {
			playerX = 0;
		}
		if (playerX >= cw - 100) {
			playerX = cw - 100;
		}
	}

	canvas.addEventListener("mousemove", playerPosition);

	function speedUp() {
		ballSpeedX *= 1.2;
		ballSpeedY *= 1.2;
	}

	function aiPostition() {
		middlePaddel = aiX + paddelwitdth / 2;
		middlePaddel = ballX;
		aiX = middlePaddel
		if (aiX >= cw - 100) {
			aiX = cw - 100;
		}
	}

	function collision() {


		if (ballY >= playerY - ballSize && ballX >= playerX && ballX <= playerX + 100) {
			ballSpeedY = -ballSpeedY;
		}
		if (ballY <= aiY + ballSize) {
			ballSpeedY = -ballSpeedY;
		}
	}



	function game() {
		table();
		Player();
		AI();
		ball();
		aiPostition();
		collision();
	};

	setInterval(game, 16);
	PingPongSwitch = "on";
}

// TICTACTOE
// TICTACTOE
// TICTACTOE
// TICTACTOE
// TICTACTOE

function TICTACTOE() {


	const PLAYER1 = 'fa-circle-o';
	const PLAYER2 = 'fa-times';

	let round = 1;
	const board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];
	const combinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const boxes = [...document.querySelectorAll('.box')];
	boxes.forEach(box => box.addEventListener('click', pick));

	function pick(event) {

		const {
			row,
			column
		} = event.target.dataset;
		const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
		if (board[row][column] !== '') return;
		event.target.classList.add(turn);
		board[row][column] = turn;
		round++;

		console.log(check());
		if (check() == null) {

		} else {
			document.getElementById("overlayTictoc").style.display = "flex";
			document.getElementById("winner").innerHTML = check();

		};

	}

	function check() {

		const result = board.reduce((total, row) => total.concat(row));
		let winner = null;
		let moves = {
			'fa-times': [],
			'fa-circle-o': []
		};
		result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
		combinations.forEach(combination => {
			if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {

				winner = 'Winner: Player 1';

			}
			if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {

				winner = 'Winner: Player 2'
			}
		});

		return winner;
	}
}

// snake
// snake
// snake


function snake() {
	window.onload = () => {
		let G = new Game();
		G.start();

	}


	class Game {
		constructor() {
			this.data = this.prepare();
			this.keydown = false;
			let self = this;
			document.addEventListener("keydown", (event) => {
				let e = window.event || event;
				if (!self.keydown) {
					if (e.keyCode == 38 && self.data.snake.mvD != 'y') {
						self.data.snake.mvD = "y";
						self.data.snake.mvS = -1;
						self.keydown = true;
					} else if (e.keyCode == 40 && self.data.snake.mvD != 'y') {
						self.data.snake.mvD = "y";
						self.data.snake.mvS = 1;
						self.keydown = true;
					} else if (e.keyCode == 37 && self.data.snake.mvD != 'x') {
						self.data.snake.mvD = "x";
						self.data.snake.mvS = -1;
						self.keydown = true;
					} else if (e.keyCode == 39 && self.data.snake.mvD != 'x') {
						self.data.snake.mvD = "x";
						self.data.snake.mvS = 1;
						self.keydown = true;
					}
				}
			});
		}

		start() {
			let self = this;
			this.tm = setInterval(() => {
				self.keydown = false;
				self.checkCollision(self);
				self.updata(self);
				self.redraw(self);
			}, 1000 / 10);
		}

		updata(self) {
			self.data.snake.t.reverse().forEach((p, i) => {
				if (self.data.snake.mvD === "x") {
					if (i == self.data.snake.t.length - 1) {
						p.x += self.data.snake.mvS;
					} else {
						p.x = self.data.snake.t[i + 1].x;
						p.y = self.data.snake.t[i + 1].y;
					}
				} else {
					if (i == self.data.snake.t.length - 1) {
						p.y += self.data.snake.mvS;
					} else {
						p.x = self.data.snake.t[i + 1].x;
						p.y = self.data.snake.t[i + 1].y;
					}
				}

				if (p.x > self.data.cvs.width / p.s - 1) {
					p.x = 0;
				}
				if (p.x < 0) {
					p.x = self.data.cvs.width / p.s - 1;
				}

				if (p.y > self.data.cvs.height / p.s - 1) {
					p.y = 0;
				}
				if (p.y < 0) {
					p.y = self.data.cvs.height / p.s - 1;
				}
			});
			self.data.snake.t.reverse();

			if (self.data.fruit.pf == false && self.data.snake.t.length < (self.data.cvs.width / 50) * (self.data.cvs.height / 50)) {
				self.data.fruit = new Fruit(self.data.cvs.width / 50 - 1, self.data.cvs.height / 50 - 1, 50, self.data.snake.t);
			}
		}

		checkCollision(self) {
			if (self.data.snake.t[0].x == self.data.fruit.x &&
				self.data.snake.t[0].y == self.data.fruit.y) {
				self.data.snake.t[self.data.snake.t.length] = {
					x: self.data.snake.t[self.data.snake.t.length - 1].x,
					y: self.data.snake.t[self.data.snake.t.length - 1].y,
					s: self.data.snake.t[self.data.snake.t.length - 1].s
				};
				self.data.fruit = new Fruit(self.data.cvs.width / 50 - 1, self.data.cvs.height / 50 - 1, 50, self.data.snake.t);
			}

			self.data.snake.t.forEach((p, i) => {
				if (self.data.snake.t[0].x == p.x &&
					self.data.snake.t[0].y == p.y &&
					i > 0) {
					self.data.snake.t = self.data.snake.t.splice(0, i + 1);
				}
			});
		}

		redraw(self) {
			self.data.ctx.drawImage(self.data.img.bg, 0, 0);

			self.data.ctx.drawImage(self.data.img.fr, self.data.fruit.t * 50, 0, self.data.fruit.s, self.data.fruit.s, self.data.fruit.x * self.data.fruit.s, self.data.fruit.y * self.data.fruit.s, self.data.fruit.s, self.data.fruit.s);

			self.data.snake.t.forEach((cseg, i) => {
				if (i == 0) {
					let nseg = self.data.snake.t[i + 1];

					if (cseg.x - nseg.x == 1 || cseg.x - nseg.x < -1) {
						self.data.ctx.drawImage(self.data.img.sn, 200, 50, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if (cseg.x - nseg.x == -1 || cseg.x - nseg.x > 1) {
						self.data.ctx.drawImage(self.data.img.sn, 200, 0, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if (cseg.y - nseg.y == 1 || cseg.y - nseg.y < -1) {
						self.data.ctx.drawImage(self.data.img.sn, 150, 0, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if (cseg.y - nseg.y == -1 || cseg.y - nseg.y > 1) {
						self.data.ctx.drawImage(self.data.img.sn, 150, 50, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					}
				} else if (i == self.data.snake.t.length - 1) {
					let pseg = self.data.snake.t[i - 1];

					if (cseg.x - pseg.x == 1 || cseg.x - pseg.x < -1) {
						self.data.ctx.drawImage(self.data.img.sn, 50, 100, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if (cseg.x - pseg.x == -1 || cseg.x - pseg.x > 1) {
						self.data.ctx.drawImage(self.data.img.sn, 150, 100, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if (cseg.y - pseg.y == 1 || cseg.y - pseg.y < -1) {
						self.data.ctx.drawImage(self.data.img.sn, 100, 100, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if (cseg.y - pseg.y == -1 || cseg.y - pseg.y > 1) {
						self.data.ctx.drawImage(self.data.img.sn, 0, 100, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					}
				} else {
					let nseg = self.data.snake.t[i + 1];
					let pseg = self.data.snake.t[i - 1];

					if ((cseg.x - nseg.x == 1 && cseg.x - pseg.x == -1) ||
						(cseg.x - nseg.x == -1 && cseg.x - pseg.x == 1) ||
						(cseg.x - nseg.x <= -1 && cseg.x - pseg.x <= -1) ||
						(cseg.x - nseg.x >= 1 && cseg.x - pseg.x >= 1)) {
						self.data.ctx.drawImage(self.data.img.sn, 50, 50, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if ((cseg.y - nseg.y == 1 && cseg.y - pseg.y == -1) ||
						(cseg.y - nseg.y == -1 && cseg.y - pseg.y == 1) ||
						(cseg.y - nseg.y <= -1 && cseg.y - pseg.y <= -1) ||
						(cseg.y - nseg.y >= 1 && cseg.y - pseg.y >= 1)) {
						self.data.ctx.drawImage(self.data.img.sn, 50, 0, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if ((cseg.x - nseg.x == 1 && cseg.y - pseg.y == 1) ||
						(cseg.x - pseg.x == 1 && cseg.y - nseg.y == 1) ||
						(cseg.x - nseg.x == 1 && cseg.y - pseg.y < -1) ||
						(cseg.x - pseg.x == 1 && cseg.y - nseg.y < -1) ||
						(cseg.x - nseg.x < -1 && cseg.y - pseg.y == 1) ||
						(cseg.x - pseg.x < -1 && cseg.y - nseg.y == 1)) {
						self.data.ctx.drawImage(self.data.img.sn, 100, 50, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if ((cseg.x - nseg.x == 1 && cseg.y - pseg.y == -1) ||
						(cseg.x - pseg.x == 1 && cseg.y - nseg.y == -1) ||
						(cseg.x - nseg.x == 1 && cseg.y - pseg.y > 1) ||
						(cseg.x - pseg.x == 1 && cseg.y - nseg.y > 1) ||
						(cseg.x - nseg.x < -1 && cseg.y - pseg.y == -1) ||
						(cseg.x - pseg.x < -1 && cseg.y - nseg.y == -1)) {
						self.data.ctx.drawImage(self.data.img.sn, 100, 0, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if ((cseg.x - nseg.x == -1 && cseg.y - pseg.y == 1) ||
						(cseg.x - pseg.x == -1 && cseg.y - nseg.y == 1) ||
						(cseg.x - nseg.x == -1 && cseg.y - pseg.y < -1) ||
						(cseg.x - pseg.x == -1 && cseg.y - nseg.y < -1) ||
						(cseg.x - nseg.x > 1 && cseg.y - pseg.y == 1) ||
						(cseg.x - pseg.x > 1 && cseg.y - nseg.y == 1)) {
						self.data.ctx.drawImage(self.data.img.sn, 0, 50, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					} else if ((cseg.x - nseg.x == -1 && cseg.y - pseg.y == -1) ||
						(cseg.x - pseg.x == -1 && cseg.y - nseg.y == -1) ||
						(cseg.x - nseg.x == -1 && cseg.y - pseg.y > 1) ||
						(cseg.x - pseg.x == -1 && cseg.y - nseg.y > 1) ||
						(cseg.x - nseg.x > 1 && cseg.y - pseg.y == -1) ||
						(cseg.x - pseg.x > 1 && cseg.y - nseg.y == -1)) {
						self.data.ctx.drawImage(self.data.img.sn, 0, 0, cseg.s, cseg.s, cseg.x * cseg.s, cseg.y * cseg.s, cseg.s, cseg.s);
					}
				}
			});
		}

		prepare() {
			let _cvs = document.getElementById("c1");
			let _ctx = _cvs.getContext('2d');
			_ctx.imageSmoothingEnalbed = false;

			let _bgImg = new Image();
			_bgImg.src = "img/background.png";
			_bgImg.addEventListener("load", () => {
				_bgImg = this;
			});

			let _snakeImg = new Image();
			let colors = ["blue", "red", "orange", "purple", "green"];
			let snakeColor = colors[Math.floor(Math.random() * colors.length)];
			_snakeImg.src = "img/snake_" + snakeColor + ".png";
			_snakeImg.addEventListener("load", () => {
				_snakeImg = this;
			});

			let _fruitsImg = new Image();
			_fruitsImg.src = "img/fruits.png";
			_fruitsImg.addEventListener("load", () => {
				_fruitsImg = this;
			});

			let _snake = new Snake(3, 5, 50);
			let _fruit = new Fruit(_cvs.width / 50 - 1, _cvs.height / 50 - 1, 50, _snake.t);

			let data = {
				cvs: _cvs,
				ctx: _ctx,
				img: {
					bg: _bgImg,
					sn: _snakeImg,
					fr: _fruitsImg
				},
				snake: _snake,
				fruit: _fruit
			};

			return data;
		}

	}

	class Fruit {
		constructor(mx, my, s, sp) {
			this.pf = false;
			this.genPosition(mx, my, sp);
			this.t = Math.floor(Math.random() * 3);
			this.s = s;
		}

		genPosition(mx, my, sp) {
			if (sp.length < (mx + 1) * (my + 1)) {
				let pos = {
					x: Math.floor(Math.random() * mx),
					y: Math.floor(Math.random() * my)
				}

				let collide = false;
				sp.some((p) => {
					if (p.x == pos.x && p.y == pos.y) {
						collide = true;
						return true;
					}
				});

				if (collide) {
					this.genPosition(mx, my, sp);
				} else {
					this.x = pos.x;
					this.y = pos.y;
					this.pf = true;
				}
			} else {
				this.pf = false;
			}
		}
	}

	class Snake {
		constructor(x, y, s) {
			this.t = [];
			for (let i = 0; i < 4; i++) {
				this.t[i] = {
					x: x - i,
					y: y,
					s: s
				};
			}
			this.mvD = "x";
			this.mvS = 1;
		}
	}

};

function choice() {
	const choiceGame = document.getElementById("choicegame");
	const snakeChoice = document.getElementById("snakechoice");
	const pingpongchoice = document.getElementById("pingpongchoice");
	const snakeGame = document.getElementById("c1");
	const PingPongGame = document.getElementById("PingPong");

	const closeBtn = document.getElementById("closeBtn");


	snakeChoice.addEventListener("click", function () {
		choiceGame.style.display = "none"
		snakeGame.style.display = "block"
		closeBtn.style.display = "block"
	})
	pingpongchoice.addEventListener("click", function () {
		choiceGame.style.display = "none"
		PingPongGame.style.display = "block"
		closeBtn.style.display = "block"
		if (PingPongSwitch == "off") {
			PingPong();
		}
	})
	closeBtn.addEventListener("click", function () {
		closeBtn.style.display = "none"
		snakeGame.style.display = "none"
		PingPongGame.style.display = "none"
		choiceGame.style.display = "flex"
	})
}
snake();
choice();
TICTACTOE();