/* Comportamento do protótipo navegável.
   - A barra do protótipo troca o estado exibido da tela (vazio, carregando, erro, sucesso...).
   - Blocos com data-estado="a b" aparecem só nos estados listados.
   - Botões com data-ir-estado levam a tela a outro estado (data-depois encadeia um segundo).
   Nada aqui é regra de negócio: é só para simular as telas. */
(function () {
  'use strict';

  var qs = function (s, el) { return (el || document).querySelector(s); };
  var qsa = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var blocos = qsa('[data-estado]');
  var botoesProto = qsa('[data-estado-alvo]');
  var estados = botoesProto.map(function (b) { return b.getAttribute('data-estado-alvo'); });
  var anuncio = qs('#anuncio-proto');
  var timer = null;

  function focar(elemento) {
    if (!elemento) return;
    if (!elemento.hasAttribute('tabindex')) elemento.setAttribute('tabindex', '-1');
    elemento.focus({ preventScroll: false });
  }

  function mostrar(estado, opcoes) {
    opcoes = opcoes || {};
    if (estados.indexOf(estado) === -1) return;
    blocos.forEach(function (el) {
      el.hidden = el.getAttribute('data-estado').split(/\s+/).indexOf(estado) === -1;
    });
    botoesProto.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-estado-alvo') === estado));
    });
    /* telas com abas ou etapas: a barra mostra só os estados da parte aberta */
    var botaoAtual = botoesProto.filter(function (x) { return x.getAttribute('data-estado-alvo') === estado; })[0];
    var grupo = botaoAtual ? botaoAtual.getAttribute('data-grupo') : null;
    if (grupo) {
      botoesProto.forEach(function (b) { b.hidden = b.getAttribute('data-grupo') !== grupo; });
      qsa('[data-aba]').forEach(function (a) {
        if (a.getAttribute('data-aba') === grupo) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    }
    document.body.setAttribute('data-estado-atual', estado);
    /* campos que aparecem inválidos num estado de erro estático */
    qsa('[data-invalido-em]').forEach(function (c) {
      c.setAttribute('aria-invalid', String(c.getAttribute('data-invalido-em').split(/\s+/).indexOf(estado) > -1));
    });
    /* opções que ficam marcadas num estado */
    if (opcoes.marcar !== false) qsa('[data-marcado-em]').forEach(function (c) {
      if (c.getAttribute('data-marcado-em').split(/\s+/).indexOf(estado) > -1) c.checked = true;
      else if (c.type === 'checkbox') c.checked = false;
    });
    /* seleção que espelha o estado (ex.: tipo de relatório) */
    qsa('select[data-troca-estado]').forEach(function (sel) {
      if (qs('option[value="' + estado + '"]', sel)) sel.value = estado;
    });
    if (opcoes.hash !== false) {
      try { history.replaceState(null, '', '#' + estado); } catch (e) { /* ambiente sem history */ }
    }
    if (anuncio) {
      var b = botoesProto.filter(function (x) { return x.getAttribute('data-estado-alvo') === estado; })[0];
      anuncio.textContent = 'Estado exibido: ' + (b ? b.textContent.trim() : estado);
    }
    if (opcoes.focar) {
      var visivel = function (el) { return !el.closest('[hidden]') && !el.closest('dialog'); };
      var alvo = qsa('main [data-foco]').filter(visivel)[0] || qsa('main h1').filter(visivel)[0];
      focar(alvo);
    }
  }

  botoesProto.forEach(function (b) {
    b.addEventListener('click', function () {
      clearTimeout(timer);
      mostrar(b.getAttribute('data-estado-alvo'));
    });
  });

  function irPara(destino, depois) {
    clearTimeout(timer);
    mostrar(destino, { focar: true });
    if (depois) {
      timer = setTimeout(function () { mostrar(depois, { focar: true }); }, 1400);
    }
  }

  /* Validação simples: campos required vazios ganham aria-invalid e mensagem */
  function validar(form) {
    var invalidos = [];
    qsa('[required]', form).forEach(function (campo) {
      var vazio = campo.type === 'checkbox' ? !campo.checked : !String(campo.value).trim();
      var erro = qs('#' + campo.id + '-erro');
      campo.setAttribute('aria-invalid', String(vazio));
      if (erro) erro.hidden = !vazio;
      if (vazio) invalidos.push(campo);
    });
    var resumo = qs('[data-resumo-erros]', form) || (form.closest('section') && qs('[data-resumo-erros]', form.closest('section')));
    if (resumo) {
      resumo.hidden = invalidos.length === 0;
      var contagem = qs('[data-contagem]', resumo);
      if (contagem) contagem.textContent = invalidos.length === 1 ? '1 campo' : invalidos.length + ' campos';
    }
    if (invalidos.length) {
      focar(resumo && !resumo.hidden ? resumo : invalidos[0]);
    }
    return invalidos.length === 0;
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    e.preventDefault();
    if (form.hasAttribute('data-validar') && !validar(form)) return;
    if (form.hasAttribute('data-login')) { entrar(form); return; }
    var destino = form.getAttribute('data-ir-estado');
    if (destino) irPara(destino, form.getAttribute('data-depois'));
  });

  /* T01: o texto digitado escolhe o perfil simulado */
  function entrar(form) {
    var usuario = (qs('#usuario', form).value || '').toLowerCase();
    irPara('carregando');
    timer = setTimeout(function () {
      if (usuario.indexOf('erro') > -1) { mostrar('erro', { focar: true }); return; }
      var destino = 'minha-prova.html';
      if (usuario.indexOf('coord') > -1) destino = 'painel.html';
      else if (usuario.indexOf('fiscal') > -1) destino = 'lista-fiscal.html';
      window.location.href = destino;
    }, 1100);
  }

  document.addEventListener('click', function (e) {
    var alvo = e.target.closest ? e.target : e.target.parentElement;

    var gatilho = alvo.closest('[data-ir-estado]');
    if (gatilho && gatilho.tagName !== 'FORM') {
      e.preventDefault();
      var dlg = gatilho.closest('dialog');
      if (dlg) dlg.close();
      irPara(gatilho.getAttribute('data-ir-estado'), gatilho.getAttribute('data-depois'));
      return;
    }

    var abrir = alvo.closest('[data-abrir-dialogo]');
    if (abrir) {
      var d = qs(abrir.getAttribute('data-abrir-dialogo'));
      if (d && typeof d.showModal === 'function') { e.preventDefault(); d.showModal(); }
      return;
    }

    var fechar = alvo.closest('[data-fechar-dialogo]');
    if (fechar) { var f = fechar.closest('dialog'); if (f) f.close(); }

    var senha = alvo.closest('[data-mostrar-senha]');
    if (senha) {
      var campo = qs(senha.getAttribute('data-mostrar-senha'));
      var ver = campo.type === 'password';
      campo.type = ver ? 'text' : 'password';
      senha.setAttribute('aria-pressed', String(ver));
      var rotulo = qs('[data-rotulo]', senha);
      if (rotulo) rotulo.textContent = ver ? 'Ocultar' : 'Mostrar';
      return;
    }

    var imprimir = alvo.closest('[data-imprimir]');
    if (imprimir) {
      e.preventDefault();
      var r0 = qs('#regiao-aviso');
      if (r0) { r0.hidden = false; var t0 = qs('[data-texto]', r0); if (t0) t0.textContent = imprimir.getAttribute('data-imprimir'); }
      window.print();
      return;
    }

    var aviso = alvo.closest('[data-aviso]');
    if (aviso) {
      e.preventDefault();
      var r = qs(aviso.getAttribute('data-aviso-alvo') || '#regiao-aviso');
      if (r) { r.hidden = false; var t = qs('[data-texto]', r); if (t) t.textContent = aviso.getAttribute('data-aviso'); }
    }
  });

  /* Caixa de confirmação libera o botão de ação */
  qsa('[data-habilita]').forEach(function (caixa) {
    var botao = qs(caixa.getAttribute('data-habilita'));
    if (!botao) return;
    var sincronizar = function () { botao.disabled = !caixa.checked; };
    caixa.addEventListener('change', sincronizar);
    sincronizar();
  });

  /* Seleção que troca o estado da tela (ex.: tipo de relatório) */
  qsa('[data-troca-estado]').forEach(function (sel) {
    sel.addEventListener('change', function () { mostrar(sel.value); });
  });

  /* Rádio que leva a tela a outro estado ao ser marcado */
  qsa('[data-ao-marcar]').forEach(function (r) {
    r.addEventListener('change', function () { if (r.checked) mostrar(r.getAttribute('data-ao-marcar'), { focar: false, marcar: false }); });
  });

  /* Busca simples dentro de uma lista */
  qsa('[data-filtra]').forEach(function (campo) {
    var lista = qs(campo.getAttribute('data-filtra'));
    var saida = qs('#' + (campo.getAttribute('aria-describedby') || '').split(' ').pop());
    if (!lista) return;
    campo.addEventListener('input', function () {
      var termo = campo.value.trim().toLowerCase();
      var visiveis = 0;
      qsa('li', lista).forEach(function (li) {
        var bate = !termo || li.textContent.toLowerCase().indexOf(termo) > -1;
        li.hidden = !bate;
        if (bate) visiveis++;
      });
      if (saida) saida.textContent = termo ? visiveis + (visiveis === 1 ? ' aluno encontrado' : ' alunos encontrados') : '';
    });
  });

  /* Estado inicial a partir do endereço (#erro, #carregando...) */
  function lerHash() {
    var h = decodeURIComponent((location.hash || '').slice(1));
    if (estados.indexOf(h) > -1) mostrar(h, { hash: false });
  }
  lerHash();
  window.addEventListener('hashchange', lerHash);
})();
