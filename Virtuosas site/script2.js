// Define a data alvo
function toggleMenu() {
  var menu = document.querySelector('.container-menu');
  menu.classList.toggle('show');
}


function atualizarCronometro() {
    const agora = new Date();
    const anoAtual = agora.getFullYear();

    // Data alvo: 14 de setembro às 9h
    const dataAlvo = new Date(anoAtual, 8, 14, 9, 0, 0); // Mês 8 = Setembro

    // Diferença em milissegundos
    const diferenca = dataAlvo - agora;

    if (diferenca <= 0) {
        // Quando chegar na data, zera e para
        document.getElementById('dias').textContent = 0;
        document.getElementById('horas').textContent = "00";
        document.getElementById('minutos').textContent = "00";
        document.getElementById('segundos').textContent = "00";
        clearInterval(intervalo);
        return;
    }

    // Calcula dias, horas, minutos e segundos restantes
    const segundosTotais = Math.floor(diferenca / 1000);
    const dias = Math.floor(segundosTotais / (24 * 3600));
    const horas = Math.floor((segundosTotais % (24 * 3600)) / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    // Atualiza o HTML
    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
}

// Atualiza o contador a cada segundo
const intervalo = setInterval(atualizarCronometro, 1000);
atualizarCronometro(); // Atualiza logo que carrega a página


function animarNumero(elemento, valorFinal) {
  let valorAtual = 0;

  // Verifica se é um número pequeno (6 ou 10)
  const isPequeno = valorFinal <= 10;

  const duracaoTotal = isPequeno ? (valorFinal === 6 ? 2500 : 2500) : 2000;
  const incremento = isPequeno ? 1 : Math.ceil(valorFinal / 60);
  const frames = isPequeno ? valorFinal : Math.ceil(valorFinal / incremento);
  const delayPorFrame = duracaoTotal / frames;

  function atualizar() {
    valorAtual += incremento;
    if (valorAtual >= valorFinal) {
      valorAtual = valorFinal;
      elemento.textContent = "+" + valorAtual.toLocaleString();
    } else {
      elemento.textContent = "+" + valorAtual.toLocaleString();
      setTimeout(atualizar, delayPorFrame);
    }
  }

  atualizar();
}

window.addEventListener('load', () => {
  const numeros = [
    { id: 'numero-mulheres', valor: 3000 },
    { id: 'numero-edicoes', valor: 6 },
    { id: 'numero-patrocinadores', valor: 10 },
  ];

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numeros.forEach(({ id, valor }) => {
          const el = document.getElementById(id);
          if (el && el.textContent === "+0") {
            animarNumero(el, valor);
          }
        });
        obs.disconnect();
      }
    });
  }, options);

  const container = document.querySelector('.container-numerosvirtuosas');
  if (container) {
    numeros.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "+0";
    });

    observer.observe(container);
  }
});
