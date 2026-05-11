// ===================== MENU MOBILE =====================
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');

btnMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('aberto');
});

// ===================== PRODUTOS =====================
const produtos = [
    // Clássicos
    { id: 1, nome: "Trufa de Chocolate Premium", preco: 150.00, estrelas: 4, avaliacoes: 128, categoria: "classico", imagem: "imagens/trufa-premium.png" },
    { id: 2, nome: "Brownie Gourmet com Calda", preco: 120.00, estrelas: 4, avaliacoes: 86, categoria: "classico", imagem: "imagens/brownie-calda.png" },
    { id: 3, nome: "Torta de Chocolate com Caramelo", preco: 155.00, estrelas: 4, avaliacoes: 104, categoria: "classico", imagem: "imagens/torta-chocolate-caramelo.png" },

    // Gourmet
    { id: 4, nome: "Bolo de Chocolate com Frutas Vermelhas", preco: 180.00, estrelas: 5, avaliacoes: 92, categoria: "gourmet", imagem: "imagens/frutas-vermelhas.png" },
    { id: 5, nome: "Bolo de Chocolate Belga Premium", preco: 200.00, estrelas: 5, avaliacoes: 74, categoria: "gourmet", imagem: "imagens/chocolate-belga-premium.png" },
    { id: 6, nome: "Bolo de Chocolate com Maracujá", preco: 200.00, estrelas: 4, avaliacoes: 61, categoria: "gourmet", imagem: "imagens/bolo-maracuja.png" },

    // Vegano
    { id: 7, nome: "Bolo Vegano de Cacau Orgânico", preco: 170.00, estrelas: 5, avaliacoes: 53, categoria: "vegano", imagem: "imagens/vegano.png" },
    { id: 8, nome: "Bolo Vegano de Chocolate com Laranja", preco: 165.00, estrelas: 4, avaliacoes: 48, categoria: "vegano", imagem: "imagens/bolo-laranja.png" },
    { id: 9, nome: "Bolo Vegano de Chocolate com Coco Cremoso", preco: 180.00, estrelas: 4, avaliacoes: 39, categoria: "vegano", imagem: "imagens/bolo-coco.png" },

    // Festas
    { id: 10, nome: "Bolo de Chocolate com Morangos", preco: 175.00, estrelas: 5, avaliacoes: 117, categoria: "festa", imagem: "imagens/chocolate-morangos.png" },
    { id: 11, nome: "Naked Cake de Chocolate", preco: 190.00, estrelas: 4, avaliacoes: 88, categoria: "festa", imagem: "imagens/naked-cake.png" },
    { id: 12, nome: "Bolo de Aniversário Premium", preco: 180.00, estrelas: 5, avaliacoes: 143, categoria: "festa", imagem: "imagens/bolo-aiversario.png" },
];

// ===================== RENDERIZAR PRODUTOS =====================
function gerarEstrelas(qtd) {
    let estrelas = '';
    for (let i = 1; i <= 5; i++) {
        estrelas += i <= qtd ? '★' : '☆';
    }
    return estrelas;
}

