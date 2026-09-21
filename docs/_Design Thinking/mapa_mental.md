# Sistema de Alocação de Alunos para o Teste de Progresso

```mermaid
flowchart LR
    AP((Alocação de Alunos<br/>Teste de Progresso))

    AP --> OBJ["Objetivo"]
    OBJ --> OBJ1["Distribuição justa e eficiente"]
    OBJ --> OBJ2["Acesso fácil ao aluno<br/>e gestão simples"]

    AP --> ATO["Atores"]
    ATO --> ALU["Aluno:<br/>inscrição e consulta"]
    ATO --> PROF["Professor:<br/>coordenar"]
    ATO --> COO["Coordenação:<br/>cadastro e ajustes"]
    ATO --> FIS["Fiscal:<br/>lista de presença"]

    AP --> FLX["skdhskfaksdf"]
    FLX --> F1["1. Login e inscrição"]
    FLX --> F2["2. Ensalamento automático"]
    FLX --> F3["3. Ajuste e validação"]
    FLX --> F4["4. Publicação e notificação"]

    AP --> REG["Regras"]
    REG --> R1["Capacidade e recursos<br/>(acessibilidade, projetor)"]