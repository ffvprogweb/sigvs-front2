import React, { useState, useEffect } from "react";
import {
  cadastroDeProduto,
  obtemProduto,
  updateProduto,
} from "../ProdutoServico";
import { useNavigate, useParams } from "react-router-dom";
const CadastrarProduto = () => {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidadeNoEstoque, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const { id } = useParams();
  const [errors, setErros] = useState({
    descricao: "",
    categoria: "",
    quantidadeNoEstoque: "",
    custo: "",
  });
  const navigator = useNavigate();
  useEffect(() => {
    if (id) {
      obtemProduto(id)
        .then((response) => {
          setDescricao(response.data.descricao);
          setCategoria(response.data.categoria);
          setQuantidade(response.data.quantidadeNoEstoque);
          setCusto(response.data.custo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function manipulaDescricao(e) {
    setDescricao(e.target.value);
  }
  function manipulaCategoria(e) {
    setCategoria(e.target.value);
  }
  function manipulaQuantidade(e) {
    setQuantidade(e.target.value);
  }
  function manipulaCusto(e) {
    setCusto(e.target.value);
  }
  function pageTitle() {
    if (id) {
      return <h2 className="text-center"> Atualizar Produto</h2>;
    } else {
      return <h2 className="text-center"> Cadastrar Produto</h2>;
    }
  }

  function saveOrUpdateProduto(e) {
    e.preventDefault();
    if (validateForm()) {
      const produto = { descricao, categoria, quantidadeNoEstoque, custo };
      console.log(produto);
      if (id) {
        updateProduto(id, produto)
          .then((response) => {
            console.log("produto atualizado", response.data);
            navigator("/produtos");
          })
          .catch((error) => {
            console.error("erro no update", error);
          });
      } else {
        cadastroDeProduto(produto)
          .then((response) => {
            console.log("retorno da api produto cadastrado=>", response.data);
            navigator("/produtos");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const msgErro = { ...errors };
    if (descricao.trim()) {
      msgErro.descricao = "";
    } else {
      msgErro.descricao = "A descrição do produto é obrigatorio. ";
      valid = false;
    }
    if (categoria.trim()) {
      msgErro.categoria = "";
    } else {
      msgErro.categoria = "A categoria do produto é obrigatorio. ";
      valid = false;
    }
    if (quantidadeNoEstoque > 0) {
      msgErro.quantidadeNoEstoque = "";
    } else {
      msgErro.quantidadeNoEstoque = "A quantidade deve ser maior que zero. ";
      valid = false;
    }
    if (custo > 0) {
      msgErro.custo = "";
    } else {
      msgErro.custo = "O custo deve ser maior que zero. ";
      valid = false;
    }
    setErros(msgErro);
    return valid;
  }
  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card">
          {pageTitle()}

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> Descrição:</label>
                <input
                  type="text"
                  placeholder="Entre com a descrição do produto"
                  name="descricao"
                  value={descricao}
                  className={`form-control ${
                    errors.descricao ? `is-invalid` : ``
                  }`}
                  onChange={manipulaDescricao}
                ></input>
                {errors.descricao && (
                  <div className="invalid-feedback"> {errors.descricao}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Categoria:</label>
                <input
                  type="text"
                  placeholder="Entre com a categoria a qual o produto pertence"
                  name="categoria"
                  value={categoria}
                  className={`form-control ${
                    errors.categoria ? `is-invalid` : ``
                  }`}
                  onChange={manipulaCategoria}
                ></input>
                {errors.categoria && (
                  <div className="invalid-feedback"> {errors.categoria}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Quantidade:</label>
                <input
                  type="number"
                  placeholder="Entre com a quantidade armazenada no estoque do produto"
                  name="quantidadeNoEstoque"
                  value={quantidadeNoEstoque}
                  className={`form-control ${
                    errors.quantidadeNoEstoque ? `is-invalid` : ``
                  }`}
                  onChange={manipulaQuantidade}
                ></input>
                {errors.quantidadeNoEstoque && (
                  <div className="invalid-feedback">
                    {" "}
                    {errors.quantidadeNoEstoque}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> Custo:</label>
                <input
                  type="number"
                  placeholder="Entre com o custo do produto"
                  name="custo"
                  value={custo}
                  className={`form-control ${errors.custo ? `is-invalid` : ``}`}
                  onChange={manipulaCusto}
                ></input>
                {errors.custo && (
                  <div className="invalid-feedback"> {errors.custo}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateProduto}>
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CadastrarProduto;
