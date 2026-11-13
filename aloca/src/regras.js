// Regras do sistema: funções que recebem dados e devolvem um resultado.
import { ALUNO_LOGADO } from './dados.js'

// Quantos alunos estão na sala
export function ocupacao(alocacao, salaId) {
  return Object.values(alocacao).filter((id) => id === salaId).length
}

// Salas que não foram interditadas
export function salasAtivas(salas) {
  return salas.filter((s) => s.ativa)
}

// Alunos sem pendência de cadastro. O aluno logado só entra se confirmou a inscrição.
export function alunosAptos(alunos, inscrito) {
  return alunos.filter((a) => !a.pendencia && (a.id !== ALUNO_LOGADO || inscrito))
}

// Coloca cada aluno na primeira sala ativa que ainda tem vaga
export function gerarDistribuicao(aptos, salas) {
  const alocacao = {}
  for (const aluno of aptos) {
    const sala = salasAtivas(salas).find((s) => ocupacao(alocacao, s.id) < s.capacidade)
    if (sala) alocacao[aluno.id] = sala.id
  }
  return alocacao
}

// '2026-11-20' vira '20/11/2026'
export function formatarData(data) {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

// Hora atual, ex.: '14:05'
export function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
