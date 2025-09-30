const tableItens = document.getElementById("table-body");
const table = document.getElementById("table");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editProduto = document.getElementById("editProduto");
const editPreco = document.getElementById("editPreco");
const editCategoria = document.getElementById("editCategoria");
const editOrigem = document.getElementById("editOrigem");
const editLote = document.getElementById("editLote");
const editValidade = document.getElementById("editValidade");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let produtosOrdenados = [];
let isOrder = false;
let editIndex = null;

// FUNÇÃO DE ATUALIZAR TABELA
function updateTable(array) {
  tableItens.innerHTML = "";

  if (array.length === 0) {
    table.classList.add("display-none");
    return;
  } else {
    table.classList.remove("display-none");
  }

  array.forEach((produto, id) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${id + 1}</td> 
      <td>${produto.produto}</td>
      <td>${produto.preco}</td>
      <td>${produto.categoria}</td>
      <td>${produto.validade}</td>
      <td>${produto.origem}</td>
      <td>${produto.lote}</td>
      <td>
        <button onclick="editItem(${id})" class="btn-edit-item">✎</button>
        <button onclick="removeItem(${id})" class="btn-remove-item">X</button>
      </td>
    `;

    tableItens.appendChild(tr);
  });
}

// FUNÇÃO DE REMOVER ITEM
function removeItem(index) {
  produtos.splice(index, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  updateTable(isOrder ? produtosOrdenados : produtos);
}

// FUNÇÃO DE ORDENAR A TABELA
function sortTable() {
  if (!isOrder) {
    produtosOrdenados = [...produtos].sort((a, b) =>
      a.produto.localeCompare(b.produto)
    );
    isOrder = true;
    updateTable(produtosOrdenados);
  } else {
    isOrder = false;
    updateTable(produtos);
  }
}

// FUNÇÃO DE PESQUISAR PRODUTOS
function searchTable() {
  const termo = searchInput.value.trim().toUpperCase();
  if (termo === "") {
    updateTable(produtos);
    return;
  }

  const resultado = produtos.filter((p) => p.produto.includes(termo));

  updateTable(resultado);
}

// FUNÇÃO DE EDITAR ITEM
function editItem(index) {
  editIndex = index;
  const p = produtos[index];

  editProduto.value = p.produto;
  editPreco.value = p.preco;
  editCategoria.value = p.categoria;
  editOrigem.value = p.origem;
  editLote.value = p.lote;
  editValidade.value = p.validade;

  editModal.showModal();
}

function closeEditModal() {
  editModal.close();
  editIndex = null;
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editIndex === null) return;

  produtos[editIndex] = {
    produto: editProduto.value.trim().toUpperCase(),
    preco: editPreco.value.trim(),
    categoria: editCategoria.value,
    origem: editOrigem.value.trim(),
    lote: editLote.value.trim(),
    validade: editValidade.value,
  };

  localStorage.setItem("produtos", JSON.stringify(produtos));
  updateTable(isOrder ? produtosOrdenados : produtos);
  closeEditModal();
});

searchButton.addEventListener("click", searchTable);
searchInput.addEventListener("keyup", searchTable);

// Inicializa tabela
updateTable(produtos);
