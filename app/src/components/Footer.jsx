const MENSAGEM = {
  acesso: 'Problemas para entrar? Procure a secretaria do seu curso.',
  aluno: 'Dúvidas sobre a sua sala? Procure a coordenação do seu curso.',
  coordenacao: 'Protótipo com dados fictícios. Nada é salvo ao recarregar a página.',
  professor: 'Dúvidas no dia da prova? Fale com a coordenação da edição.',
}

export default function Footer({ perfil }) {
  return (
    <footer className="rodape">
      <div className="rodape__interno">
        <p>Sistema de alocação do Teste de Progresso</p>
        <p>{MENSAGEM[perfil]}</p>
      </div>
    </footer>
  )
}
