// Define a data alvo
function toggleMenu() {
  var menu = document.querySelector('.container-menu');
  menu.classList.toggle('show');
}

const dataAlvo = new Date('September 15, 2024 09:00:00').getTime();

// Atualiza o contador a cada segundo
const intervalo = setInterval(function() {
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;

    // Cálculo do tempo restante
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    // Exibe o resultado no elemento com id="contadordias"
    document.getElementById('contadordias').innerHTML = `${dias} DIAS`;
    document.getElementById('contador').innerHTML = `${horas}:${minutos}:${segundos}`;
    
    // Se a contagem terminar, exibe uma mensagem
    if (diferenca < 0) {
        clearInterval(intervalo);
        document.getElementById('contadordias').innerHTML = `0 DIAS`;
        document.getElementById('contador').innerHTML = `00:00:00`;
    }
}, 1000);

let porcentagem = 90;

// Espera o carregamento do conteúdo da página antes de iniciar a animação
window.onload = function() {
  // Aplica a porcentagem ao estilo da barra com a animação
  document.getElementById('barra').style.width = `${porcentagem}%`;
};
