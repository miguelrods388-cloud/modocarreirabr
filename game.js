<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Modo Carreira Pro</title>
<style>
body {
  font-family: Arial;
  background: #0f172a;
  color: white;
  text-align: center;
}

.card {
  background: #1e293b;
  padding: 20px;
  margin: 20px auto;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 15px #00f2ff44;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background: #00f2ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.news {
  background: #111827;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
}
</style>
</head>
<body>

<h1>⚽ Modo Carreira Pro</h1>

<div class="card" id="playerCard"></div>
<div class="card" id="market"></div>
<div class="card">
<button onclick="simularTemporada()">Simular Temporada</button>
<button onclick="abrirMercado()">Abrir Mercado</button>
</div>

<script>

// ========================
// BANCO DE LIGAS
// ========================

const ligas = [
  {
    nome: "Premier League",
    reputacao: 5,
    clubes: [
      { nome: "Manchester City", poder: 95 },
      { nome: "Liverpool", poder: 90 },
      { nome: "Arsenal", poder: 85 },
      { nome: "Chelsea", poder: 85 }
    ]
  },
  {
    nome: "La Liga",
    reputacao: 5,
    clubes: [
      { nome: "Real Madrid", poder: 95 },
      { nome: "Barcelona", poder: 92 },
      { nome: "Atletico Madrid", poder: 88 }
    ]
  },
  {
    nome: "Brasileirão",
    reputacao: 3,
    clubes: [
      { nome: "Flamengo", poder: 80 },
      { nome: "Palmeiras", poder: 78 },
      { nome: "São Paulo", poder: 70 }
    ]
  },
  {
    nome: "Saudi League",
    reputacao: 3,
    clubes: [
      { nome: "Al Hilal", poder: 90 },
      { nome: "Al Nassr", poder: 88 }
    ]
  }
]

// ========================
// JOGADOR
// ========================

let jogador = {
  nome: "Théo Leme",
  idade: 17,
  overall: 72,
  potencial: 88,
  valor: 10000000,
  moral: 80,
  clube: "Base Brasil",
  empresario: "Sem empresário"
}

// ========================
// FUNÇÕES UTILITÁRIAS
// ========================

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5)
}

// ========================
// INTERFACE
// ========================

function atualizarTela() {
  document.getElementById("playerCard").innerHTML = `
    <h2>${jogador.nome}</h2>
    <p>Idade: ${jogador.idade}</p>
    <p>Overall: ${jogador.overall}</p>
    <p>Potencial: ${jogador.potencial}</p>
    <p>Valor: €${jogador.valor.toLocaleString()}</p>
    <p>Moral: ${jogador.moral}</p>
    <p>Clube: ${jogador.clube}</p>
    <p>Empresário: ${jogador.empresario}</p>
  `
}

atualizarTela()

// ========================
// SISTEMA DE MERCADO
// ========================

function gerarClubesInteressados() {
  let todos = ligas.flatMap(l => 
    l.clubes.map(c => ({...c, reputacao: l.reputacao}))
  )

  let filtrados = todos.filter(c =>
    c.poder >= jogador.overall
  )

  return embaralhar(filtrados).slice(0, 3)
}

function gerarProposta(clube) {
  let tipo = Math.random()

  if (tipo < 0.6) {
    let valorOferta = jogador.valor * (0.9 + Math.random() * 0.3)
    return `Compra definitiva por €${Math.floor(valorOferta).toLocaleString()}`
  }

  if (tipo < 0.85) {
    return "Empréstimo 1 ano com opção de compra"
  }

  return "Troca + €5M"
}

function abrirMercado() {
  let clubes = gerarClubesInteressados()
  let html = "<h3>Ofertas Recebidas</h3>"

  clubes.forEach(clube => {
    html += `
      <div class="news">
        <b>${clube.nome}</b><br>
        ${gerarProposta(clube)}<br>
        <button onclick="aceitarOferta('${clube.nome}')">Aceitar</button>
      </div>
    `
  })

  document.getElementById("market").innerHTML = html
}

// ========================
// ACEITAR PROPOSTA
// ========================

function aceitarOferta(nomeClube) {
  jogador.clube = nomeClube
  jogador.valor += 2000000
  jogador.moral += 5
  gerarNoticia(nomeClube)
  atualizarTela()
  document.getElementById("market").innerHTML = ""
}

// ========================
// SISTEMA DE NOTÍCIA
// ========================

function gerarNoticia(clube) {
  alert(`📰 ${clube} anuncia contratação de ${jogador.nome}!`)
}

// ========================
// TEMPORADA
// ========================

function simularTemporada() {

  let gols = random(5, 25)
  let assist = random(3, 15)

  jogador.overall += random(0,2)
  jogador.valor += gols * 500000
  jogador.idade += 1

  if (jogador.overall > jogador.potencial) {
    jogador.overall = jogador.potencial
  }

  alert(`
Temporada Finalizada!

Gols: ${gols}
Assistências: ${assist}
Novo Overall: ${jogador.overall}
Novo Valor: €${jogador.valor.toLocaleString()}
  `)

  atualizarTela()
}

</script>

</body>
</html>
