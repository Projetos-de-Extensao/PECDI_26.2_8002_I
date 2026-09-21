# Análise de Tarefas I — Sistema de Alocação do Teste de Progresso

**Data:** 14/09/2026  
**Projeto:** aplicação web para inscrição, alocação e consulta de salas do Teste de Progresso  
**Técnica:** Análise Hierárquica de Tarefas (AHT)

## 1. Apresentação

A Análise Hierárquica de Tarefas (AHT) é uma técnica utilizada para decompor uma atividade ampla em metas, tarefas e ações menores. Essa decomposição permite compreender como as pessoas interagem com uma aplicação para alcançar um resultado.

Neste projeto, a análise considera dois fluxos principais. O primeiro é realizado pela **coordenação acadêmica**, que organiza a aplicação do Teste de Progresso e distribui os alunos entre as salas disponíveis. O segundo é realizado pelo **aluno**, que acessa a aplicação para realizar sua inscrição, consultar a alocação e obter o comprovante com as informações da prova.

Os nomes das telas descritos neste documento são funcionais e representam o objetivo de cada etapa. Eles não correspondem necessariamente aos nomes finais dos menus ou componentes da aplicação.

## 2. Objetivo da análise de tarefas

O objetivo é compreender o fluxo de trabalho das pessoas usuárias, desde o acesso inicial até a conclusão de cada atividade. A análise busca:

- identificar as metas da coordenação e dos alunos;
- organizar as tarefas necessárias para preparar e consultar o Teste de Progresso;
- detalhar as ações executadas em cada tela;
- verificar se a navegação permite avançar, retornar, corrigir e confirmar informações;
- reduzir erros de alocação, conflitos de horários e excesso de trabalho manual;
- garantir que o aluno encontre com clareza a data, o horário, o campus, o prédio e a sala da prova;
- apoiar o desenvolvimento de uma interface simples, consistente e adequada aos dois perfis de usuário.

## 3. Público-alvo e personas

### 3.1 Persona 1 — Aluno

**Descrição:** estudante regularmente matriculado que precisa realizar o Teste de Progresso e consultar as informações de sua alocação.

**Necessidades:** realizar a inscrição, confirmar seus dados, visualizar a data e o horário da prova, localizar o prédio e a sala e emitir um comprovante.

**Objetivos:** concluir a inscrição sem dificuldade e obter rapidamente as informações necessárias para comparecer ao teste.

**Dificuldades possíveis:** não saber se a inscrição foi concluída, não encontrar a sala correta, perder uma atualização de alocação ou acessar a aplicação utilizando dados incorretos.

### 3.2 Persona 2 — Coordenação acadêmica

**Descrição:** pessoa responsável por organizar a aplicação do Teste de Progresso e acompanhar a distribuição dos alunos.

**Necessidades:** cadastrar ou importar alunos, configurar datas e horários, registrar salas e capacidades, gerar a distribuição, revisar conflitos e publicar o resultado.

**Objetivos:** realizar a organização com rapidez, evitar que a capacidade das salas seja ultrapassada e manter uma visão geral da ocupação do campus.

**Dificuldades possíveis:** lidar com dados incompletos, alterar uma alocação após a publicação, identificar alunos sem sala e remanejar uma turma em caso de emergência.

### 3.3 Persona 3 — Fiscal ou responsável pelo acompanhamento no local

**Descrição:** pessoa que precisa conferir a lista de alunos de uma sala e acompanhar alterações realizadas no dia da prova.

**Necessidades:** acessar a lista atualizada, identificar os alunos alocados e consultar alterações de sala ou prédio.

**Objetivos:** garantir que a lista utilizada no local esteja atualizada e corresponda à distribuição vigente.

**Dificuldades possíveis:** trabalhar com uma alteração de última hora, consultar uma lista desatualizada ou não identificar rapidamente uma sala interditada.

## 4. Metas da aplicação

### Meta 1 — Organizar a aplicação do Teste de Progresso

Permitir que a coordenação configure os dados necessários, como período de realização, horários, campus, prédios, salas, capacidade e recursos disponíveis.

### Meta 2 — Distribuir os alunos nas salas

