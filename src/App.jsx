import React, { useEffect, useState } from "react";
import "./App.css";
import { API } from "./services/api";

function App() {
  const [transactionList, setTransactionList] = useState([]);
  const [searchValues, setSearchValues] = useState({
    dateMin: "",
    dateMax: "",
    operator: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setSearchValues((prevSearchValues) => ({
      ...prevSearchValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const listAllTransactions = async () => {
      try {
        const response = await API.get("/transfers");
        setTransactionList(response.data);
      } catch (error) {
        console.log("Error fetching transaction data:", error);
      }
    };
    listAllTransactions();
  }, []);

  const handleSearchClick = async () => {
    try {
      const { dateMin, dateMax, operator } = searchValues;

      const formattedDateMin = dateMin ? formatDate(dateMin) : "";
      const formattedDateMax = dateMax ? formatDate(dateMax) : "";

      const params = {
        operator: operator,
        dateMin: formattedDateMin,
        dateMax: formattedDateMax,
      };

      const response = await API.get("/transfers", { params });
      setTransactionList(response.data);
    } catch (error) {
      console.log("Error searching for transactions:", error);
    }
  };

  return (
    <div className="App">
      <div className="search-container">
        <label className="search-label">
          Data de início:
          <input
            type="date"
            name="dateMin"
            onChange={handleInputChange}
            className="search-input"
          />
        </label>
        <label className="search-label">
          Data de fim:
          <input
            type="date"
            name="dateMax"
            onChange={handleInputChange}
            className="search-input"
          />
        </label>
        <label className="search-label">
          Nome do operador transacionado:
          <input
            type="text"
            name="operator"
            onChange={handleInputChange}
            className="search-input"
          />
        </label>
      </div>
      <div>
        <button className="search-button" onClick={handleSearchClick}>
          Pesquisar
        </button>
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
          {transactionList.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="no-transactions">Nenhuma transação encontrada.</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {transactionList.map((transaction, index) => (
                <tr key={index}>
                  <td className="table-data">
                    {formatDate(transaction.dateAt)}
                  </td>
                  <td className="table-data">R$ {transaction.value}</td>
                  <td className="table-data">{transaction.accountType}</td>
                  <td className="table-data">
                    {transaction.operator?.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
