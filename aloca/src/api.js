// Comunicação com a API fake (JSON Server).
// O Vite repassa /api para http://localhost:8000 (ver vite.config.js).

async function pedir(caminho, metodo = 'GET', dados) {
  const resposta = await fetch('/api' + caminho, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: dados ? JSON.stringify(dados) : undefined,
  })
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} em ${caminho}`)
  return resposta.json()
}

// Edição: configuração, alocação, publicação e registro
export const lerEdicao = () => pedir('/edicao')
export const atualizarEdicao = (dados) => pedir('/edicao', 'PATCH', dados)

// Salas
export const listarSalas = () => pedir('/salas')
export const criarSala = (sala) => pedir('/salas', 'POST', sala)
export const atualizarSala = (id, dados) => pedir(`/salas/${id}`, 'PATCH', dados)

// Alunos
export const listarAlunos = () => pedir('/alunos')
export const atualizarAluno = (id, dados) => pedir(`/alunos/${id}`, 'PATCH', dados)
