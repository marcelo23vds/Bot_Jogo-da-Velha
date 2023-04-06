let celulas = document.querySelectorAll('.celula');
let checarTurno = true;
let fimJogo = false;

let player_o = 'O';
let player_x = 'X';

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function pxp() {            //modo de jogo 1 x 1 (pxp)
    window.alert('JOGADOR VS JOGADOR - PODEM COMEÇAR!');

    document.addEventListener('click', (event) => {
        if(event.target.matches('.celula')) {
            jogar(event.target.id);
        }
    });

    function jogar(id) {
        const CELULA = document.getElementById(id)
        turno = checarTurno ? player_o : player_x;
        CELULA.textContent = turno;
        CELULA.classList.add(turno);
        checarVencedor(turno);
    }
    
    function checarVencedor(turno) {
        const VENCEDOR = COMBINACOES.some((comb) => { //some (algum) se alguma posição retornar true
            return comb.every((index) => {
                return celulas[index].classList.contains(turno);
            })
        });      
    
        if (VENCEDOR) {
            encerrarJogo(turno);
        } else if (checarEmpate()) {
            encerrarJogo();
        } else {
            checarTurno = !checarTurno;
        }
    }
    
    function checarEmpate() {
        let o = 0;
        let x = 0;
    
        for (index in celulas) {
            if (!isNaN(index)) {           //se for um numero
                if (celulas[index].classList.contains(player_o)) {
                    o++;
                }
        
                if (celulas[index].classList.contains(player_x)) {
                    x++;
                }
            }
        }
    
        return o + x === 9 ? true : false;
    }
    
    function encerrarJogo(VENCEDOR = null) {     //se exitir um parametro, utiliza o parametro, se não, null
        let res = document.getElementById('resultado');
        let data = new Date();
        let hora = data.getHours();
        let minutos = data.getMinutes();

        if (VENCEDOR) {
            setTimeout(() => { alert(`"${VENCEDOR}" VENCEU!`) }, 200);
            res.innerHTML += (`${hora}:${minutos} - MODO: JOGADOR VS JOGADOR - "${VENCEDOR}" VENCEU!<br>`);
            setTimeout(() => { location.reload() }, 200);
        } else {
            setTimeout(() => { alert('O JOGO TERMINOU EMPATADO!') }, 200);
            res.innerHTML += (`${hora}:${minutos} - MODO: JOGADOR VS JOGADOR - O JOGO TERMINOU EMPATADO!<br>`);
            setTimeout(() => { location.reload() }, 200);
        }
    }
}

function pxb() {                                 //modo de jogo Player vs Bot (player inicia)
    window.alert('JOGADOR VS BOT - A PRIMEIRA JOGADA É SUA!');

    document.addEventListener('click', (event) => {
        if(event.target.matches('.celula')) {
            jogar(event.target.id, player_o);
            setTimeout(() => bot(), 500);
        }
    });
    
    function bot() {
        const POSI_DISP = [];       //posições disponiveis
        for (index in celulas) {
            if (!isNaN(index)) {     //se for um numero
                if(
                    !celulas[index].classList.contains("O") &&
                    !celulas[index].classList.contains("X")
                ) {
                    POSI_DISP.push(index);
                }
            }
        }

        const POSI_ALEAT = Math.floor(         //posição aleatoria
            Math.random() * POSI_DISP.length
        );
        if (!fimJogo) {
        jogar(POSI_DISP[POSI_ALEAT], player_x);
        }
    }

    function jogar(id, turno) {
        const CELULA = document.getElementById(id)
        CELULA.textContent = turno;
        CELULA.classList.add(turno);
        checarVencedor(turno);
    }

    function checarVencedor(turno) {
        const VENCEDOR = COMBINACOES.some((comb) => { //some (algum) se alguma posição retornar true
            return comb.every((index) => {
                return celulas[index].classList.contains(turno);
            })
        });      
    
        if (VENCEDOR) {
            encerrarJogo(turno);
        } else if (checarEmpate()) {
            encerrarJogo();
        }
    }
    
    function checarEmpate() {
        let o = 0;
        let x = 0;
    
        for (index in celulas) {
            if (!isNaN(index)) {
                if (celulas[index].classList.contains(player_o)) {
                    o++;
                }
        
                if (celulas[index].classList.contains(player_x)) {
                    x++;
                }
            }
        }
    
        return o + x === 9 ? true : false;
    }
    
    function encerrarJogo(VENCEDOR = null) {     //se exitir um parametro, utiliza o parametro, se não, null
        fimJogo = true;
        let res = document.getElementById('resultado');
        let data = new Date();
        let hora = data.getHours();
        let minutos = data.getMinutes();
    
        if (VENCEDOR) {
            setTimeout(() => { alert(`"${VENCEDOR}" VENCEU!`) }, 200);
            res.innerHTML += (`${hora}:${minutos} - MODO: JOGADOR VS BOT - "${VENCEDOR}" VENCEU!<br>`);
            setTimeout(() => { location.reload() }, 200);
        } else {
            setTimeout(() => { alert('O JOGO TERMINOU EMPATADO!') }, 200);
            res.innerHTML += (`${hora}:${minutos} - MODO: JOGADOR VS BOT - O JOGO TERMINOU EMPATADO!<br>`);
            setTimeout(() => { location.reload() }, 200);
        }
    }
}

