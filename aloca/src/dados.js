// Constantes do app. Os dados (salas, alunos, edição) agora vêm da API: veja api/db.json.

// Aluno que "entra" no sistema quando o perfil escolhido é Aluno
export const ALUNO_LOGADO = '1'

export const CAMPI = ['Campus Centro', 'Campus Barra', 'Campus Botafogo']

// Tela inicial de cada perfil (usada no login e no link da marca)
export const INICIO = {
  acesso: '/',
  aluno: '/aluno/inscricao',
  coordenacao: '/coordenacao/painel',
  professor: '/professor/sala',
}
