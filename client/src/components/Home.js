import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FilesTable from "./FilesTable";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchData, fetchList } from "../helper/helper";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [availableFiles, setFiles] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getData() {
      const fetchedFiles = await fetchList();
      setFiles(fetchedFiles);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchData();
      setData(fetchedData);
    }
    getData();
  }, [isClicked]);

  const files = data.map((file, idx) => {
    let fileName = file.file;
    return file.lines.map((line, index) => (
      <tr key={`${idx}-${index}`}>
        <td>{fileName}</td>
        <td>{line.text}</td>
        <td>{line.number}</td>
        <td>{line.hex}</td>
      </tr>
    ));
  });

  const filteredFiles =
    filteredData.length &&
    filteredData[0].lines.map((line, idx) => (
      <span key={idx}>
        <hr />
        <p>
          <b>Text:</b> {line.text}
        </p>
        <p>
          <b>Number:</b> {line.number}
        </p>
        <p>
          <b>Hex:</b> {line.hex}
        </p>
      </span>
    ));

  const handleClose = () => setShow(false);
  const handleShow = async (name) => {
    const fetchedData = await fetchData(name);
    if (fetchedData?.message) alert(fetchedData.message);
    setFilteredData(fetchedData);
    setShow(true);
  };

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" color="primary">
            Toolbox Challenge
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mb-5">
        <h1 className="mt-5 mb-4">FullStack Choice Challenge</h1>
        <h3 className="mt-5 mb-5">Lista de archivos disponibles</h3>
        <p className="mb-4">
          Puedes descargar los archivos individualmente haciendoles click.
        </p>
        <ListGroup horizontal>
          {availableFiles.map((name) => (
            <ListGroup.Item
              key={name}
              variant="info"
              className="mb-2"
              onClick={() => handleShow(name)}
              style={{ cursor: "pointer" }}
              active={name === filteredData[0]?.file}
              action
            >
              Archivo {name}
            </ListGroup.Item>
          ))}
        </ListGroup>
        {filteredData.length ? (
          <Alert variant="success">
            <Alert.Heading>{filteredData[0].file}</Alert.Heading>
            {filteredFiles}
          </Alert>
        ) : (
          ""
        )}
        <h5 className="mt-5 mb-4">
          Haz click en el botón "Descargar" para descargar todos los archivos
        </h5>
        <Button
          className="mb-4"
          variant="primary"
          onClick={() => setIsClicked(true)}
          disabled={isClicked}
        >
          Descargar
        </Button>
        {isClicked && <FilesTable files={files} />}
      </Container>
    </>
  );
}
