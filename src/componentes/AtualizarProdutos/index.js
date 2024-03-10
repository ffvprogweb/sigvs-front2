import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
const AtualizarProduto = () => {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [custo, setCusto] = useState("");
  const [quantidadeNoEstoque, setQuantidadeNoEstoque] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastroProduto = async () => {
    const produto = {
      descricao,
      categoria,
      custo: parseFloat(custo), // Converter custo para número
      quantidadeNoEstoque: parseInt(quantidadeNoEstoque, 0), // Converter quantidade para número inteiro
    };

    try {
      const resposta = await fetch("http://localhost:8080/api/v1/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar o produto.");
      }

      setMensagem("Produto cadastrado com sucesso!");
    } catch (error) {
      setMensagem(
        "Erro ao cadastrar o produto. Verifique os dados informados."
      );
    }
  };
  const handleCancelar = () => {
    // Navegar para a rota "/home"
    navigate("/home");
  };
  const title = <h5>{"Cadastar Produto"}</h5>;
  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form>
          <FormGroup>
            <Label for="descricao"> Descrição </Label>
            <Input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <br />
            <Label for="categoria"> Categoria </Label>
            <Input
              id="categoria"
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
            <br />
            <Label for="custo"> Custo </Label>
            <Input
              id="custo"
              type="text"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />
            <br />
            <Label for="quantidade"> Quantidade no estoque </Label>
            <Input
              id="quantidade"
              type="text"
              value={quantidadeNoEstoque}
              onChange={(e) => setQuantidadeNoEstoque(e.target.value)}
            />
            <br />
            <Button color="primary" onClick={handleCadastroProduto}>
              Cadastrar Produto
            </Button>{" "}
            <Button color="primary" onClick={handleCancelar}>
              Voltar
            </Button>
            {mensagem && <div>{mensagem}</div>}
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};
export default CadastroProduto;
