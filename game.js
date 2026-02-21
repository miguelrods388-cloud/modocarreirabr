// =============================
// BASE DE DADOS DE CLUBES
// =============================

const clubes = [
  { nome: "Flamengo", liga: "Brasil", forca: 85 },
  { nome: "Palmeiras", liga: "Brasil", forca: 84 },
  { nome: "São Paulo", liga: "Brasil", forca: 78 },
  { nome: "Real Madrid", liga: "Europa", forca: 95 },
  { nome: "Barcelona", liga: "Europa", forca: 92 },
  { nome: "Manchester City", liga: "Europa", forca: 94 },
  { nome: "PSG", liga: "Europa", forca: 90 },
  { nome: "Al Hilal", liga: "Arabia", forca: 82 },
  { nome: "Al Nassr", liga: "Arabia", forca: 80 },
  { nome: "LA Galaxy", liga: "MLS", forca: 75 },
  { nome: "Shanghai Port", liga: "China", forca: 78 },
  { nome: "Kawasaki Frontale", liga: "Japão", forca: 79 }
];

// =============================
// JOGADOR
// =============================

let player = {
  nome: "Novo Talento",
  idade: 18,
  clube: clubes[0],
  status: "Base",
  contrato: 3,
  valor: 5,
  atributos: {
    tecnico: 65,
    fisico: 70,
    mental: 60
  },
  total: {
    partidas: 0,
    gols: 0,
    assistencias: 0,
    titulos: 0
  }
};

// =============================
// SISTEMA DE TEMPORADA
// =============================

function passarAno(){

  if(player.idade >= 40){
    output("🏁 O jogador se aposentou!");
    return;
  }

  let desempenho = (player.atributos.tecnico + player.atributos.mental) / 2;
  let chanceTitulo = (player.clube.forca + desempenho) / 2;

  let partidas = Math.floor(Math.random() * 50) + 10;
  let gols = Math.floor((desempenho / 10) + Math.random()*5);
  let assist = Math.floor(Math.random() * 10);

  player.total.partidas += partidas;
  player.total.gols += gols;
  player.total.assistencias += assist;

  if(Math.random() * 100 < chanceTitulo/2){
    player.total.titulos++;
  }

  evoluir();
  declinio();
  ajustarStatus();

  player.idade++;
  player.contrato--;

  if(player.contrato <= 0){
    mercado();
  }

  salvarAuto();

  output(`
    📅 Temporada Finalizada<br><br>
    Clube: ${player.clube.nome}<br>
    Partidas: ${partidas}<br>
    Gols: ${gols}<br>
    Assistências: ${assist}<br>
    Títulos na carreira: ${player.total.titulos}
  `);

  atualizarTela();
}

// =============================
// EVOLUÇÃO
// =============================

function evoluir(){
  if(player.idade <= 28){
    player.atributos.tecnico += 2;
    player.atributos.fisico += 2;
    player.valor += 3;
  }
}

function declinio(){
  if(player.idade > 33){
    player.atributos.fisico -= 2;
    player.valor -= 2;
  }
}

// =============================
// STATUS
// =============================

function ajustarStatus(){
  if(player.total.gols > 300) player.status = "Lenda";
  else if(player.total.gols > 200) player.status = "Ídolo";
  else if(player.total.gols > 100) player.status = "Estrela";
  else if(player.total.gols > 50) player.status = "Titular";
  else if(player.total.gols > 20) player.status = "Promessa";
}

// =============================
// MERCADO
// =============================

function mercado(){

  let ofertas = [];

  clubes.forEach(clube => {
    if(clube.forca >= player.clube.forca - 5){
      let valorOferta = Math.floor(player.valor + Math.random()*10);
      ofertas.push(`${clube.nome} oferece €${valorOferta}M`);
    }
  });

  if(player.idade >= 35){
    ofertas.push("Oferta da MLS");
    ofertas.push("Oferta da Arabia Saudita");
  }

  output("💼 Ofertas:<br><br>" + ofertas.join("<br>"));
}

// =============================
// UTILIDADES
// =============================

function atualizarTela(){
  document.getElementById("playerInfo").innerHTML = `
    <strong>${player.nome}</strong><br>
    Idade: ${player.idade}<br>
    Clube: ${player.clube.nome} (${player.clube.liga})<br>
    Status: ${player.status}<br>
    Valor: €${player.valor}M<br>
    Contrato: ${player.contrato} anos
  `;
}

function verEstatisticas(){
  output(`
    📊 Carreira<br><br>
    Partidas: ${player.total.partidas}<br>
    Gols: ${player.total.gols}<br>
    Assistências: ${player.total.assistencias}<br>
    Títulos: ${player.total.titulos}
  `);
}

function salvar(){
  localStorage.setItem("saveV2", JSON.stringify(player));
  alert("Jogo salvo!");
}

function carregar(){
  let save = localStorage.getItem("saveV2");
  if(save){
    player = JSON.parse(save);
    atualizarTela();
    alert("Save carregado!");
  }
}

function salvarAuto(){
  localStorage.setItem("saveV2", JSON.stringify(player));
}

function output(texto){
  document.getElementById("output").innerHTML = texto;
}

atualizarTela();
