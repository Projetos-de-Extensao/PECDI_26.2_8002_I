# Histórias de Usuário — Teste de Progresso (Sistema de Alocação)

## Controle do documento

| Data | Versão | Descrição | Autor(es) |
|---|---|---|---|
| (preencher) | 1.0 | Documento original | (preencher) |
| 12/10/2026 | 2.0 | Revisão de coerência com os demais documentos da pasta: histórias consolidadas e renumeradas, regras de negócio e requisitos não funcionais separados, prioridades reavaliadas, lacunas incluídas e seções duplicadas removidas | Equipe (preencher) |

> **Atenção — premissas desta versão.** Os pontos marcados com **[a confirmar]** dependem de decisão da equipe ou da coordenação e estão listados na seção 10. As prioridades da seção 6 são uma proposta de revisão e precisam ser validadas com a coordenação.

## 1. Introdução

Este documento reúne as histórias de usuário do sistema de alocação de alunos para o Teste de Progresso, derivadas de:

- [Análise de Tarefas I](./Analise_de_Tarefas_I_Teste_de_Progresso.md): personas, telas, tarefas e regras;
- [Brainstorm](./Brainstorm.md): requisitos elicitados com a equipe;
- [5W2H](./5w2h.md): visão geral e visão de produto;
- [Mapa Mental](./mapa_mental.md): atores, fluxo e regras gerais;
- [Pesquisa](./pesquisa.md): apenas as conclusões transversais sobre mobile, acessibilidade e clareza de acesso (ver seção 5).

O documento apresenta as personas, as histórias com critérios de aceitação, as regras de negócio, os requisitos não funcionais, os épicos, a priorização (MoSCoW) e o mapeamento entre histórias, telas e tarefas.

As histórias seguem o formato padrão: "Como [persona], quero [ação] para [benefício]".

**Escopo considerado [a confirmar]:** o sistema organiza a **alocação de alunos em salas** de uma aplicação **presencial** do Teste de Progresso. A Pesquisa trata o teste como prova online (cronômetro, salvamento automático, retomada); esses itens estão **fora** deste escopo até que a equipe decida o contrário (seção 10, item 1).

### Códigos usados neste documento

Para evitar a confusão entre telas e tarefas, esta versão adota prefixos distintos. Os mesmos códigos devem ser adotados na Análise de Tarefas.

| Código | Significado | Antes |
|---|---|---|
| US01 a US18 | História de usuário | US01 a US19 |
| RN01 e RN02 | Regra de negócio | US16 e US17 |
| RNF01 a RNF04 | Requisito não funcional | — |
| E1 a E6 | Épico | E1 a E6 |
| TL01 a TL15 | Tela da interface | T01 a T15 |
| TA01 a TA11 | Tarefa da análise de tarefas | T1 a T10 (TA11 é nova) |

### Glossário

| Termo | Uso neste documento |
|---|---|
| Sistema | O software (aplicação web) de alocação. O termo "aplicação" não é usado para o software. |
| Edição do teste | Uma aplicação específica do Teste de Progresso (período, horários, campus, prédios, salas e alunos). |
| Distribuição | Processo de alocar os alunos nas salas; "ensalamento" é sinônimo e não deve ser usado. |
| Alocação | Resultado individual: a sala, o prédio, o campus, a data e o horário de um aluno. |
| Coordenação | Perfil que administra a edição do teste; substitui "administrador", "professor" e "gestão". |
| Sala de contingência | Sala cadastrada como reserva para remanejamentos. |
| Sala interditada | Sala indisponível, bloqueada para novas alocações. |

## 2. Personas

As descrições completas (necessidades, objetivos e dificuldades) estão na [Análise de Tarefas I, seção 3](./Analise_de_Tarefas_I_Teste_de_Progresso.md), que é a fonte única. Aqui consta apenas o resumo.

| Persona | Resumo | Histórias |
|---|---|---|
| Aluno | Estudante regularmente matriculado que precisa se inscrever, saber onde e quando fazer a prova e obter o comprovante. | US01 a US05, RN02 |
| Coordenação | Responsável por configurar a edição, distribuir os alunos, publicar e remanejar em emergências. | US01, US06 a US16, RN01, RN02 |
| Fiscal | Responsável por conferir a lista de alunos de uma sala no dia da prova. | US01, US17, US18, RN02 |

> As personas atuais descrevem papéis. Quando a Pesquisa e o Design Thinking forem preenchidos, devem ser enriquecidas com perfil, contexto de uso e dispositivo.

