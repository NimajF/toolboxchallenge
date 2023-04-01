import fs from "fs";
import path from "path";
import mocha from "mocha";
import chai from "chai";
import app from "../server.js";
import chaiHttp from "chai-http";

console.log("TEST");
const suite = new mocha();

chai.use(chaiHttp);
chai.should();

describe("API data/files TEST", () => {
  it("Debe devolver una lista con todos los archivos correctamente filtrados y formateados.", (done) => {
    chai
      .request(app)
      .get("/api/files/data")
      .end((err, res) => {
        if (err) {
          console.log(err);
          done(err);
        } else {
          res.should.have.status(200); // Tiene que devolver un status 200
          res.body.should.be.an("array"); // El body tiene que ser un array (array de objectos)
          res.body.length.should.not.be.eq(0); // Array no tiene que estar vacío (a menos TODOS los files no puedan ser formateador por algun error de los mismos)
          for (let file of res.body) {
            // Iteramos por cada file dentro de lines y checkeamos lo mismo
            file.lines.should.be.an("array");
            file.lines.length.should.not.be.eq(0);
          }
          done();
        }
      });
  });
});