Permitir que a coordenação gere uma distribuição automática ou assistida, respeitando a capacidade das salas e os critérios definidos para a aplicação.

### Meta 3 — Permitir que o aluno consulte sua alocação

Apresentar ao aluno as informações de sua prova de maneira clara, incluindo data, horário, campus, prédio e sala.

### Meta 4 — Tratar alterações e imprevistos

Permitir o remanejamento de alunos ou turmas quando uma sala estiver indisponível, com atualização das listas e comunicação da alteração.

### Meta 5 — Emitir comprovantes e relatórios

Disponibilizar o comprovante individual do aluno e relatórios para acompanhamento da coordenação e dos responsáveis no local.

## 5. Telas de interface consideradas

| Código | Tela | Usuário principal | Função |
|---|---|---|---|
| T01 | Tela de acesso | Aluno, coordenação e fiscal | Permitir a entrada na aplicação por identificação institucional. |
| T02 | Tela inicial do aluno | Aluno | Apresentar a situação da inscrição e o caminho para consultar a alocação. |
| T03 | Tela de inscrição | Aluno | Permitir confirmar ou completar os dados necessários para participar do teste. |
| T04 | Tela de consulta da alocação | Aluno | Apresentar data, horário, campus, prédio e sala. |
| T05 | Tela do comprovante | Aluno | Exibir e permitir a emissão do comprovante individual. |
| T06 | Painel da coordenação | Coordenação | Apresentar o resumo da aplicação, inscrições, salas, ocupação e pendências. |
| T07 | Tela de configuração da aplicação | Coordenação | Cadastrar datas, horários, campus e demais parâmetros do teste. |
| T08 | Tela de cadastro de salas | Coordenação | Registrar salas, capacidade, localização e recursos disponíveis. |
| T09 | Tela de cadastro ou importação | Coordenação | Incluir alunos, turmas e demais dados necessários para a distribuição. |
| T10 | Tela de geração da distribuição | Coordenação | Definir critérios e executar a distribuição dos alunos. |
| T11 | Tela de revisão da distribuição | Coordenação | Conferir ocupação, conflitos, pendências e ajustes necessários. |
| T12 | Tela de publicação | Coordenação | Publicar a distribuição final para os alunos e responsáveis. |
| T13 | Tela de remanejamento | Coordenação | Transferir alunos ou turmas para salas de contingência. |
| T14 | Tela de listas e relatórios | Coordenação e fiscal | Consultar listas por sala, ocupação, pendências e alterações. |
| T15 | Tela de aviso | Todos os usuários | Informar sucesso, erro, pendência, alteração ou indisponibilidade. |

## 6. Tarefas principais

| Código | Tarefa | Descrição | Persona responsável | Telas envolvidas |
|---|---|---|---|---|
| T1 | Acessar a aplicação | Entrar no sistema e ser direcionado ao espaço correspondente ao perfil de usuário. | Aluno, coordenação ou fiscal | T01, T02 e T06 |
| T2 | Realizar a inscrição | Confirmar ou completar os dados necessários para participar do Teste de Progresso. | Aluno | T02 e T03 |
| T3 | Configurar a aplicação | Cadastrar período, horários, campus, prédios e salas disponíveis. | Coordenação | T06, T07 e T08 |
| T4 | Carregar os dados dos alunos | Inserir ou importar alunos, turmas e informações necessárias para a distribuição. | Coordenação | T06 e T09 |
| T5 | Gerar a distribuição | Distribuir os alunos nas salas respeitando capacidade e critérios definidos. | Coordenação | T10 |
| T6 | Revisar e publicar a distribuição | Conferir a distribuição, ajustar problemas e disponibilizar o resultado. | Coordenação | T11 e T12 |
| T7 | Consultar a alocação | Verificar data, horário, campus, prédio e sala da prova. | Aluno | T02 e T04 |
| T8 | Emitir o comprovante | Visualizar ou gerar o comprovante individual de alocação. | Aluno | T04 e T05 |
| T9 | Remanejar alunos em caso de imprevisto | Transferir uma turma ou grupo para outra sala e atualizar as informações. | Coordenação | T06, T13 e T15 |
| T10 | Consultar listas e relatórios | Visualizar a lista de alunos, a ocupação das salas, pendências e alterações. | Coordenação ou fiscal | T06 e T14 |