## 3. Histórias de usuário

### 3.1 Acesso (todos os perfis)

- **US01** (Must) - Como usuário (aluno, coordenação ou fiscal), quero acessar o sistema com minha matrícula ou e-mail institucional para consultar as informações do meu perfil de forma segura.
    - *Critério de aceitação: após a validação, o usuário é direcionado à tela compatível com seu perfil (TL02, TL06 ou TL14).*
    - *Critério de aceitação: apenas alunos regularmente matriculados acessam as funções do aluno; os demais veem uma mensagem explicativa.*
    - *Critério de aceitação: em caso de erro, a mensagem explica o problema e como tentar novamente ou pedir ajuda, sem revelar dados confidenciais.*
    - *Critério de aceitação: o tempo de validação segue o RNF03.*

### 3.2 Histórias para o aluno

- **US02** (Must) - Como aluno, quero realizar minha inscrição no Teste de Progresso para confirmar minha participação.
    - *Critério de aceitação: a inscrição só é possível dentro da janela de inscrição configurada na US06; fora dela, o sistema informa o período.*
    - *Critério de aceitação: dados pré-preenchidos a partir da carga de alunos (US08), com campos pendentes sinalizados.*
    - *Critério de aceitação: aluno que não consta na carga recebe orientação para procurar a coordenação.*
    - *Critério de aceitação: ao concluir, o sistema exibe a confirmação e a nova situação da inscrição.*
- **US03** (Must) - Como aluno, quero consultar data, horário, campus, prédio e sala da minha prova para saber onde comparecer.
    - *Critério de aceitação: as informações ficam visíveis sem necessidade de abrir menus secundários.*
    - *Critério de aceitação: o estado da publicação (publicada ou não) aparece na tela inicial (TL02) e na consulta (TL04).*
    - *Critério de aceitação: se a alocação ainda não foi publicada, o sistema informa essa condição em vez de exibir campos vazios.*
- **US04** (Must; QR Code: Could) - Como aluno, quero emitir um comprovante da minha alocação para apresentar no dia da prova.
    - *Critério de aceitação: o comprovante traz identificação do aluno, data, horário, campus, prédio, sala e um código de validação, e pode ser salvo ou impresso.*
    - *Critério de aceitação: o comprovante só pode ser emitido depois da publicação.*
    - *Critério de aceitação (Could, [a confirmar]): o código de validação também é apresentado em QR Code, para validação na entrada do prédio ou da sala.*
- **US05** (Must) - Como aluno, quero ser avisado quando minha sala for alterada para não perder a prova.
    - *Critério de aceitação: o aviso é visível na tela inicial (TL02) e na consulta de alocação (TL04) e indica a sala anterior e a nova.*
    - *Critério de aceitação: canal adicional (por exemplo, e-mail) é decisão pendente [a confirmar].*

### 3.3 Histórias para a coordenação

- **US06** (Must) - Como coordenação, quero configurar período, horários, janela de inscrição, campus e prédios da edição do teste para prepará-la.
    - *Critério de aceitação: período e janela de inscrição têm início e fim, e o sistema impede um fim anterior ao início.*
    - *Critério de aceitação: os dados salvos aparecem na etapa de geração da distribuição (US09).*
- **US07** (Must) - Como coordenação, quero cadastrar salas com capacidade e recursos disponíveis, inclusive marcando salas de contingência, para planejar a distribuição e os remanejamentos.
    - *Critério de aceitação: o sistema impede capacidade zerada ou negativa.*
    - *Critério de aceitação: cada sala fica vinculada a um campus e a um prédio e pode ter recursos (acessibilidade, ar-condicionado, projetor, computadores).*
    - *Critério de aceitação: a sala pode ser marcada como contingência e, nesse caso, não recebe alunos na distribuição inicial.*
    - *Critério de aceitação: capacidade e ocupação atual são exibidas para cada sala.*
- **US08** (Must) - Como coordenação, quero importar ou cadastrar os dados dos alunos e validar os registros para disponibilizá-los à distribuição com o mínimo de pendências.
    - *Critério de aceitação: registros com pendência são listados separadamente dos aptos, com a indicação do dado que precisa ser corrigido.*
    - *Critério de aceitação: é possível corrigir um registro sem reiniciar toda a carga.*
    - *Critério de aceitação: a carga pode registrar uma necessidade específica do aluno (por exemplo, acessibilidade), usada na US10.*
    - *Critério de aceitação: só entram na distribuição os alunos que constam na carga e estão inscritos (US02) [a confirmar].*
    - *Critério de aceitação: a coordenação confirma a carga final, com a quantidade de registros aceitos e pendentes.*
