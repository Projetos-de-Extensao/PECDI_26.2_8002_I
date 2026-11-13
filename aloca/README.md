# Teste de Progresso – app React + JSON Server

Sistema de alocação do Teste de Progresso com três perfis: **Aluno**, **Coordenação** e **Professor (fiscal de sala)**.
Os dados ficam numa API fake (JSON Server) no arquivo `api/db.json`, então nada se perde ao recarregar a página.

## Rodar (dois terminais, os dois na pasta `aloca`)

```powershell
# só na primeira vez
npm install

# Terminal 1: API fake em http://localhost:8000
npm run api

# Terminal 2: app em http://localhost:5173
npm run dev
```

Para voltar aos dados de exemplo (apaga o que foi feito no app):

```powershell
npm run api:reset
```

## API (JSON Server)

| Recurso | Rotas | O que guarda |
|---|---|---|
| `/edicao` | `GET`, `PATCH` | data, horário, campus, alocação, publicação, registro de alterações |
| `/salas` | `GET`, `POST`, `PATCH /salas/:id` | salas, capacidade e se está interditada |
| `/alunos` | `GET`, `PATCH /alunos/:id` | alunos, pendências, inscrição e aviso de mudança de sala |

No app, as chamadas ficam em `src/api.js` e usam `/api/...`. O proxy do Vite (`vite.config.js`) repassa para `http://localhost:8000`.

## Estrutura

```
api/
├── db.json                  banco usado pela API (muda quando o app salva)
└── db.inicial.json          cópia com os dados de exemplo (usada pelo api:reset)
src/
├── App.jsx                  busca os dados (useEffect), define as ações e as rotas de cada perfil
├── api.js                   funções fetch para a API
├── main.jsx                 ponto de entrada (HashRouter)
├── dados.js                 constantes (aluno logado, campi, tela inicial de cada perfil)
├── regras.js                funções de cálculo (ocupação, distribuição...)
├── index.css                estilos e cores de cada perfil
├── components/              Header, Footer, Aviso, TituloPagina, Registro
└── pages/
    ├── Acesso.jsx           login com escolha de perfil
    ├── aluno/               Inscricao, MinhaProva
    ├── coordenacao/         Painel, PrepararEdicao, Distribuicao, Remanejamento, Listas
    └── professor/           ListaSala
```

## Como o código funciona

1. O `App.jsx` busca `edicao`, `salas` e `alunos` na API quando abre (`useEffect`) e guarda tudo em `dados`.
2. Toda tela recebe `dados` por props e calcula o que precisa mostrar.
3. Quando o usuário faz algo (inscrever, gerar, publicar...), a tela chama uma função do `App`, que grava na API e busca os dados de novo.

## Fluxo para testar

1. **Aluno**: confirmar inscrição.
2. **Coordenação**: Preparar edição → importar alunos → Distribuição → gerar → publicar.
3. **Aluno**: Minha prova mostra a sala e o comprovante.
4. **Professor**: Minha sala mostra a lista e marca presença.
5. **Coordenação**: Remanejamento interdita uma sala e move os alunos; o aluno vê o aviso de mudança.

Recarregue a página em qualquer etapa: os dados continuam lá. Abra `http://localhost:8000/edicao` no navegador para ver o que foi gravado.