## 7. Ações detalhadas por tarefa

### Tarefa T1 — Acessar a aplicação

**Meta:** acessar a área correta da aplicação.

1. Abrir a aplicação.
2. Acessar a tela de identificação.
3. Informar matrícula, e-mail institucional ou outro dado previsto.
4. Informar a credencial solicitada, quando necessário.
5. Confirmar o acesso.
6. Aguardar a validação dos dados.
7. Visualizar a tela correspondente ao perfil identificado.

**Resultado esperado:** o aluno acessa a tela inicial do aluno, enquanto a coordenação e o fiscal acessam as funções compatíveis com suas responsabilidades.

**Tratamento de erro:** se os dados não forem reconhecidos, a tela de aviso deve explicar o problema sem revelar informações sensíveis e indicar como tentar novamente ou solicitar ajuda.

### Tarefa T2 — Realizar a inscrição

**Meta:** confirmar a participação do aluno no Teste de Progresso.

1. Acessar a tela inicial do aluno.
2. Identificar a situação da inscrição.
3. Selecionar a opção para realizar ou confirmar a inscrição.
4. Conferir os dados apresentados automaticamente.
5. Completar as informações que estiverem faltando.
6. Confirmar a participação.
7. Ler a mensagem de conclusão.
8. Retornar à tela inicial e verificar a nova situação da inscrição.

**Resultado esperado:** a aplicação informa que a inscrição foi registrada e apresenta o próximo passo, que será consultar a alocação quando ela estiver disponível.

### Tarefa T3 — Configurar a aplicação

**Meta:** preparar os dados gerais da aplicação do teste.

1. Acessar o painel da coordenação.
2. Abrir a tela de configuração da aplicação.
3. Informar o período de realização.
4. Informar os horários previstos.
5. Selecionar o campus ou os campi envolvidos.
6. Conferir as informações cadastradas.
7. Salvar a configuração.
8. Verificar a mensagem de conclusão.

**Resultado esperado:** a aplicação passa a reconhecer o período e os espaços que poderão ser utilizados na distribuição.

### Tarefa T4 — Carregar os dados dos alunos

**Meta:** disponibilizar a relação de alunos para a distribuição.

1. Acessar a tela de cadastro ou importação.
2. Selecionar a forma de inclusão dos dados.
3. Informar ou enviar os dados dos alunos e das turmas.
4. Aguardar a validação das informações.
5. Verificar a quantidade de registros aceitos.
6. Identificar registros com pendências.
7. Corrigir os dados necessários.
8. Confirmar a carga final.

**Resultado esperado:** a coordenação visualiza uma relação de alunos aptos para a distribuição e uma lista separada de pendências, quando houver.

### Tarefa T5 — Gerar a distribuição

**Meta:** alocar os alunos nas salas disponíveis.

1. Acessar a tela de geração da distribuição.
2. Selecionar a aplicação que será organizada.
3. Conferir o total de alunos e de salas disponíveis.
4. Conferir a capacidade de cada sala.
5. Selecionar os critérios de distribuição previstos.
6. Iniciar a geração da distribuição.
7. Aguardar o processamento.
8. Verificar a mensagem de conclusão.
9. Acessar a tela de revisão.

**Regras importantes:** a aplicação não deve ultrapassar a capacidade de uma sala. Também deve informar alunos sem alocação, salas sem ocupação e qualquer conflito encontrado.

### Tarefa T6 — Revisar e publicar a distribuição

**Meta:** garantir que a distribuição esteja correta antes de torná-la visível aos alunos.

1. Acessar a tela de revisão.
2. Conferir o total de alunos distribuídos.
3. Conferir a ocupação de cada sala.
4. Identificar alunos sem alocação.
5. Identificar conflitos de horário ou capacidade.
6. Ajustar manualmente uma alocação, quando necessário.
7. Repetir a conferência após o ajuste.
8. Selecionar a opção de publicação.
9. Ler o resumo apresentado.
10. Confirmar a publicação.
11. Verificar a mensagem de conclusão.

**Resultado esperado:** a distribuição final fica disponível para os alunos e para as pessoas responsáveis pelo acompanhamento.

