import React, { useState } from "react";

const listTransaction = [
  {
    dados: "2019-01-01 12:00:00+03",
    valencia: "30895.46",
    tipo: "DEPOSITO",
    operador: null,
  },
  {
    dados: "2019-02-03 09:53:27+03",
    valencia: "12.24",
    tipo: "DEPOSITO",
    operador: null,
  },
  {
    dados: "2019-05-04 08:12:45+03",
    valencia: "-500.50",
    tipo: "SAQUE",
    operador: "Fulano",
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

function App() {
  const [searchValues, setSearchValues] = useState({});

  const handleInputChange = (event) => {
    setSearchValues({
      ...searchValues,
      [event.target.name]: event.target.value,
    });
  };
  console.log(searchValues);
  return (
    <div className="App">
      <div>
        <label>
          Data de início:
          <input type="date" name="startDate" onChange={handleInputChange} />
        </label>
        <label>
          Data de fim:
          <input type="date" name="endDate" onChange={handleInputChange} />
        </label>
        <label>
          Nome do operador transacionado
          <input type="text" name="operatorName" onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <button>Pesquisar</button>
      </div>
      <div>
        <div>
          <p>Saldo total R$ 00,00</p>
          <p>Saldo no período R$ 00,00</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Dados</th>
              <th>Valencia</th>
              <th>Tipo</th>
              <th>Nome do operador transacionado</th>
            </tr>
          </thead>
          <tbody>
            {listTransaction.map((transaction, index) => (
              <tr key={index}>
                <td>{formatDate(transaction.dados)}</td>
                <td>R$ {transaction.valencia}</td>
                <td>{transaction.tipo}</td>
                <td>{transaction.operador ? transaction.operador : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
