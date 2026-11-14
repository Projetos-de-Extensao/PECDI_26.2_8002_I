---
id: brainstorm
title: Brainstorm
---

# Brainstorm

## Introdução

O brainstorm é uma técnica de elicitação de requisitos que consiste em reunir a equipe e discutir tópicos gerais do projeto apresentados no documento de problema de negócio. Durante a atividade, o diálogo é incentivado e críticas são evitadas para permitir que todos colaborem com suas próprias ideias.

## Metodologia

A equipe se reuniu para debater ideias gerais sobre o projeto por chamada de vídeo, das 19h às 21h do dia 17/09/2026. Todos os participantes atuaram como líderes, organizando-se conforme suas afinidades e direcionando uns aos outros com questões pré-elaboradas. As respostas foram transcritas para este documento.

## Versão 1.0

## Perguntas

### 1. Qual é o objetivo principal da aplicação?

- **Pedro Victor:** Automatizar todo o fluxo do teste de progresso, desde a inscrição do aluno até a distribuição e a alocação automatizada das salas do campus.
- **Bruno Borges:** Garantir que a coordenação consiga organizar a alocação dos recursos físicos e o ensalamento de forma ágil, sem conflitos de horários ou capacidade.
- **Marcus Brasil:** Proporcionar ao aluno uma experiência simples para realizar a inscrição, consultar sua sala ou prédio e emitir o comprovante de alocação instantaneamente.
- **Pedro Victor:** Reduzir significativamente os erros operacionais e o tempo gasto no gerenciamento manual das turmas e dos espaços da faculdade.

### 2. Como será o processo de cadastro?

- **Pedro Victor:** Autenticação e cadastro por matrícula ou ID institucional, com preenchimento automático das informações do aluno, como curso, período e campus.
- **Bruno Borges:** Cadastro simplificado e centralizado para que administradores realizem a carga de dados de turmas, professores, salas disponíveis e respectivos limites de assentos.
- **Marcus Brasil:** Integração direta com a base de dados da universidade, exigindo apenas a validação do e-mail acadêmico ou CPF no primeiro acesso.
- **Pedro Victor:** Validação automática para garantir que apenas alunos devidamente matriculados tenham acesso à consulta de salas.

### 3. Como a aplicação tratará o limite de capacidade e a infraestrutura das salas?

- **Pedro Victor:** O sistema deve ter travas automáticas para que o número de alunos alocados nunca ultrapasse a quantidade de carteiras ou assentos disponíveis na sala cadastrada.
- **Bruno Borges:** As salas devem ter marcadores de recursos, como acessibilidade, ar-condicionado, projetor e computadores, para garantir a alocação correta de alunos com necessidades específicas.
- **Marcus Brasil:** Ao atingir o limite máximo de vagas de um bloco ou sala, o algoritmo de alocação deve direcionar automaticamente os próximos estudantes para a sala ou o prédio mais próximo dentro do mesmo campus.
- **Bruno Borges:** Permitir o cadastro detalhado do tipo de carteira e da disposição espacial do ambiente para auditorias de capacidade do campus.

### 4. Como será o processo de alocação automática dos alunos nas salas?

- **Pedro Victor:** A alocação deve utilizar um algoritmo que distribua os alunos priorizando critérios como curso, período ou ordem alfabética, para evitar fraudes ou colas no teste de progresso.
- **Bruno Borges:** O administrador gera o ensalamento automático em poucos cliques, com base no total de inscritos por campus e na capacidade de cada sala.
- **Marcus Brasil:** Deve existir uma opção de reordenamento manual pela coordenação antes da publicação da listagem final, para ajustes pontuais de emergência.
- **Marcus Brasil:** Notificação automática aos alunos assim que o algoritmo concluir e publicar o mapa final de salas.

### 5. O que acontece em caso de imprevistos no dia da prova?

- **Pedro Victor:** O sistema precisa permitir o remanejamento rápido de toda uma turma de uma sala para outra em tempo real, enviando uma notificação de emergência ao painel do aluno.
- **Bruno Borges:** O administrador deve conseguir realocar os alunos afetados para salas de contingência previamente cadastradas como reservas.
- **Marcus Brasil:** A aplicação deve gerar uma lista de presença atualizada instantaneamente para que o fiscal de prova saiba exatamente quem mudou de sala.
- **Pedro Victor:** O status da sala no painel geral do campus deve ser atualizado para **Interditada**, impedindo novas alocações acidentais.