- **US09** (Must) - Como coordenação, quero gerar a distribuição automática dos alunos nas salas para reduzir o trabalho manual.
    - *Critério de aceitação: antes de processar, o sistema mostra total de alunos, salas disponíveis, capacidade e critérios selecionados.*
    - *Critério de aceitação: os critérios selecionáveis incluem curso, período e ordem alfabética.*
    - *Critério de aceitação: a regra RN01 é respeitada.*
    - *Critério de aceitação: ao final, o sistema informa os alunos sem alocação, as salas sem ocupação e qualquer conflito, e encaminha o resultado à revisão sem publicá-lo.*
- **US10** (Should) - Como coordenação, quero que alunos com necessidades específicas sejam alocados em salas com os recursos adequados para garantir sua participação.
    - *Critério de aceitação: aluno com necessidade registrada só é alocado em sala que tenha o recurso correspondente.*
    - *Critério de aceitação: se nenhuma sala atender, o aluno aparece como pendência na revisão (US11).*
- **US11** (Must) - Como coordenação, quero revisar conflitos e pendências antes da publicação para evitar erros de alocação.
    - *Critério de aceitação: são destacados alunos sem sala, salas com capacidade excedida, conflitos de horário e salas sem ocupação.*
    - *Critério de aceitação: é possível ajustar manualmente uma alocação; cada ajuste registra quem alterou, quando e a mudança de sala, e pode ser revisado depois.*
    - *Critério de aceitação: após cada ajuste, a conferência é refeita.*
    - *Critério de aceitação: é possível voltar ou cancelar antes de publicar.*
- **US12** (Must) - Como coordenação, quero publicar a distribuição final para que os alunos possam consultar sua alocação.
    - *Critério de aceitação: a publicação exige confirmação explícita e um resumo prévio.*
    - *Critério de aceitação: ao publicar, os alunos passam a ver a alocação e são avisados da publicação; o canal do aviso é [a confirmar].*
- **US13** (Must) - Como coordenação, quero remanejar alunos em caso de imprevisto (sala interditada, falta de energia) para garantir a continuidade da aplicação do teste.
    - *Critério de aceitação: a sala afetada passa a "interditada", fica bloqueada para novas alocações e sai das opções disponíveis.*
    - *Critério de aceitação: a coordenação seleciona a turma ou os alunos afetados e escolhe entre as salas de contingência, vendo capacidade e dados da nova alocação.*
    - *Critério de aceitação: uma revisão é exigida antes da confirmação.*
    - *Critério de aceitação: as regras RN01 e RN02 se aplicam, e os alunos são avisados (US05).*
    - *Critério de aceitação: o remanejamento é registrado no histórico de alterações.*
- **US14** (Should) - Como coordenação, quero ajustar uma alocação individual depois da publicação, fora de situações de emergência, para corrigir casos pontuais.
    - *Critério de aceitação: o ajuste exige confirmação e fica registrado no histórico de alterações.*
    - *Critério de aceitação: as regras RN01 e RN02 se aplicam, e o aluno e o fiscal são avisados (US05 e US18).*
- **US15** (Should) - Como coordenação, quero um painel com o resumo da edição do teste para acompanhar inscrições, salas, ocupação, pendências e conflitos sem abrir várias telas.
    - *Critério de aceitação: o painel exibe, em uma única tela, total de inscritos, salas disponíveis, ocupação, pendências e existência de conflitos.*
- **US16** (Should) - Como coordenação, quero consultar e exportar listas e relatórios de ocupação para acompanhar a edição do teste e fazer auditoria.
    - *Critério de aceitação: os relatórios incluem ocupação e taxa de ocupação por campus, prédio e sala, pendências, vagas remanescentes e alterações feitas após a publicação.*
    - *Critério de aceitação: há filtro por campus, prédio, sala, data e horário.*
    - *Critério de aceitação: exportação em PDF, CSV e Excel.*

### 3.4 Histórias para o fiscal

- **US17** (Must) - Como fiscal, quero acessar a lista atualizada de alunos de uma sala para conferir os alunos no dia da prova.
    - *Critério de aceitação: a lista exibe data e hora da última atualização e destaca os alunos que mudaram de sala.*
    - *Critério de aceitação: a lista é de consulta; o registro de presença dentro do sistema não faz parte do MVP [a confirmar].*
