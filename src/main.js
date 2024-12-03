const li = [
    { label: "Valor total do IPI (R$):", input: "", id: "ipi" },
    { label: "Valor total do ICMS (R$):", input: "", id: "icms" },
    { label: "Valor de compra por produto (R$):", input: "", id: "valorDeCompra" },
    { label: "Quantidade de produtos:", input: "", id: "quantidadeDeProduto" }
];

function initInputs() {
    const ul = document.getElementById("app-container-ul");
    const template = document.getElementById("template");

    li.forEach((item) => {
        const clone = document.importNode(template.content, true);
        const label = clone.querySelector("label");
        label.textContent = item.label;
        label.setAttribute("for", item.id);

        const input = clone.querySelector("input");
        input.id = item.id;

        ul.appendChild(clone);
    });
}

function calcularValorFinal() {
    const ipi = parseFloat(document.getElementById("ipi").value);
    const icms = parseFloat(document.getElementById("icms").value);
    const valorDeCompra = parseFloat(document.getElementById("valorDeCompra").value);
    const quantidadeDeProduto = parseInt(document.getElementById("quantidadeDeProduto").value);

    if (isNaN(ipi) || isNaN(icms) || isNaN(valorDeCompra) || isNaN(quantidadeDeProduto) || quantidadeDeProduto <= 0) {
        return "Por favor, preencha todos os campos corretamente.";
    }

    const ipiPorProduto = (ipi / quantidadeDeProduto).toFixed(2);
    const icmsPorProduto = (icms / quantidadeDeProduto).toFixed(2);
    const taxaDeSaida = valorDeCompra * 0.20;
    const valorFinal = valorDeCompra + parseFloat(ipiPorProduto) + parseFloat(icmsPorProduto) + taxaDeSaida;

    return `Valor final: R$ ${valorFinal.toFixed(2)}`;
}

function clearFields() {
    li.forEach((item) => {
        document.getElementById(item.id).value = "";
    });
    document.getElementById("result").textContent = "";
}

function toggleTheme() {
    const darkLightButton = document.getElementById("darkLight");
    document.body.classList.toggle("theme");
    darkLightButton.textContent = document.body.classList.contains("theme") ? "Tema Claro" : "Tema Escuro";
}

window.onload = function () {
    initInputs();

    document.getElementById("calculate").addEventListener("click", () => {
        document.getElementById("result").textContent = calcularValorFinal();
    });

    document.getElementById("clear").addEventListener("click", clearFields);

    document.getElementById("darkLight").addEventListener("click", toggleTheme);
};
