# Teste de Progresso – app React

Sistema de alocação do Teste de Progresso com três perfis: **Aluno**, **Coordenação** e **Professor (fiscal de sala)**.
Protótipo com dados fictícios: nada é salvo ao recarregar a página.

## Rodar

```bash
cd app
npm install
npm run dev
```

## Estrutura

```
src/
├── App.jsx                  estado do sistema (useState) e rotas
├── main.jsx                 ponto de entrada (HashRouter)
├── dados.js                 salas, alunos e configuração fictícios
├── regras.js                funções de cálculo (ocupação, distribuição...)
├── index.css                estilos e cores de cada perfil
├── components/              Header, Footer, Aviso, TituloPagina, Registro, RotaProtegida
└── pages/
    ├── Acesso.jsx           login com escolha de perfil
    ├── aluno/               Inscricao, MinhaProva
    ├── coordenacao/         Painel, PrepararEdicao, Distribuicao, Remanejamento, Listas
    └── professor/           ListaSala
```

## Fluxo para testar

1. **Aluno**: confirmar inscrição.
2. **Coordenação**: Preparar edição → importar alunos → Distribuição → gerar → publicar.
3. **Aluno**: Minha prova mostra a sala e o comprovante.
4. **Professor**: Minha sala mostra a lista e marca presença.
5. **Coordenação**: Remanejamento interdita uma sala e move os alunos; o aluno vê o aviso de mudança.