- **US18** (Should) - Como fiscal, quero ser avisado sobre alterações de sala ou prédio para orientar os alunos corretamente.
    - *Critério de aceitação: a alteração aparece na lista sem recarregar manualmente, dentro do tempo definido no RNF03.*

## 4. Regras de negócio e requisitos não funcionais

### 4.1 Regras de negócio

- **RN01 — Capacidade das salas.** O sistema impede que a capacidade de uma sala seja ultrapassada.
    - *Critério de aceitação: a confirmação é bloqueada com um alerta que mostra capacidade e ocupação.*
    - *Critério de aceitação: a regra vale na geração (US09), no ajuste manual (US11), no ajuste pós-publicação (US14) e no remanejamento (US13).*
- **RN02 — Atualização após alteração de sala.** Depois de confirmado um remanejamento ou ajuste, as informações exibidas aos usuários refletem a nova sala.
    - *Critério de aceitação: consulta (TL04), comprovante (TL05) e listas (TL14) exibem a nova sala após a confirmação.*

### 4.2 Requisitos não funcionais

| Código | Requisito | Origem | Situação |
|---|---|---|---|
| RNF01 | Interface responsiva, com funcionamento pleno em telas pequenas. | Pesquisa, recomendação 2 | Proposto |
| RNF02 | Acessibilidade: contraste adequado, navegação por teclado, compatibilidade com leitor de tela e mensagens de erro compreensíveis. | Pesquisa; Análise §12 | Proposto |
| RNF03 | Desempenho: validação de acesso em até 2 segundos (US01) e alteração refletida na lista do fiscal em até 1 minuto (US18). | Versão 1.0 deste documento | **Hipótese**, sem respaldo em outros arquivos; validar com testes |
| RNF04 | Proteção de dados pessoais: uso de CPF ou outros dados sensíveis só mediante decisão formal e análise de LGPD. | Brainstorm, Q2 | Pendente |

## 5. Alinhamento com a Pesquisa

A Pesquisa investiga o acesso a uma prova online. Para este escopo, apenas as conclusões transversais foram aproveitadas:

| Conclusão da Pesquisa | Tratamento neste documento |
|---|---|
| Mobile first | RNF01 |
| Acessibilidade | RNF02 |
| Mensagens de erro claras | Critério da US01 e telas de aviso (TL15) |
| Aviso antecipado da prova | US12 (aviso na publicação) e US05 |
| Cronômetro, salvamento automático, retomada, resultado e feedback | Fora do escopo; só entram se a equipe decidir que o projeto cobre a prova online |

## 6. Épicos

| Épico | Histórias | Objetivo |
|---|---|---|
| E1 — Acesso e inscrição | US01, US02 | Permitir que o usuário entre no sistema e que o aluno confirme sua participação. |
| E2 — Consulta e comprovante do aluno | US03, US04 | Garantir que o aluno saiba onde e quando fazer a prova. |
| E3 — Preparação da edição do teste | US06, US07, US08 | Cadastrar período, espaços e alunos necessários para a distribuição. |
| E4 — Distribuição de alunos nas salas | US09, US10, US11, US12 (RN01) | Gerar, revisar e publicar a distribuição respeitando a capacidade das salas. |
| E5 — Imprevistos, alterações e avisos | US05, US13, US14, US18 (RN02) | Tratar alterações de sala e manter aluno, coordenação e fiscal informados. |
| E6 — Acompanhamento e relatórios | US15, US16, US17 | Oferecer visão geral, listas e relatórios da edição do teste. |

## 7. Priorização (MoSCoW) — proposta a validar

| Categoria | Histórias |
|---|---|
| **Must** | US01, US02, US03, US04 (sem QR Code), US05, US06, US07, US08, US09, US11, US12, US13, US17, RN01, RN02 |
| **Should** | US10, US14, US15, US16, US18 |
| **Could** | QR Code do comprovante (US04), canal adicional de aviso (e-mail) |
| **Won't (v2.0)** | Integração automática com a base institucional; validações cruzadas de dados; redirecionamento automático para a sala ou prédio mais próximo ao esgotar vagas; cadastro da disposição espacial e do tipo de carteira |

**O que mudou em relação à versão 1.0 e por quê**

