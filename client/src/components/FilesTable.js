import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export default function FilesTable({ files }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody key={12938}>
        {files}
        {/* {data.map((file, idx) => (
      <tr key={idx}>
        <td>{file.file}</td>
      </tr>
    ))} */}
      </tbody>
    </Table>
  );
}
