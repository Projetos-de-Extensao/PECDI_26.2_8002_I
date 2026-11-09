// Dados fictícios do protótipo. Nada é salvo: ao recarregar a página, tudo volta ao início.

// Aluno que "entra" no sistema quando o perfil escolhido é Aluno
export const ALUNO_LOGADO = 1

export const CONFIG_INICIAL = {
  data: '2026-11-20',
  hora: '09:00',
  campus: 'Campus Centro',
}

export const CAMPI = ['Campus Centro', 'Campus Barra', 'Campus Botafogo']

export const SALAS_INICIAIS = [
  { id: 1, codigo: 'A101', predio: 'Prédio A', capacidade: 4, recursos: 'Projetor', ativa: true },
  { id: 2, codigo: 'A102', predio: 'Prédio A', capacidade: 4, recursos: 'Acessibilidade', ativa: true },
  { id: 3, codigo: 'B201', predio: 'Prédio B', capacidade: 3, recursos: 'Projetor', ativa: true },
  { id: 4, codigo: 'B202', predio: 'Prédio B', capacidade: 4, recursos: '—', ativa: true },
]

export const ALUNOS_INICIAIS = [
  { id: 1, nome: 'Ana Souza', matricula: '2026001', curso: 'CDIA', pendencia: null },
  { id: 2, nome: 'Bruno Lima', matricula: '2026002', curso: 'CDIA', pendencia: null },
  { id: 3, nome: 'Carla Dias', matricula: '2026003', curso: 'Engenharia', pendencia: null },
  { id: 4, nome: 'Diego Rocha', matricula: '2026004', curso: 'Administração', pendencia: null },
  { id: 5, nome: 'Elisa Nunes', matricula: '2026005', curso: 'CDIA', pendencia: null },
  { id: 6, nome: 'Felipe Costa', matricula: '2026006', curso: 'Direito', pendencia: null },
  { id: 7, nome: 'Gabriela Alves', matricula: '2026007', curso: 'Economia', pendencia: null },
  { id: 8, nome: 'Heitor Matos', matricula: '2026008', curso: 'CDIA', pendencia: null },
  { id: 9, nome: 'Isabela Prado', matricula: '2026009', curso: 'Engenharia', pendencia: null },
  { id: 10, nome: 'João Pereira', matricula: '2026010', curso: 'Administração', pendencia: null },
  { id: 11, nome: 'Karina Melo', matricula: '', curso: 'Direito', pendencia: 'Matrícula ausente' },
  { id: 12, nome: 'Lucas Ferraz', matricula: '2026012', curso: '', pendencia: 'Curso não informado' },
]

// Tela inicial de cada perfil (usada no login e no link da marca)
export const INICIO = {
  acesso: '/',
  aluno: '/aluno/inscricao',
  coordenacao: '/coordenacao/painel',
  professor: '/professor/sala',
}
