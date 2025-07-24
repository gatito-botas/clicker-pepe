let gem = document.querySelector('.valor');
let parsedGem = parseFloat(gem.innerHTML);
let gpc = 1;
let gps = 0;

let gpcText = document.querySelector('#gpc-text');
let gpsText = document.querySelector('#gps-text');

let gemImgContainer = document.querySelector('.gem-img-container');
const imagem = document.querySelector('.imagem-clicker');


function verificarProgresso(parsedGem) {
  const body = document.body;

  if (parsedGem >= 100000) {
    body.style.backgroundColor = "#660000"; // vermelho profundo (universo)
  } else if (parsedGem >= 10000) {
    body.style.backgroundColor = "#790800ff"; // vermelho queimado (planeta)
  } else if (parsedGem >= 1000) {
    body.style.backgroundColor = "#aa2504ff"; // vermelho alaranjado (cidade)
  } else if (parsedGem >= 100) {
    body.style.backgroundColor = "#990000ff"; // vermelho suave (rua)
  } else {
    body.style.backgroundColor = "#973d19ff"; // rosado claro (casa)
  }

  body.style.transition = "background-color 0.5s ease"; // transição suave
}




const upgrades = [
    {
        name: 'Clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parsedIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        gemMultiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'Pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        parsedCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
        increase: document.querySelector('.pickaxe-increase'),
        parsedIncrease: parseFloat(document.querySelector('.pickaxe-increase').innerHTML),
        level: document.querySelector('.pickaxe-level'),
        gemMultiplier: 1.03,
        costMultiplier: 1.115,
    },
    {
        name: 'Miner',
        cost: document.querySelector('.miner-cost'),
        parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector('.miner-increase'),
        parsedIncrease: parseFloat(document.querySelector('.miner-increase').innerHTML),
        level: document.querySelector('.miner-level'),
        gemMultiplier: 1.035,
        costMultiplier: 1.11,
    },
    {
        name: 'Factory',
        cost: document.querySelector('.factory-cost'),
        parsedCost: parseFloat(document.querySelector('.factory-cost').innerHTML),
        increase: document.querySelector('.factory-increase'),
        parsedIncrease: parseFloat(document.querySelector('.factory-increase').innerHTML),
        level: document.querySelector('.factory-level'),
        gemMultiplier: 1.04,
        costMultiplier: 1.10,
    }
]
function incrementar() {
    gem.innerHTML = Math.round(parsedGem += gpc);
    somclick();

    const x = event.offsetX;
    const y = event.offsetY;
    const div = document.createElement('div');
    div.innerHTML = `+${Math.round(gpc)}`;
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`;
    gemImgContainer.appendChild(div);

    div.classList.add('fade-up');
    imagem.classList.remove('animando');
    void imagem.offsetWidth; // truque para reiniciar a animação
    imagem.classList.add('animando');

    timeout(div);
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove();
    }, 800);
}

function comprarUpgrade(upgrade){
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u;
    });

    if (parsedGem >= mu.parsedCost) {
        somComprarUpgrade();
        gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);

        mu.level.innerHTML++; 

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2));

        mu.increase.innerHTML = mu.parsedIncrease;

        mu.parsedCost *= mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parsedCost);

        if (mu.name === 'Clicker') {
            gpc += mu.parsedIncrease;
        } else {
            gps += mu.parsedIncrease;
        }

        
    }
}

function save(){
    localStorage.clear()

    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })

        localStorage.setItem(upgrade.name, obj)
        
    })

    localStorage.setItem('gpc', JSON.stringify(gpc));
    localStorage.setItem('gps', JSON.stringify(gps));
    localStorage.setItem('gem', JSON.stringify(parsedGem));

}

function load() {

    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name));

        upgrade.parsedCost = savedValues.parsedCost;
        upgrade.parsedIncrease = savedValues.parsedIncrease;
        upgrade.level.innerHTML = savedValues.parsedLevel;
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease;
    })

    gpc = JSON.parse(localStorage.getItem('gpc'));
    gps = JSON.parse(localStorage.getItem('gps'));
    parsedGem = JSON.parse(localStorage.getItem('gem'));

    gem.innerHTML = Math.round(parsedGem);
}

setInterval(() => {
    parsedGem += gps / 10;
    gem.innerHTML = Math.round(parsedGem);

    gpcText.innerHTML = Math.round(gpc);
    gpsText.innerHTML = Math.round(gps);
    verificarProgresso(parsedGem)
    atualizarBarraDeProgresso(parsedGem);

}, 100)

function startGame() {
    document.getElementById("intro").style.display = "none";
}

function spawnGoldenCat() {
    const cat = document.createElement("img");
    cat.src = "https://marketplace.canva.com/MADAUzWiF5E/1/thumbnail_large-1/canva-kitten-MADAUzWiF5E.jpg";
    cat.style.cssText = `
        width: 80px; position: absolute;
        top: ${Math.random() * window.innerHeight}px;
        left: ${Math.random() * window.innerWidth}px;
        z-index: 999; cursor: pointer;
    `;
    cat.onclick = () => {
        parsedGem += 5000;
        gem.innerHTML = Math.round(parsedGem);
        cat.remove();
    }
    document.body.appendChild(cat);

    setTimeout(() => cat.remove(), 8000); // desaparece em 8s
}

setInterval(() => {
    if (Math.random() < 0.02) { // 2% de chance a cada 10s
        spawnGoldenCat();
    }
}, 10000);

const falas = [
    "Oi?",
    "OI!",
    "AEEEEEE CACETEEEEE!!",
    "MANO, FERRO TUDO MEU, O MUNDO ESTÁ ACABANDO!",
    "NÃO FAÇA PERGUNTAS, SÓ CLIQUE!",
    "PRECISAMOS DE GRAMPAS, MUITOS DELES (como você pode ver na tela né meu fi?)",
    "Clique no grampa para mais grampas - É assim que funciona, CLIQUE SEU CABEÇA DE BAGRE!",
    "Você pode comprar upgrades para ganhar mais grampas por clique ou por segundo, SE VOCÊ QUISER, MAS NÃO PRECISA!",
    "'ain, mas to com preguiça...' TEMOS SAVE, USE SEU CÉREBRO!",
    "E O PRINCIPAL... COMPRE O DAVI BRITO, ELE VAI SALVAR O MUNDO, AQUELE GOST-",
    "cahan... BEM...",
    "Acho que é isso, até logo, E NOS AJUDE AAAAAAA"
];

let falaAtual = 0;
let textoElement = document.getElementById("texto-dialogo");
let btnProximo = document.getElementById("btn-proximo");
let intervaloAtual = null;
let escrevendo = false;

function mostrarTextoGradualmente(texto, elemento, delay = 30) {
    let i = 0;
    escrevendo = true;
    elemento.innerHTML = "";

    // Para qualquer intervalo anterior
    if (intervaloAtual) clearInterval(intervaloAtual);

    intervaloAtual = setInterval(() => {
        elemento.innerHTML += texto.charAt(i);
        i++;
        if (i >= texto.length) {
            clearInterval(intervaloAtual);
            escrevendo = false;
        }
    }, delay);
}

function proximoDialogo() {
    if (escrevendo) {
        // Se o usuário clicar enquanto ainda está escrevendo, termina instantaneamente a fala
        clearInterval(intervaloAtual);
        textoElement.innerHTML = falas[falaAtual - 1];
        escrevendo = false;
        return;
    }

    if (falaAtual < falas.length) {
        mostrarTextoGradualmente(falas[falaAtual], textoElement);
        falaAtual++;
    } else {
        document.getElementById("dialogo").style.display = "none";
    }
}

// Começa o primeiro texto ao carregar
window.addEventListener("load", () => {
    mostrarTextoGradualmente(falas[falaAtual], textoElement);
    falaAtual++;
});

function atualizarBarraDeProgresso(gatosAtual) {
  const barra = document.querySelector('.barra-progresso');
  const objetivoFinal = 100000; 
  const porcentagem = Math.min((gatosAtual / objetivoFinal) * 100, 100);
  
  barra.style.width = porcentagem + '%';

//   if (porcentagem >= 100) {
//     if (!document.querySelector('.mensagem-final')) {
//       mostrarMensagemFinal();
//     }
//   }
}

let finalComprado = false;

function comprarFinal(upgrade) {
    if (finalComprado) return;

    const custoFinal = 100000;
    if (parsedGem >= custoFinal) {
        parsedGem -= custoFinal;
        gem.innerHTML = Math.round(parsedGem);
        finalComprado = true;


        iniciarDialogoFinal(); // inicia o diálogo final
        musicafinal(); // toca a música final
    }
}

const falasFinais = [
    "É OQ? COMPROU O DAVI BRITO????",
    "Não acreditava que você conseguiria- Quer dizer... UOOOOOOOOOOOU",
    "PUTS GRILA MEU FI MUITO OBRIGADO!!!!!",
    "Muito obrigado mesmo! ATÉ!"
];

let indiceFinal = 0;

function iniciarDialogoFinal() {
    const container = document.getElementById("dialogo-final");
    container.style.display = "flex";
    document.getElementById("texto-dialogo-final").innerText = falasFinais[0];
    indiceFinal = 1;
}

function proximoDialogoFinal() {
    const texto = document.getElementById("texto-dialogo-final");
    if (indiceFinal < falasFinais.length) {
        texto.innerText = falasFinais[indiceFinal];
        indiceFinal++;
    } else {
        document.getElementById("dialogo-final").style.display = "none";
    }
}


function extras() {
    document.getElementById("carta-aniversario").style.display = "flex";
}

function fecharCarta() {
    document.getElementById("carta-aniversario").style.display = "none";
}


document.body.addEventListener('click', iniciarMusica, { once: true });
const musica = document.getElementById('musica-fundo');
function iniciarMusica() {
    
    musica.volume = 0.02; // Deixa o volume mais suave
    musica.play();


}
const clickSound = document.getElementById('click');
function somclick() {
    clickSound.currentTime = 1; // Reinicia o som para tocar do início
    
    clickSound.volume = 0.2; // Ajusta o volume do som de clique
    clickSound.play();
}

const somComprar = document.getElementById('somcomprar');

function somComprarUpgrade() {
    somComprar.currentTime = 0.68; // Reinicia o som para tocar do início
    somComprar.volume = 0.1; // Ajusta o volume do som de compra
    somComprar.play();
}

function musicafinal() {
    musica.pause(); // Pausa a música de fundo
    const somCalma = document.getElementById('somcalma');
    somCalma.volume = 0.1; // Ajusta o volume do som de calma
    somCalma.play();
    somCalma.loop = true; // Loop infinito
}