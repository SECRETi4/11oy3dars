import { Table } from "antd";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [malumot, setMalumot] = useState([]);
  const [search, setSearch] = useState("");

  async function getData() {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,population,area"
    );
    const data = await res.json();
    setMalumot(data);
  }

  useEffect(() => {
    getData();
  }, []);


  const input = malumot.filter((qidiruv) =>
    qidiruv.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Bayrogi",
      dataIndex: ["flags", "png"],
      key: "png",
      render: (url) => (
        <img
          src={url}
          alt="flag"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Davlat",
      dataIndex: ["name", "common"],
      key: "name",
    },
    {
      title: "Poytaxti",
      dataIndex: "capital",
      key: "capital",
      
    },
    {
      title: "Chegaradosh",
      dataIndex: "borders",
      key: "borders",
      render: (borders) => (borders ? borders.join(", ") : "Yo‘q"),
    },
    {
      title: "Aholisi",
      dataIndex: "population",
      key: "population",
    },
    {
      title: "Maydoni",
      dataIndex: "area",
      key: "area",
    },
  ];

  return (
    <div className="body">
      <div className="ota">
        <div className="inputdiv">
        <input
          type="text"
          placeholder="Davlat nomini yozing..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
        {malumot && <Table dataSource={input} columns={columns} rowKey={(row)=>row.name.common} />}
      </div>
    </div>
  );
}

export default App;
