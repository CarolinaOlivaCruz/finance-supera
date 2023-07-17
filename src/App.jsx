import React, { useState } from "react";
import './App.css';

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

  return (
    <div className="App">
      <div className="search-container">
        <label className="search-label">
          Data de início:
          <input
            type="date"
            name="startDate"
            onChange={handleInputChange}
            className="search-input"
          />
        </label>
        <label className="search-label">
          Data de fim:
          <input
            type="date"
            name="endDate"
            onChange={handleInputChange}
            className="search-input"
          />
        </label>
        <label className="search-label">
          Nome do operador transacionado:
          <input
            type="text"
            name="operatorName"
            onChange={handleInputChange}
            className="search-input"
          />
        </label>
      </div>
      <div>
        <button className="search-button">Pesquisar</button>
      </div>
      <div>
        <div className="container-balance">
          <p>Saldo total R$ 00,00</p>
          <p>Saldo no período R$ 00,00</p>
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th className="table-header">Dados</th>
              <th className="table-header">Valencia</th>
              <th className="table-header">Tipo</th>
              <th className="table-header">Nome do operador transacionado</th>
            </tr>
          </thead>
          <tbody>
            {listTransaction.map((transaction, index) => (
              <tr key={index}>
                <td className="table-data">{formatDate(transaction.dados)}</td>
                <td className="table-data">R$ {transaction.valencia}</td>
                <td className="table-data">{transaction.tipo}</td>
                <td className="table-data">
                  {transaction.operador ? transaction.operador : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