function bxp() {    //modo de jogo bot vs player (bot inicia)
    window.alert('MODO: BOT VS JOGADOR - O BOT FAZ A PRIMEIRA JOGADA!');
      
    setTimeout(() => bot(), 500);         //basicamente a mesma função anterior, porem com o bot iniciando

    document.addEventListener('click', (event) => {
        if(event.target.matches('.celula')) {
        jogar(event.target.id, player_x);
        setTimeout(() => bot(), 500);
    }
});

function bot() {
    const POSI_DISP = [];            //posição disponivel
    for (index in celulas) {
        if (!isNaN(index)) {         //se for um numero
            if(
                !celulas[index].classList.contains("O") &&
                !celulas[index].classList.contains("X")
            ) {
                POSI_DISP.push(index);
            }
        }
    }

    const POSI_ALEAT = Math.floor(              //posição aleatoria
        Math.random() * POSI_DISP.length
    );
    if (!fimJogo) {
    jogar(POSI_DISP[POSI_ALEAT], player_o);
    }
}

    function jogar(id, turno) {
        const CELULA = document.getElementById(id)
        CELULA.textContent = turno;
        CELULA.classList.add(turno);
        checarVencedor(turno);
    }

    function checarVencedor(turno) {
        const VENCEDOR = COMBINACOES.some((comb) => { //some (algum) se alguma posição retornar true
            return comb.every((index) => {
                return celulas[index].classList.contains(turno);
            })
        });      
    
        if (VENCEDOR) {
            encerrarJogo(turno);
        } else if (checarEmpate()) {
            encerrarJogo();
        }
    }
    
    function checarEmpate() {
        let o = 0;
        let x = 0;
    
        for (index in celulas) {
            if (!isNaN(index)) {
                if (celulas[index].classList.contains(player_o)) {
                    o++;
                }
        
                if (celulas[index].classList.contains(player_x)) {
                    x++;
                }
            }
        }
    
        return o + x === 9 ? true : false;
    }
    
    function encerrarJogo(VENCEDOR = null) {     //se exitir um parametro, utiliza o parametro, se não, null
        fimJogo = true;
        let res = document.getElementById('resultado');
        let data = new Date();
        let hora = data.getHours();
        let minutos = data.getMinutes();
    
        if (VENCEDOR) {
            setTimeout(() => { alert(`"${VENCEDOR}" VENCEU!`) }, 200);
            res.innerHTML += (`${hora}:${minutos} - MODO: BOT VS JOGADOR - "${VENCEDOR}" VENCEU!<br>`);
            setTimeout(() => { location.reload() }, 200);
        } else {
            setTimeout(() => { alert('O JOGO TERMINOU EMPATADO!') }, 200);
            res.innerHTML += (`${hora}:${minutos} - MODO: BOT VS JOGADOR - O JOGO TERMINOU EMPATADO!<br>`);
            setTimeout(() => { location.reload() }, 200);
        }
    }
}