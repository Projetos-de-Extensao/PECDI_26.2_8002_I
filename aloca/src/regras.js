// Funções puras com as regras do sistema.
// Recebem dados e devolvem resultados, sem mexer no estado.

// Quantos alunos estão na sala
export function ocupacao(alocacao, salaId) {
  return Object.values(alocacao).filter((id) => id === salaId).length
}

export function salasAtivas(salas) {
  return salas.filter((s) => s.ativa)
}

export function capacidadeTotal(salas) {
  return salasAtivas(salas).reduce((total, s) => total + s.capacidade, 0)
}

// Alunos sem pendência de cadastro. O aluno logado só entra se confirmou a inscrição.
export function alunosAptos(alunos, inscrito, alunoLogadoId) {
  return alunos.filter((a) => !a.pendencia && (a.id !== alunoLogadoId || inscrito))
}

export function alunosComPendencia(alunos) {
  return alunos.filter((a) => a.pendencia)
}

export function alunosSemSala(aptos, alocacao) {
  return aptos.filter((a) => !alocacao[a.id])
}

export function alunosDaSala(alunos, alocacao, salaId) {
  return alunos.filter((a) => alocacao[a.id] === salaId)
}

// Preenche as salas ativas em ordem, respeitando a capacidade de cada uma
export function gerarDistribuicao(aptos, salas) {
  const nova = {}
  const usados = {}
  aptos.forEach((aluno) => {
    const sala = salasAtivas(salas).find((s) => (usados[s.id] || 0) < s.capacidade)
    if (sala) {
      nova[aluno.id] = sala.id
      usados[sala.id] = (usados[sala.id] || 0) + 1
    }
  })
  return nova
}

// '2026-11-20' -> '20/11/2026'
export function formatarData(iso) {
  const partes = iso.split('-')
  return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : iso
}

export function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
