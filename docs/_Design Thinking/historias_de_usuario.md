# Histórias de Usuário — Teste de Progresso (Sistema de Alocação)

## 1. Introdução

Este documento reúne as histórias de usuário do sistema de alocação de alunos para o Teste de Progresso, derivadas do cenário, da análise de tarefas e do protótipo. Ele apresenta as personas, as histórias com critérios de aceitação, os épicos, a priorização (MoSCoW) e o mapeamento entre histórias, telas e tarefas.

As histórias seguem o formato padrão: "Como [persona], quero [ação] para [benefício]".

**Códigos usados neste documento**

| Código | Significado |
|---|---|
| US01 a US19 | História de usuário |
| E1 a E6 | Épico |
| T01 a T15 | Tela da interface |
| T1 a T10 | Tarefa da análise de tarefas |

> Atenção: os códigos de tela (T01 a T15) e de tarefa (T1 a T10) são parecidos. Sempre que aparecem juntos, as colunas indicam qual é qual.

## 2. Personas

| Persona | Descrição | Necessidade principal | Dificuldade principal |
|---|---|---|---|
| Aluno | Estudante regularmente matriculado que precisa realizar o Teste de Progresso. | Fazer a inscrição, saber data, horário, prédio e sala, e emitir o comprovante. | Não saber se a inscrição foi concluída, não encontrar a sala ou perder uma alteração de alocação. |
| Coordenação acadêmica | Responsável por organizar a aplicação e distribuir os alunos. | Configurar a aplicação, cadastrar salas e alunos, gerar, revisar e publicar a distribuição. | Dados incompletos, alunos sem sala e necessidade de remanejar em emergência. |
| Fiscal | Responsável por conferir a lista de alunos de uma sala no dia da prova. | Ter a lista atualizada e saber das alterações de sala ou prédio. | Lista desatualizada, alteração de última hora ou sala interditada. |

## 3. Histórias de usuário

### 3.1 Histórias para o aluno

- **US01** - Como aluno, quero acessar o sistema com minha matrícula ou e-mail institucional para consultar minhas informações de forma segura.
    - *Critério de aceitação: acesso validado em até 2 segundos; em caso de erro, a mensagem explica o problema e como tentar novamente, sem revelar dados confidenciais.*
- **US02** - Como aluno, quero realizar minha inscrição no Teste de Progresso para confirmar minha participação.
    - *Critério de aceitação: dados pré-preenchidos automaticamente, com campos pendentes sinalizados.*
    - *Critério de aceitação: ao concluir, o sistema exibe a confirmação e a nova situação da inscrição.*
- **US03** - Como aluno, quero consultar data, horário, campus, prédio e sala da minha prova para saber onde comparecer.
    - *Critério de aceitação: informações visíveis sem necessidade de abrir menus secundários.*
    - *Critério de aceitação: se a alocação ainda não foi publicada, o sistema informa essa condição em vez de exibir campos vazios.*
- **US04** - Como aluno, quero emitir um comprovante da minha alocação para apresentar no dia da prova.
    - *Critério de aceitação: comprovante com código de validação ou QR Code, disponível para salvar ou imprimir.*
- **US05** - Como aluno, quero ser avisado quando minha sala for alterada para não perder a prova.
    - *Critério de aceitação: notificação visível na tela inicial e na consulta de alocação.*

### 3.2 Histórias para a coordenação acadêmica

- **US06** - Como coordenação, quero configurar período, horários, campus e prédios da aplicação para preparar o Teste de Progresso.
    - *Critério de aceitação: dados salvos e refletidos na etapa de distribuição.*
- **US07** - Como coordenação, quero cadastrar salas com capacidade e recursos disponíveis para planejar a distribuição.
    - *Critério de aceitação: sistema impede capacidade zerada ou negativa.*
    - *Critério de aceitação: capacidade e ocupação atual são exibidas para cada sala.*
- **US08** - Como coordenação, quero importar ou cadastrar os dados dos alunos para disponibilizá-los à distribuição.
    - *Critério de aceitação: registros com pendência são listados separadamente dos aptos.*
- **US09** - Como coordenação, quero gerar a distribuição automática dos alunos nas salas para reduzir o trabalho manual.
    - *Critério de aceitação: processamento não ultrapassa a capacidade de nenhuma sala.*
    - *Critério de aceitação: ao final, o sistema informa os alunos sem alocação e as salas sem ocupação.*
- **US10** - Como coordenação, quero revisar conflitos e pendências antes da publicação para evitar erros de alocação.
    - *Critério de aceitação: alunos sem sala e salas com capacidade excedida são destacados.*
    - *Critério de aceitação: é possível ajustar manualmente uma alocação, com registro da alteração.*
- **US11** - Como coordenação, quero publicar a distribuição final para que os alunos possam consultar sua alocação.
    - *Critério de aceitação: publicação exige confirmação explícita e resumo prévio.*