### 6. Quais relatórios ou comprovantes o sistema deve emitir após o encerramento das inscrições?

- **Pedro Victor:** Emissão em PDF do comprovante individual de ensalamento, contendo QR Code para validação na entrada do prédio ou sala.
- **Bruno Borges:** Relatórios consolidados para a coordenação, com total de alunos alocados por campus, taxa de ocupação das salas e lista oficial de chamada por sala.
- **Marcus Brasil:** Relatório de pendências e vagas remanescentes para identificar rapidamente salas subutilizadas ou alunos sem alocação confirmada.
- **Bruno Borges:** Exportação de planilhas de presença e totais por bloco nos formatos CSV e Excel para auditoria acadêmica.

## Requisitos elicitados

> Os requisitos abaixo foram redigidos na consolidação de 14/11/2026 **a partir das respostas Q1 a Q6**, sem acrescentar requisitos novos. A priorização e os critérios de aceitação estão em [Histórias de Usuário](../requisitos/historias-de-usuario.md), onde cada BS aparece na coluna "Origem" do mapeamento.

| ID | Descrição | Origem |
| --- | --- | --- |
| BS01 | O cliente (aluno) deve poder acessar o sistema com matrícula ou ID institucional, com curso, período e campus preenchidos automaticamente. | Q2 |
| BS02 | O cliente (aluno) deve poder realizar a inscrição e consultar sua sala ou prédio. | Q1 |
| BS03 | O cliente (aluno) deve poder emitir o comprovante de alocação em PDF, com QR Code para validação na entrada. | Q1, Q6 |
| BS04 | O cliente (aluno) deve ser notificado automaticamente quando o mapa final de salas for publicado. | Q4 |
| BS05 | O cliente (coordenação) deve poder cadastrar de forma centralizada turmas, professores, salas disponíveis e limites de assentos. | Q2 |
| BS06 | O cliente (coordenação) deve poder gerar o ensalamento automático em poucos cliques, com base nos inscritos por campus e na capacidade de cada sala. | Q4 |
| BS07 | O cliente (coordenação) deve poder reordenar manualmente a distribuição antes da publicação da listagem final. | Q4 |
| BS08 | O cliente (coordenação) deve poder remanejar uma turma de sala em tempo real, inclusive para salas de contingência, com notificação de emergência ao painel do aluno. | Q5 |
| BS09 | O cliente (coordenação) deve poder obter relatórios consolidados (alunos por campus, taxa de ocupação, lista de chamada por sala, pendências e vagas remanescentes) e exportá-los em CSV e Excel. | Q6 |
| BS10 | O produto deve impedir que o número de alunos alocados ultrapasse a capacidade de assentos da sala. | Q3 |
| BS11 | O produto deve registrar os recursos das salas (acessibilidade, ar-condicionado, projetor, computadores) para alocar corretamente alunos com necessidades específicas. | Q3 |
| BS12 | O produto deve direcionar automaticamente os próximos estudantes para a sala ou prédio mais próximo do mesmo campus quando o limite de vagas for atingido. **Pendente de validação** (rebaixado a Won't nas Histórias). | Q3 |
| BS13 | O produto deve validar automaticamente que apenas alunos matriculados consultem as salas. | Q2 |
| BS14 | O produto deve distribuir os alunos por critérios como curso, período ou ordem alfabética. | Q4 |
| BS15 | O produto deve marcar a sala afetada como "Interditada", bloqueando novas alocações, e gerar a lista de presença atualizada para o fiscal. | Q5 |

## Conclusão

Com a aplicação da técnica, foi possível elicitar os primeiros requisitos do projeto (BS01 a BS15). O brainstorm não tratou de turnos de prova; a decisão de que o aluno escolhe o turno na inscrição está registrada nas Histórias de Usuário. Nas respostas, "bloco" é usado com sentido próximo ao de "prédio".

## Referências bibliográficas

> OSBORN, Alex Faickney. *Applied Imagination: Principles and Procedures of Creative Thinking*. New York: Charles Scribner's Sons, 1953.

## Autoria

| Data | Versão | Descrição | Autor(es) |
| --- | --- | --- | --- |
| 17/09/2026 | 1.0 | Criação do documento | Pedro Victor |
| 14/11/2026 | 1.1 | Consolidação: redação dos requisitos BS01 a BS15 a partir das respostas, com coluna de origem; notas de turno e de terminologia | Equipe |