- **US12 antiga (remanejamento, agora US13) e US05 (aviso ao aluno) passam a Must.** A RN01 (Must) vale no remanejamento, e o remanejamento exige aviso ao aluno; manter uma história Must dependente de outra Should ou Could gerava contradição.
- **US04 (comprovante, sem QR Code) passa a Must**, pois o Brainstorm o cita como objetivo central do aluno.
- **US17 (lista do fiscal, antes US14) passa a Must**, pois é o insumo do dia da prova e a RN02 depende dela.
- **US18 antiga (validação avançada) foi fundida na US08**; o que era "avançado" (integração automática e validações cruzadas) está em Won't.
- **O volume de Must é alto.** Se a equipe precisar reduzir o MVP, as candidatas são US05 e US17, com o aviso feito pela própria tela de consulta, ou US13, tratado manualmente na primeira edição.

**Cadeia de dependências:** a geração (US09) depende de configuração (US06), salas (US07) e alunos (US08); a publicação (US12) é sempre precedida da revisão (US11); o remanejamento (US13) depende de salas de contingência (US07), da RN01 e do aviso ao aluno (US05).

## 8. Telas de interface

As descrições completas estão na [Análise de Tarefas I, seção 5](./Analise_de_Tarefas_I_Teste_de_Progresso.md). Aqui constam apenas os códigos, para consulta. As telas deixam de usar o prefixo "T".

| Código | Tela | Código | Tela |
|---|---|---|---|
| TL01 | Tela de acesso | TL09 | Tela de cadastro ou importação de alunos |
| TL02 | Tela inicial do aluno | TL10 | Tela de geração da distribuição |
| TL03 | Tela de inscrição | TL11 | Tela de revisão da distribuição |
| TL04 | Tela de consulta da alocação | TL12 | Tela de publicação |
| TL05 | Tela do comprovante | TL13 | Tela de remanejamento |
| TL06 | Painel da coordenação | TL14 | Tela de listas e relatórios |
| TL07 | Tela de configuração da edição | TL15 | Tela de aviso |
| TL08 | Tela de cadastro de salas | | |

## 9. Mapeamento: história, tela e tarefa

As tarefas (TA01 a TA10) estão descritas na [Análise de Tarefas I, seção 6](./Analise_de_Tarefas_I_Teste_de_Progresso.md).

| História | Tela | Tarefa | Origem |
|---|---|---|---|
| US01 | TL01 | TA01 | Análise T1; Brainstorm Q2 |
| US02 | TL02 e TL03 | TA02 | Análise T2; Brainstorm Q1 e Q6 |
| US03 | TL02 e TL04 | TA07 | Análise T7; Brainstorm Q1 |
| US04 | TL05 | TA08 | Análise T8; Brainstorm Q6 |
| US05 | TL02, TL04 e TL15 | TA11 (nova) | Análise §11; Brainstorm Q4 e Q5 |
| US06 | TL07 | TA03 | Análise T3; Brainstorm Q6 |
| US07 | TL08 | TA03 | Análise T3; Brainstorm Q2, Q3 e Q5 |
| US08 | TL09 | TA04 | Análise T4; Brainstorm Q2 |
| US09 | TL10 | TA05 | Análise T5; Brainstorm Q4 |
| US10 | TL08, TL09 e TL10 | TA03, TA04 e TA05 | Brainstorm Q3; Mapa Mental (regras) |
| US11 | TL11 | TA06 | Análise T6; Brainstorm Q4 |
| US12 | TL12 | TA06 | Análise T6; Brainstorm Q4 |
| US13 | TL13 e TL15 | TA09 | Análise T9; Brainstorm Q5 |
| US14 | TL11 e TL15 | TA06 (ampliada) | Análise Meta 4 e §11 |
| US15 | TL06 | TA10 | Análise T10 e §10 |
| US16 | TL14 | TA10 | Análise T10; Brainstorm Q6 |
| US17 | TL14 | TA01 e TA10 | Análise T10; Brainstorm Q5 |
| US18 | TL14 e TL15 | TA11 (nova) | Análise T9 e §11 |
| RN01 | TL08, TL10, TL11 e TL13 | TA05, TA06 e TA09 | Análise §11; Brainstorm Q3 |
| RN02 | TL04, TL05 e TL14 | TA09 | Análise T9 e §11 |

> **Rastreabilidade com o Brainstorm:** a tabela de requisitos do Brainstorm (BS01 a BS15) está vazia. Quando for preenchida, os IDs devem ser acrescentados à coluna "Origem".

