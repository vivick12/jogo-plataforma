const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define as propriedades do jogador
const player = {
    x: 50,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    jumping: false,
    jumpHeight: 50,
    velocityY: 0,
};

// Define a gravidade do jogo
const gravity = 2;

// Define um array de obstáculos
const obstacles = [];

// Define o número de vidas (apenas 1 vida)
let lives = 1;

// Função para criar um obstáculo
function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: canvas.height - 50,
        width: 50,
        height: 50,
    };
    obstacles.push(obstacle);
}

// Função para reiniciar o jogo
function restartGame() {
    obstacles.length = 0; // Limpa a matriz de obstáculos
    player.x = 50; // Reposiciona o jogador
    player.y = canvas.height - 50;
    player.velocityY = 0;
    player.jumping = false;
    lives = 1; // Redefine para 1 vida
    update(); // Reinicia o loop de atualização do jogo
}

// Função para atualizar o jogo
function update() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o jogador
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Atualiza a posição do jogador com a gravidade
    player.y += player.velocityY;
    player.velocityY += gravity;

    // Impede que o jogador saia da tela por baixo
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.jumping = false;
    }

    // Desenha e move os obstáculos
    ctx.fillStyle = 'green';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        obstacles[i].x -= 5;

        // Verifica colisão com o jogador
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            alert('Fim de jogo! Clique em "OK" para reiniciar.');
            restartGame(); // Reinicia o jogo
            location.reload();
        }
    }

    // Solicita uma nova animação
    requestAnimationFrame(update);
}

// Função para lidar com pulos do jogador
function jump() {
    if (!player.jumping) {
        player.velocityY = -player.jumpHeight;
        player.jumping = true;
    }
}

// Chama a função createObstacle a cada 2 segundos
setInterval(createObstacle, 1500);

// Inicia o jogo
update();

// Adiciona um evento de clique para pular
document.addEventListener('click', jump);