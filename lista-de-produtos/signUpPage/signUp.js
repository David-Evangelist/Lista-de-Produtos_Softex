const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const produto = document.getElementById("produto").value.trim();
  const preco = document.getElementById("preco").value.trim();
  const categoria = document.getElementById("categoria").value;
  const origem = document.getElementById("origem").value.trim();
  const lote = document.getElementById("lote").value.trim();
  const validade = document.getElementById("validade").value;

  if (!produto) return;

  const novoProduto = {
    produto: produto.toUpperCase(),
    preco,
    categoria,
    origem,
    lote,
    validade,
  };

  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.push(novoProduto);

  localStorage.setItem("produtos", JSON.stringify(produtos));

  form.reset();
  alert("Produto adicionado com sucesso!");
});
