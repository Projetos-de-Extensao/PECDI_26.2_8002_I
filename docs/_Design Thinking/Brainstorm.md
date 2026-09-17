---
id: brainstorm
title: Brainstorm
---
 
## Introdução
<p align = "justify">
O brainstorm é uma técnica de elicitação de requisitos que consiste em reunir a equipe e discutir sobre diversos tópicos gerais do projeto apresentados no documento problema de negócio. No brainstorm o diálogo é incentivado e críticas são evitadas para permitir que todos colaborem com suas próprias ideias.
</p>
 
## Metodologia
<p align = "justify">
A equipe se reuniu para debater ideias gerais sobre o projeto via chamada de vídeo, começou às 19h do dia 17/09/2026 e terminou às 21h, onde todos nós fomos líderes e nos organizamos com partes que cada um se dava melhor, direcionandoum um ao outro com questões pré-elaboradas, e transcrevendo as respostas para o documento.
</p>
 
## Brainstorm
 
## Versão 1.0
 
## Perguntas
 
### 1. Qual o objetivo principal da aplicação?
 
<p align = "justify">
<b>Pedro Victor</b> - Automatizar todo o fluxo do teste de progresso, desde a inscrição do aluno até a distribuição e alocação automatizada das salas do campus.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - Garantir que a coordenação consiga organizar a alocação dos recursos físicos e ensalamento de forma ágil e sem conflito de horários ou capacidade.
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - Proporcionar ao aluno uma experiência simples para realizar a inscrição, consultar sua sala/prédio e emitir o comprovante de alocação instantaneamente.
</p>
 
<p align = "justify">
<b>Pedro Victor</b> - Reduzir significativamente os erros operacionais e o tempo gasto no gerenciamento manual das turmas e espaços da faculdade.
</p>
 
---
 
### 2. Como será o processo para cadastro?
 
<p align = "justify">
<b>Pedro Victor</b> - Autenticação e cadastro via matrícula/ID institucional com preenchimento automático das informações do aluno (curso, período e campus).
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - Cadastro simplificado e centralizado para administradores realizarem a carga de dados de turmas, professores, salas disponíveis e seus respetivos limites de assentos.
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - Integração direta com a base de dados da universidade, exigindo apenas validação do e-mail acadêmico ou CPF no primeiro acesso.
</p>
 
<p align = "justify">
<b>Pedro Victor</b> - Validação automática para garantir que apenas alunos devidamente matriculados consigam acesso à consulta de salas.
</p>
 
---

### 3. Como a aplicação vai tratar o limite de capacidade e a infraestrutura das salas?
 
<p align = "justify">
<b>Pedro Victor</b> - O sistema deve ter travas automáticas para que o número de alunos alocados nunca ultrapasse a quantidade de carteiras/assentos disponíveis na sala cadastrada.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - As salas devem ter marcadores de recursos (ex: acessibilidade, ar-condicionado, projetor, computadores) para garantir a alocação correta de alunos com necessidades específicas.
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - Ao atingir o limite máximo de vagas de um bloco ou sala, o algoritmo de alocação deve direcionar automaticamente os próximos estudantes para a sala ou prédio mais próximo dentro do mesmo campus.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - Permitir o cadastro detalhado do tipo de carteira e disposição espacial do ambiente para auditorias de capacidade do campus.
</p>
 
---

### 4. Como será o processo de alocação automática dos alunos nas salas?
 
<p align = "justify">
<b>Pedro Victor</b> - A alocação deve utilizar um algoritmo que distribua os alunos priorizando critérios como curso, período ou ordem alfabética para evitar fraudes ou colas no teste de progresso.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - O administrador gera o ensalamento automático em poucos cliques com base no total de inscritos por campus e a capacidade total de cada sala.
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - Deve existir uma opção de reordenamento manual pela coordenação antes de publicar a listagem final, para ajustes pontuais de emergência.
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - Notificação automática para os alunos assim que o algoritmo concluir e publicar o mapa final de salas.
</p>
 
---

### 5. O que acontece em caso de imprevistos no dia da prova (ex: sala interditada ou falta de energia)?
 
<p align = "justify">
<b>Pedro Victor</b> - O sistema precisa permitir o remanejamento rápido de toda uma turma de uma sala para outra em tempo real, enviando notificação de emergência no painel do aluno.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - O administrador deve conseguir realocar os alunos afetados para salas de contingência cadastradas previamente como "reservas".
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - A aplicação deve gerar uma lista de presença atualizada instantaneamente para que o fiscal de prova saiba exatamente quem mudou de sala.
</p>
 
<p align = "justify">
<b>Pedro Victor</b> - O status da sala no painel geral do campus deve ser atualizado para "Interditada" impedindo novas alocações acidentais.
</p>
 
---

### 6. Quais relatórios ou comprovantes o sistema deve emitir após o encerramento das inscrições?
 
<p align = "justify">
<b>Pedro Victor</b> - Emissão em PDF do Comprovante de Ensalamento individual do aluno, contendo QR Code para validação na entrada do prédio/sala.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - Relatórios consolidados para a coordenação com total de alunos alocados por campus, taxa de ocupação das salas e lista oficial de chamada por sala.
</p>
 
<p align = "justify">
<b>Marcus Brasil</b> - Relatório de pendências e vagas remanescentes para identificação rápida de salas subutilizadas ou alunos sem alocação confirmada.
</p>
 
<p align = "justify">
<b>Bruno Borges</b> - Exportação de planilhas de presenciais e totais por bloco em formato CSV/Excel para auditoria acadêmica.
</p>
 
### Requisitos elicitados
 
|ID|Descrição|
|----|-------------|
|BS01| O cliente...|
|BS02| O cliente...|
|BS03| O cliente...|
|BS04| O cliente...|
|BS05| O cliente...|
|BS06| O cliente...|
|BS07| O cliente...|
|BS08| O cliente...|
|BS09| O cliente...|
|BS10| O produto...|
|BS11| O produto...|
|BS12| O produto...|
|BS13| O produto...|
|BS14| O produto...|
|BS15| O produto...|
 
## Conclusão
<p align = "justify">
Através da aplicação da técnica, foi possível elicitar alguns dos primeiros requisitos do projeto.
</p>
## Referências Bibliográficas
 
> OSBORN, Alex Faickney. Applied Imagination: Principles and Procedures of Creative Thinking. New York: Charles Scribner's Sons, 1953.
 
 
## Autor(es)
| Data | Versão | Descrição | Autor(es) |
| -- | -- | -- | -- |
| 17/09/2026 | 1.0 | Criação do documento | Pedro Victor |