- **US12** - Como coordenação, quero remanejar alunos em caso de imprevisto (sala interditada, falta de energia) para garantir a continuidade da aplicação.
    - *Critério de aceitação: sala afetada bloqueada para novas alocações e alunos notificados.*
- **US13** - Como coordenação, quero consultar listas e relatórios de ocupação para acompanhar a aplicação.
    - *Critério de aceitação: exportação em PDF ou planilha, com filtro por campus, prédio e sala.*
- **US19** - Como coordenação, quero um painel com o resumo da aplicação para acompanhar inscrições, salas, ocupação e pendências sem abrir várias telas.
    - *Critério de aceitação: o painel exibe, em uma única tela, total de inscritos, salas disponíveis, ocupação e pendências.*

### 3.3 Histórias para o fiscal

- **US14** - Como fiscal, quero acessar a lista atualizada de alunos de uma sala para conferir presença no dia da prova.
    - *Critério de aceitação: lista exibe data e hora da última atualização.*
- **US15** - Como fiscal, quero ser avisado sobre alterações de sala ou prédio para orientar os alunos corretamente.
    - *Critério de aceitação: alteração refletida na lista em tempo real (meta sugerida: até 1 minuto), sem necessidade de recarregar manualmente.*

### 3.4 Histórias técnicas (derivadas dos problemas identificados)

- **US16** - Como coordenação, quero que o sistema impeça que a capacidade de uma sala seja ultrapassada para evitar erros de alocação.
    - *Critério de aceitação: a confirmação é bloqueada com um alerta que mostra capacidade e ocupação.*
    - *Critério de aceitação: a regra vale na geração, no ajuste manual e no remanejamento.*
- **US17** - Como aluno ou fiscal, quero que consulta, comprovante e lista reflitam a nova sala assim que um remanejamento for confirmado para não agir com informação desatualizada.
    - *Critério de aceitação: após a confirmação, as telas de consulta (T04), comprovante (T05) e listas (T14) exibem a nova sala.*
- **US18** - Como coordenação, quero que o sistema faça a validação avançada dos dados importados de alunos e turmas para reduzir pendências na distribuição.
    - *Critério de aceitação: cada registro rejeitado indica qual dado precisa ser corrigido.*

## 4. Épicos

| Épico | Histórias | Objetivo |
|---|---|---|
| E1 — Acesso e inscrição do aluno | US01, US02 | Permitir que o aluno entre no sistema e confirme sua participação. |
| E2 — Consulta e comprovante do aluno | US03, US04, US05 | Garantir que o aluno saiba onde e quando fazer a prova. |
| E3 — Preparação da aplicação | US06, US07, US08, US18 | Cadastrar período, espaços e alunos necessários para a distribuição. |
| E4 — Distribuição de alunos nas salas | US09, US10, US11, US16 | Gerar, revisar e publicar a distribuição respeitando a capacidade das salas. |
| E5 — Imprevistos e remanejamento | US12, US15, US17 | Tratar alterações de sala e manter aluno, coordenação e fiscal informados. |
| E6 — Acompanhamento e relatórios | US13, US14, US19 | Oferecer visão geral, listas e relatórios da aplicação. |

## 5. Priorização (MoSCoW)

| Categoria | Histórias |
|---|---|
| **Must** | US01, US02, US03, US06, US07, US08, US09, US10, US11, US16 (críticas para o MVP) |
| **Should** | US04, US12, US13, US14, US17, US19 (importantes pós-lançamento) |
| **Could** | US05, US15 (melhorias de comunicação) |
| **Won't** | US18 (validação avançada de dados — postergada para v2.0) |

A priorização considera a cadeia de dependências da aplicação: a geração da distribuição (US09) depende da configuração (US06), das salas (US07) e dos alunos (US08), e a publicação (US11) deve ser sempre precedida da revisão (US10). O remanejamento (US12) permanece como Should por ser o ponto mais sensível da operação, mas pode ser antecipado se a coordenação indicar que a aplicação depende dele.

## 6. Telas de interface