### Tarefa T7 — Consultar a alocação

**Meta:** descobrir onde e quando o aluno deverá realizar o teste.

1. Acessar a tela inicial do aluno.
2. Verificar se a distribuição já foi publicada.
3. Abrir a tela de consulta da alocação.
4. Conferir a data.
5. Conferir o horário.
6. Conferir o campus e o prédio.
7. Conferir o número ou identificação da sala.
8. Ler os avisos apresentados.
9. Retornar à tela inicial ou abrir o comprovante.

**Tratamento de situação não publicada:** a aplicação deve informar que a alocação ainda não está disponível, sem apresentar campos vazios ou informações incompletas como se fossem definitivas.

### Tarefa T8 — Emitir o comprovante

**Meta:** obter um registro das informações de alocação.

1. Abrir a tela de consulta da alocação.
2. Conferir se todos os dados estão completos.
3. Selecionar a opção de emissão do comprovante.
4. Visualizar o documento gerado.
5. Conferir novamente a data, o horário e a sala.
6. Salvar ou imprimir o comprovante.

O comprovante pode conter um código de validação ou QR Code, desde que essa função seja confirmada como requisito do projeto. A interface deve informar quando o documento tiver sido gerado corretamente.

### Tarefa T9 — Remanejar alunos em caso de imprevisto

**Meta:** alterar a sala de alunos afetados por uma interdição, falta de energia ou outro problema operacional.

1. Acessar o painel da coordenação.
2. Identificar a sala indisponível.
3. Alterar a situação da sala para impedir novas alocações.
4. Abrir a tela de remanejamento.
5. Selecionar a turma ou os alunos afetados.
6. Consultar as salas de contingência disponíveis.
7. Selecionar a nova sala.
8. Conferir a capacidade e os dados da nova alocação.
9. Confirmar o remanejamento.
10. Atualizar a lista da sala.
11. Publicar o aviso da alteração para os alunos.
12. Verificar a mensagem de conclusão.

**Resultado esperado:** os alunos passam a visualizar a nova sala e o fiscal consegue acessar a lista atualizada.

### Tarefa T10 — Consultar listas e relatórios

**Meta:** acompanhar a aplicação e conferir os alunos por sala.

1. Acessar a tela de listas e relatórios.
2. Selecionar o campus, prédio, sala, data ou horário desejado.
3. Solicitar a apresentação dos dados.
4. Conferir a lista de alunos.
5. Verificar a ocupação da sala.
6. Consultar pendências ou alunos sem alocação.
7. Consultar alterações realizadas após a publicação.
8. Exportar ou imprimir o relatório, quando necessário.

## 8. Estrutura hierárquica da tarefa principal

### Meta geral: organizar e realizar a aplicação do Teste de Progresso

**Plano 0 — Coordenação:** executar T1, T3, T4, T5, T6 e T10. Se ocorrer um imprevisto, executar T9 e atualizar T10.

- **T1 — Acessar a aplicação**
  - Identificar o usuário.
  - Abrir o painel correspondente.
- **T3 — Configurar a aplicação**
  - Definir período e horários.
  - Cadastrar campus, prédios e salas.
- **T4 — Carregar os dados dos alunos**
  - Incluir os alunos e as turmas.
  - Corrigir pendências.
- **T5 — Gerar a distribuição**
  - Definir critérios.
  - Processar a distribuição.
- **T6 — Revisar e publicar**
  - Conferir capacidade e pendências.
  - Ajustar e publicar.
- **T10 — Consultar listas e relatórios**
  - Verificar ocupação e listas.
  - Exportar informações quando necessário.
- **T9 — Remanejar em caso de imprevisto**
  - Indisponibilizar a sala afetada.
  - Selecionar sala de contingência.
  - Atualizar e comunicar a alteração.

**Plano 1 — Aluno:** executar T1 e T2. Depois da publicação, executar T7 e T8.

**Plano 2 — Fiscal:** executar T1 e T10 para consultar a lista atualizada da sala. Se houver mudança, consultar novamente após a atualização.

## 9. Fluxo geral de navegação