function renderizarProdutos(lista) {
    const grade = document.getElementById('grade-produtos');
    grade.innerHTML = '';
    lista.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card-produto');
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="card-info">
                <h3>${produto.nome}</h3>
                <div class="card-estrelas">
                    <span>${gerarEstrelas(produto.estrelas)}</span>
                    <span>(${produto.avaliacoes})</span>
                </div>
                <div class="card-rodape">
                    <span class="card-preco">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn-adicionar" data-id="${produto.id}">+</button>
                </div>
            </div>
        `;
        grade.appendChild(card);
    });

    // Adiciona evento nos botões + depois de renderizar
    document.querySelectorAll('.btn-adicionar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            adicionarAoCarrinho(id);
        });
    });
}

// ===================== FILTRO DE CATEGORIAS =====================
const botoesCategorias = document.querySelectorAll('.card-categoria');
botoesCategorias.forEach(btn => {
    btn.addEventListener('click', () => {
        botoesCategorias.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        const categoria = btn.dataset.categoria;
        renderizarProdutos(produtos.filter(p => p.categoria === categoria));
    });
});

renderizarProdutos(produtos.filter(p => p.categoria === 'classico'));

// ===================== CARRINHO =====================
let carrinho = [];

const drawerCarrinho = document.getElementById('drawer-carrinho');
const overlay = document.getElementById('overlay');
const btnCarrinho = document.getElementById('btn-carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const carrinhоItens = document.getElementById('carrinho-itens');
const carrinhoVazio = document.getElementById('carrinho-vazio');
const valorTotal = document.getElementById('valor-total');
const badgeCarrinho = document.getElementById('badge-carrinho');

// Abre o drawer
btnCarrinho.addEventListener('click', () => {
    drawerCarrinho.classList.add('aberto');
    overlay.classList.add('ativo');
    menuMobile.classList.remove('aberto');
});

// Fecha o drawer
fecharCarrinho.addEventListener('click', fecharDrawer);
overlay.addEventListener('click', fecharDrawer);

function fecharDrawer() {
    drawerCarrinho.classList.remove('aberto');
    overlay.classList.remove('ativo');
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
    drawerCarrinho.classList.add('aberto');
    overlay.classList.add('ativo');
}

function atualizarCarrinho() {
    carrinhoVazio.style.display = carrinho.length === 0 ? 'block' : 'none';

    // Limpa itens antigos
    document.querySelectorAll('.item-carrinho').forEach(el => el.remove());

    let total = 0;
    let qtdTotal = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        qtdTotal += item.quantidade;

        const div = document.createElement('div');
        div.classList.add('item-carrinho');
        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-info">
                <p>${item.nome}</p>
                <p class="item-preco">R$ ${item.preco.toFixed(2)}</p>
                <div class="item-controles">
                    <button class="btn-quantidade" data-acao="diminuir" data-id="${item.id}">−</button>
                    <span class="item-quantidade">${item.quantidade}</span>
                    <button class="btn-quantidade" data-acao="aumentar" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="btn-remover" data-id="${item.id}">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;
        carrinhоItens.appendChild(div);
    });

    // Eventos dos botões de quantidade e remover
    document.querySelectorAll('.btn-quantidade').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const acao = btn.dataset.acao;
            const item = carrinho.find(i => i.id === id);
            if (acao === 'aumentar') item.quantidade++;
            if (acao === 'diminuir') {
                item.quantidade--;
                if (item.quantidade === 0) carrinho = carrinho.filter(i => i.id !== id);
            }
            atualizarCarrinho();
        });
    });

    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            carrinho = carrinho.filter(i => i.id !== id);
            atualizarCarrinho();
        });
    });

    // Atualiza total e badge
    valorTotal.textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById('modal-valor-total').textContent = `R$ ${total.toFixed(2)}`;

    if (qtdTotal > 0) {
        badgeCarrinho.style.display = 'flex';
        badgeCarrinho.textContent = qtdTotal;
    } else {
        badgeCarrinho.style.display = 'none';
    }
}

// ===================== MODAL FINALIZAR =====================
const modalFinalizar = document.getElementById('modal-finalizar');
const btnFinalizar = document.getElementById('btn-finalizar');
const fecharModal = document.getElementById('fechar-modal');
const camposCartao = document.getElementById('campos-cartao');

btnFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) return;
    fecharDrawer();
    modalFinalizar.classList.add('ativo');
});

fecharModal.addEventListener('click', () => {
    modalFinalizar.classList.remove('ativo');
});

// Opções de entrega
document.querySelectorAll('.opcao-entrega').forEach(opcao => {
    opcao.addEventListener('click', () => {
        document.querySelectorAll('.opcao-entrega').forEach(o => o.classList.remove('ativo'));
        opcao.classList.add('ativo');
    });
});

// Formas de pagamento
document.querySelectorAll('.btn-pagamento').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-pagamento').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        // Mostra campos do cartão só para crédito e débito
        const pagamento = btn.dataset.pagamento;
        camposCartao.style.display = (pagamento === 'pix') ? 'none' : 'flex';
    });
});

// ===================== MODAL CONFIRMADO =====================
const modalConfirmado = document.getElementById('modal-confirmado');
const btnConfirmar = document.getElementById('btn-confirmar');
const btnNovoPedido = document.getElementById('btn-novo-pedido');

btnConfirmar.addEventListener('click', () => {
    modalFinalizar.classList.remove('ativo');
    // Gera número do pedido aleatório
    const numeroPedido = '#' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('numero-pedido').textContent = numeroPedido;
    modalConfirmado.classList.add('ativo');
});

btnNovoPedido.addEventListener('click', () => {
    modalConfirmado.classList.remove('ativo');
    carrinho = [];
    atualizarCarrinho();
});