| Código | Tela | Usuário principal | Descrição |
|---|---|---|---|
| T01 | Tela de acesso | Aluno, coordenação e fiscal | Permitir a entrada na aplicação por meio de identificação institucional. |
| T02 | Tela inicial do aluno | Aluno | Apresentar a situação da inscrição e o caminho para consultar a alocação. |
| T03 | Tela de inscrição | Aluno | Permitir confirmar ou completar os dados necessários para participar do teste. |
| T04 | Tela de consulta da alocação | Aluno | Apresentar data, horário, campus, prédio e sala. |
| T05 | Tela do comprovante | Aluno | Exibir e permitir a emissão do comprovante individual. |
| T06 | Painel da coordenação | Coordenação | Apresentar o resumo da aplicação, inscrições, salas, ocupação e pendências. |
| T07 | Tela de configuração da aplicação | Coordenação | Dados cadastrais, horários, campus e demais parâmetros do teste. |
| T08 | Tela de cadastro de salas | Coordenação | Registrar salas, capacidade, localização e recursos disponíveis. |
| T09 | Tela de cadastro ou importação | Coordenação | Incluir alunos, turmas e demais dados necessários para a distribuição. |
| T10 | Tela de geração da distribuição | Coordenação | Definir critérios e executar a distribuição dos alunos. |
| T11 | Tela de revisão da distribuição | Coordenação | Conferir ocupações, conflitos, pendências e ajustes necessários. |
| T12 | Tela de publicação | Coordenação | Publicar a distribuição final para os alunos e responsáveis. |
| T13 | Tela de remanejamento | Coordenação | Transferir alunos ou turmas para salas de contingência. |
| T14 | Tela de listas e relatórios | Coordenação e Fiscal | Consultar listas por sala, ocupação, pendências e alterações. |
| T15 | Tela de aviso | Todos os usuários | Informar sucesso, erro, pendência, alteração ou indisponibilidade. |

## 7. Tarefas principais

| Código | Tarefa | Descrição | Pessoa responsável | Telas |
|---|---|---|---|---|
| T1 | Acessar a aplicação | Entrar no sistema e ser direcionado ao espaço correspondente ao perfil do usuário. | Aluno, coordenação ou fiscal | T01, T02 e T06 |
| T2 | Realizar a inscrição | Confirmar ou completar os dados necessários para participar do Teste de Progresso. | Aluno | T02 e T03 |
| T3 | Configurar a aplicação | Cadastrar período, horários, campus, prédios e salas disponíveis. | Coordenação | T06, T07 e T08 |
| T4 | Carregar os dados dos alunos | Inserir ou importar alunos, turmas e demais informações necessárias para a distribuição. | Coordenação | T06 e T09 |
| T5 | Gerar a distribuição | Distribuir os alunos nas salas respeitando capacidades e critérios definidos. | Coordenação | T10 |
| T6 | Revisar e publicar a distribuição | Conferir a distribuição, ajustar problemas e disponibilizar o resultado. | Coordenação | T11 e T12 |
| T7 | Consultar a alocação | Verificar data, horário, campus, prédio e sala da prova. | Aluno | T02 e T04 |
| T8 | Emitir o comprovante | Visualizar ou gerar o comprovante individual de alocação. | Aluno | T04 e T05 |
| T9 | Remanejar alunos em caso de imprevisto | Transferir uma turma ou grupo para outra sala e atualizar as informações. | Coordenação | T06, T13 e T15 |
| T10 | Consultar listas e relatórios | Visualizar a lista de alunos, a ocupação das salas, pendências e alterações. | Coordenação ou Fiscal | T06 e T14 |

## 8. Mapeamento: história, tela e tarefa

| História | Tela no protótipo | Tarefa relacionada |
|---|---|---|
| US01 | T01 — Tela de acesso | T1 |
| US02 | T02 e T03 — Tela inicial e inscrição do aluno | T2 |
| US03 | T04 — Tela de consulta da alocação | T7 |
| US04 | T05 — Tela do comprovante | T8 |
| US05 | T15 — Tela de aviso | T9 |
| US06 | T07 — Tela de configuração da aplicação | T3 |
| US07 | T08 — Tela de cadastro de salas | T3 |
| US08 | T09 — Tela de cadastro ou importação de alunos | T4 |
| US09 | T10 — Tela de geração da distribuição | T5 |
| US10 | T11 — Tela de revisão da distribuição | T6 |
| US11 | T12 — Tela de publicação | T6 |
| US12 | T13 — Tela de remanejamento | T9 |
| US13 | T14 — Tela de listas e relatórios | T10 |
| US14 | T14 — Tela de listas e relatórios | T10 |
| US15 | T15 — Tela de aviso | T9 |
| US16 | Regra do sistema, aplicada em T10, T11 e T13 | T5, T6 e T9 |
| US17 | Regra do sistema, refletida em T04, T05 e T14 | T9 |
| US18 | Regra do sistema, aplicada em T09 | T4 |
| US19 | T06 — Painel da coordenação | T10 |

## 9. Próximos passos

1. Validar histórias e prioridades com a coordenação acadêmica (stakeholder principal), em especial as mudanças de prioridade de US06, US10 e US12.
2. Refinar critérios de aceitação com testes de usuário envolvendo alunos reais e validar os valores sugeridos, como o tempo de atualização da lista do fiscal.
3. Ordenar os épicos no backlog conforme as dependências: E3 e E4 antes de E5.
4. Detalhar o fluxo de remanejamento (US12) com a coordenação, por ser o ponto mais sensível da operação.