### De-para dos códigos das histórias (versão 1.0 → 2.0)

| v1.0 | v2.0 | Observação |
|---|---|---|
| US01 | US01 | Persona ampliada para todos os perfis |
| US02 a US09 | US02 a US09 | Critérios ajustados |
| US10 | US11 | Revisão |
| US11 | US12 | Publicação |
| US12 | US13 | Remanejamento |
| US13 | US16 | Listas e relatórios |
| US14 | US17 | Lista do fiscal |
| US15 | US18 | Aviso ao fiscal |
| US16 | RN01 | Movida para regras de negócio |
| US17 | RN02 | Movida para regras de negócio |
| US18 | US08 | Fundida na US08 |
| US19 | US15 | Painel da coordenação |
| — | US10 | Nova: alocação por necessidades específicas |
| — | US14 | Nova: ajuste após a publicação |

## 10. Decisões pendentes e ajustes em outros arquivos

### Decisões pendentes

| # | Decisão | Quem decide | Impacto |
|---|---|---|---|
| 1 | O projeto trata a alocação em salas (prova presencial) ou a prova online da Pesquisa? | Equipe e professor | Define todo o escopo; se for prova online, este documento precisa ser refeito. |
| 2 | Fonte oficial dos dados dos alunos: carga pela coordenação ou integração com a base da universidade; e se a distribuição considera inscritos, importados ou ambos. | Equipe e coordenação | US02, US08 e US09. |
| 3 | O QR Code do comprovante é requisito? | Coordenação | US04. |
| 4 | Canal de aviso (somente no sistema, ou também e-mail) | Coordenação | US05, US12 e US18. |
| 5 | O sistema registra presença ou apenas exibe a lista? | Coordenação | US17. |
| 6 | Uso de CPF na validação do primeiro acesso | Coordenação e jurídico | US01 e RNF04. |
| 7 | Recuperação de senha, se o acesso usar credencial própria | Equipe | US01. |
| 8 | Valores de desempenho (2 segundos e 1 minuto) | Equipe, após testes | RNF03. |
| 9 | O stack HTML/CSS/JS do 5W2H comporta importação, geração de PDF e atualização em tempo real? | Equipe | Viabilidade técnica das US04, US08, US16 e US18. |
| 10 | Prioridades da seção 7, em especial o volume de Must | Coordenação | MVP. |

### Ajustes necessários em outros arquivos

| Arquivo | Ajuste |
|---|---|
| Análise de Tarefas | Adotar os códigos TL/TA; incluir **TA11 — Receber aviso de alteração** (aluno e fiscal); ampliar TA06 com "ajustar após a publicação"; renomear TA10 para "Acompanhar a edição do teste (painel, listas e relatórios)"; incluir prédios na descrição da TL07; remover o texto solto "jonh" da linha 2; esclarecer o uso de "aplicação" para o software e para a prova. |
| Brainstorm | Preencher os requisitos BS01 a BS15; decidir sobre o uso de CPF; alinhar os formatos de exportação (PDF, CSV e Excel). |
| 5W2H | Substituir "Utilizando o nome do aplicativo" na V2; reescrever "How much?" com custo; incluir o fiscal em "Who?". |
| Mapa Mental | Remover ou definir o ator "Professor"; incluir remanejamento, comprovante e relatórios; acrescentar a notificação na publicação, já prevista no fluxo. |
| Pesquisa | Alinhar o escopo ao projeto; preencher os campos `[inserir]`; incluir coordenação e fiscal no público-alvo, ou registrar a limitação. |
| Design Thinking | Preencher o modelo (personas, ponto de vista, ideação); corrigir "Ideaçã"; remover o parágrafo final que parece resíduo de ferramenta de IA. |
| Todos | Uniformizar nomes (Pedro Victor, John Edson) e adotar o glossário da seção 1. |

### Próximos passos

1. Resolver as decisões 1 e 2, que bloqueiam as demais.
2. Validar histórias e prioridades com a coordenação acadêmica (stakeholder principal), em especial as mudanças de prioridade descritas na seção 7.
3. Refinar os critérios de aceitação com testes de usuário envolvendo alunos reais.
4. Ordenar os épicos no backlog conforme as dependências: E3 e E4 antes de E5.
5. Detalhar o fluxo de remanejamento (US13) com a coordenação, por ser o ponto mais sensível da operação.
