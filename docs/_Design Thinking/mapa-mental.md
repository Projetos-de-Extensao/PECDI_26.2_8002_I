---
id: mapa-mental
title: Mapa Mental
---

# Sistema de Alocação de Alunos para o Teste de Progresso

Visão resumida de objetivo, atores, fluxo e regras. Os detalhes estão em Histórias de Usuário e Análise de Tarefas.

```mermaid
flowchart LR
    AP((Alocação de Alunos<br/>Teste de Progresso))

    AP --> OBJ["Objetivo"]
    OBJ --> OBJ1["Distribuição justa e eficiente"]
    OBJ --> OBJ2["Acesso fácil ao aluno<br/>e gestão simples"]

    AP --> ATO["Atores"]
    ATO --> ALU["Aluno:<br/>inscrição, escolha do turno<br/>e consulta"]
    ATO --> PROF["Professor:<br/>coordenar<br/>(papel a definir)"]
    ATO --> COO["Coordenação:<br/>cadastro e ajustes"]
    ATO --> FIS["Fiscal:<br/>lista de presença"]

    AP --> FLX["Fluxo"]
    FLX --> F1["1. Login e inscrição<br/>(aluno escolhe o turno)"]
    FLX --> F2["2. Ensalamento automático"]
    FLX --> F3["3. Ajuste e validação"]
    FLX --> F4["4. Publicação e notificação"]
    FLX --> F5["5. Imprevistos:<br/>remanejamento para<br/>salas de contingência"]
    FLX --> F6["6. Comprovante e relatórios"]

    AP --> REG["Regras"]
    REG --> R1["Capacidade e recursos<br/>(acessibilidade, projetor)"]
    REG --> R2["Sala interditada<br/>não recebe alunos"]
    REG --> R3["Três turnos:<br/>manhã, tarde e noite"]
```

## Controle do documento

| Data | Versão | Descrição | Autor(es) |
|---|---|---|---|
| (não registrada) | 1.0 | Documento original | Equipe |
| 14/11/2026 | 1.1 | Inclusão do turno, do remanejamento, da sala interditada, do comprovante e dos relatórios (já previstos nas Histórias e na Análise); papel "Professor" marcado como a definir | Equipe |
