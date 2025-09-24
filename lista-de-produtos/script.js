const form = document.getElementById("form");
const input = document.getElementById("itens");
const tableItens = document.getElementById("table-body");
const table = document.getElementById("table");

const produtos = [];
let produtosOrdenados = [];
let isOrder = false;

form.addEventListener("submit", (element) => {
  element.preventDefault();
  addItens();
  form.reset();
});

function addItens() {
  const itens = input.value.trim();

  if (itens) {
    table.classList.remove("display-none");
    produtos.push(itens.toUpperCase());
    updateTable(produtos);
    input.value = "";
  }
}

function updateTable(array) {
  tableItens.innerHTML = "";

  array.forEach((produto, id) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${id + 1}</td> 
    <td class="td-item">${produto} </td>
    <td class="td-actions">
      <button class="btn-remove-item" onclick="removeItens('${produto}')">X</button>
      <button class="btn-edit-item">✎</button>
    </td>
    `;

    tableItens.appendChild(tr);
  });

  // console.log(array);
}

function removeItens(nomeProduto) {
  const indexOriginal = produtos.indexOf(`${nomeProduto}`);

  if (indexOriginal !== -1) {
    produtos.splice(indexOriginal, 1);
  }

  const indexOrdenado = produtosOrdenados.indexOf(`${nomeProduto}`);

  if (indexOrdenado !== -1) {
    produtosOrdenados.splice(indexOrdenado, 1);
  }

  updateTable(isOrder ? produtosOrdenados : produtos);
}

function sortTable() {
  if (produtos.length !== 0) {
    if (!isOrder) {
      produtosOrdenados = [...produtos].sort();
      isOrder = true;
      updateTable(produtosOrdenados);
    } else {
      isOrder = false;
      updateTable(produtos);
    }
  }
  console.log("foi");
}
