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
}

// ===================== FILTRO DE CATEGORIAS =====================
const botoesCategorias = document.querySelectorAll('.card-categoria');

botoesCategorias.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove ativo de todos
        botoesCategorias.forEach(b => b.classList.remove('ativo'));
        // Adiciona ativo no clicado
        btn.classList.add('ativo');

        const categoria = btn.dataset.categoria;
        const filtrados = produtos.filter(p => p.categoria === categoria);
        renderizarProdutos(filtrados);
    });
});

// Renderiza clássicos por padrão ao carregar
renderizarProdutos(produtos.filter(p => p.categoria === 'classico'));