```text
Tela de acesso
      |
      +--> Área do aluno
      |       |
      |       +--> Tela de inscrição
      |       |
      |       +--> Consulta da alocação --> Comprovante
      |
      +--> Painel da coordenação
              |
              +--> Configuração da aplicação
              |       |
              |       +--> Cadastro de salas
              |
              +--> Cadastro/importação de alunos
              |
              +--> Geração da distribuição
              |       |
              |       +--> Revisão da distribuição --> Publicação
              |
              +--> Remanejamento
              |
              +--> Listas e relatórios
```

## 10. Observações sobre as telas de interface

A **tela de acesso** deve deixar claro quais perfis podem utilizar a aplicação e deve apresentar mensagens compreensíveis quando os dados não forem reconhecidos.

A **tela inicial do aluno** deve destacar a situação da inscrição e o acesso à consulta da alocação. Se o resultado ainda não estiver publicado, a tela deve informar essa condição de maneira explícita.

O **painel da coordenação** deve funcionar como uma visão geral da aplicação. É importante que apresente quantidade de alunos, salas disponíveis, ocupação, pendências e existência de conflitos sem exigir a abertura de várias telas para obter uma visão inicial.

A **tela de geração da distribuição** deve apresentar os dados que serão considerados antes do processamento. A coordenação precisa saber quantos alunos serão distribuídos, quantas salas estão disponíveis e quais critérios serão utilizados.

A **tela de revisão** deve separar claramente os casos corretos dos casos que precisam de atenção. Alunos sem sala, capacidade excedida, sala sem ocupação e conflito de horário devem ser identificados antes da publicação.

A **tela de consulta da alocação** deve priorizar as informações que o aluno precisa encontrar no dia da prova: data, horário, campus, prédio e sala. Essas informações não devem ficar escondidas em menus secundários.

A **tela de remanejamento** deve exigir uma revisão antes da confirmação, pois a alteração afeta a experiência dos alunos e a lista utilizada pelos fiscais. Depois da confirmação, a aplicação deve atualizar as informações relacionadas ao aluno, à sala antiga, à sala nova e aos relatórios.

As **telas de aviso** devem diferenciar sucesso, pendência, erro, processamento e indisponibilidade. Uma mensagem como “operação inválida” não é suficiente para orientar a correção.

## 11. Regras e pontos críticos

| Regra ou ponto crítico | Consequência para a interface |
|---|---|
| A capacidade da sala não pode ser ultrapassada. | Exibir capacidade, ocupação atual e alerta antes da confirmação. |
| Uma sala interditada não deve receber novos alunos. | Alterar claramente o estado da sala e removê-la das opções disponíveis. |
| A distribuição precisa ser revisada antes da publicação. | Separar as etapas de gerar, revisar e publicar. |
| O aluno precisa saber se sua alocação foi publicada. | Mostrar o estado da publicação na tela inicial e na consulta. |
| Alterações precisam chegar ao aluno e ao fiscal. | Atualizar consulta, comprovante e lista após o remanejamento. |
| Dados incompletos podem impedir a distribuição. | Apresentar pendências com indicação do dado que precisa ser corrigido. |
| A coordenação pode precisar ajustar casos pontuais. | Permitir alteração manual com registro e revisão posterior. |
| O fiscal precisa consultar a versão vigente da lista. | Exibir data e hora da atualização da lista. |

## 12. Avaliação futura da interface

| Aspecto | Pergunta de verificação |
|---|---|
| Clareza | O aluno entende onde consultar sua sala? |
| Orientação | A coordenação sabe qual etapa deve executar em seguida? |
| Consistência | Os dados de campus, prédio e sala aparecem com os mesmos nomes em todas as telas? |
| Controle | É possível voltar ou cancelar antes de publicar uma distribuição? |
| Recuperação | É possível corrigir um dado sem reiniciar toda a configuração? |
| Visibilidade | A aplicação informa quando a distribuição está processando, publicada ou pendente? |
| Segurança operacional | O sistema impede a confirmação de uma sala acima da capacidade? |
| Atualização | O aluno e o fiscal visualizam a nova sala depois de um remanejamento? |
| Eficiência | A coordenação consegue acompanhar a situação geral sem consultar cada sala separadamente? |
| Acessibilidade | Textos, cores, mensagens e controles podem ser compreendidos por diferentes usuários? |



