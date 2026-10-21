const botao = document.getElementById("botaoBuscar");

botao.addEventListener("click", buscarCEP);

async function buscarCEP() {
    const cep = document.getElementById("cep").value
        .replace(/\D/g, "");

    const mensagem = document.getElementById("mensagem");
    const resultado = document.getElementById("resultado");

    resultado.hidden = true;
    mensagem.textContent = "";

    // Verifica se o CEP possui 8 números
    if (cep.length !== 8) {
        mensagem.textContent =
            "Digite um CEP válido com 8 números.";
        return;
    }

    try {
        // Busca os dados na API ViaCEP
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Falha na consulta.");
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se o CEP existe
        if (dados.erro) {
            throw new Error("CEP não encontrado.");
        }

        // Atualiza os elementos da página
        document.getElementById("rua").textContent =
            dados.logradouro || "Não informado";

        document.getElementById("bairro").textContent =
            dados.bairro || "Não informado";

        document.getElementById("cidade").textContent =
            dados.localidade || "Não informado";

        document.getElementById("estado").textContent =
            dados.uf || "Não informado";

        resultado.hidden = false;
        mensagem.textContent = "Endereço encontrado com sucesso!";

    } catch (erro) {
        mensagem.textContent =
            "Não foi possível encontrar o CEP. Verifique e tente novamente.";
    }
}
