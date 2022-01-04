import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./css/Principal.css"
const API = process.env.REACT_APP_API;
//const API = "http://127.0.0.1:5000/";
const listReports = [
  ["1", "(1)Tendencia de la infección por Covid-19 en un País."], //Hechoo
  ["2", "(2)Predicción de Infectados en un País."], //Hechoo
  ["3", "(3)Indice de progresión de la pandemia."], //Hecho
  ["4", "(4)Predicción de mortalidad por COVID en un Departamento."], //Hechoo
  ["5", "(5)Predicción de mortalidad por COVID en un País."], //Hechoo
  ["6", "(6)Análisis del número de muertes por coronavirus en un País."], //Hechoo
  ["7", "(7)Tendencia del número de infectados por día de un País."], 
  ["8", "(8)Predicción de casos de un país para un año."], //Hecho
  ["9", "(9)Tendencia de la vacunación en un País."], //Hechoo
  ["10", "(10)Ánalisis Comparativo de Vacunación entre 2 paises."], //Hecho
  ["11", "(11)Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo"],
  ["12", "(12)Ánalisis Comparativo entres 2 o más paises o continentes."],
  ["13", "(13)Muertes promedio por casos confirmados y edad de covid 19 en un País."],
  ["14", "(14)Muertes según regiones de un país - Covid 19."],
  ["15", "(15)Tendencia de casos confirmados de Coronavirus en un departamento de un País."], //Hecho
  ["16", "(16)Porcentaje de muertes frente al total de casos en un país, región o continente."],
  ["17", "(17)Tasa de comportamiento de casos activos en relación al número de muertes en un continente."],
  ["18", "(18)Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País."],
  ["19", "(19)Predicción de muertes en el último día del primer año de infecciones en un país."],
  ["20", "(20)Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19"],
  ["21", "(21)Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor"],
  ["22", "(22)Tasa de mortalidad por coronavirus (COVID-19) en un país."],
  ["23", "(23)Factores de muerte por COVID-19 en un país."],
  ["24", "(24)Comparación entre el número de casos detectados y el número de pruebas de un país."],
  ["25", "(25)Predicción de casos confirmados por día."]
];

export const Principal = () => {
  const [parametersReport, setParametersReport] = useState([]);
  const [actualReport, setActualReport] = useState("0");
  const [fileType, setFileType] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [conclusion, setConclusion] = useState("");

  const readFile = (e) => {
    const data = e.target.files[0];
    if (!data) return;
    var type = String(e.target.files[0].name);
    type = type.includes(".csv") ? ".csv" : type.includes(".json") ? ".json" : type.includes(".xlsx") ? ".xlsx" : type.includes(".xls") ? ".xls" : "No se guardo archivo";
    setFileType(type);
    let form = new FormData();
    form.append('myFile', data);
    loadFile(form)
  }

  const loadFile = async (archivo) => {
    const result = await fetch(`${API}/loadFile`, {
      method: "POST",
      body: archivo
    });
    const data = await result.json();
    if (data === "Recived") {
      alert("Archivo cargado con éxito");
    }
  };

  const parametrize = (e) => {
    e.preventDefault();
    setImage("");
    setImage2("");
    setConclusion("");
    var item = document.getElementById("selectReport").value;
    setActualReport(item);
    if (item === "1") {
      let date = [["Nombre de la columna del pais", "countryColumnR1"], ["Nombre de la columna de infectados", "infectedColumnR1"], ["Ingrese el nombre de la columna de los dias", "daysColumnR1"], ["Nombre del pais a evaluar", "countryR1"]];
      setParametersReport([...date]);
    } else if (item === "2") {
      let date = [["Nombre de la columna del pais", "countryColumnR2"], ["Nombre de la columna de infectados", "infectedColumnR2"], ["Ingrese el nombre de la columna de los dias", "daysColumnR2"], ["Nombre del pais a evaluar", "countryR2"], ["Fecha a realizar predicción", "daysPredictR2"]];
      setParametersReport([...date]);
    } else if (item === "3") {
      let date = [["Nombre de la columna de infectados", "infectedColumnR3"], ["Ingrese el nombre de la columna de los dias", "daysColumnR3"]];
      setParametersReport([...date]);
    } else if (item === "4") {
      let date = [["Nombre de la columna del pais", "countryColumnR4"], ["Nombre de la columna de los departamentos", "departmentColumnR4"], ["Nombre de la columna de cantidad de muertos", "deadsR4"], ["Ingrese el nombre de la columna de los dias", "daysColumnR4"], ["Nombre del pais a evaluar", "countryR4"], ["Nombre del departamento o estado a evaluar", "departmentR4"], ["Fecha a realizar predicción", "daysPredictR4"]];
      setParametersReport([...date]);
    } else if (item === "5") {
      let date = [["Nombre de la columna del pais", "countryColumnR5"], ["Nombre de la columna de cantidad de muertos", "deadsR5"], ["Ingrese el nombre de la columna de los dias", "daysColumnR5"], ["Nombre del pais a evaluar", "countryR5"], ["Fecha a realizar predicción", "daysPredictR5"]];
      setParametersReport([...date]);
    } else if (item === "6") {
      let date = [["Nombre de la columna del pais", "countryColumnR6"], ["Nombre de la columna de cantidad de muertos", "deadsR6"], ["Ingrese el nombre de la columna de los dias", "daysColumnR6"], ["Nombre del pais a evaluar", "countryR6"]];
      setParametersReport([...date]);
    } else if (item === "8") {
      let date = [["Nombre de la columna del pais", "countryColumnR8"], ["Nombre de la columna de infectados", "infectedColumnR8"], ["Ingrese el nombre de la columna de los dias", "daysColumnR8"], ["Nombre del pais a evaluar", "countryR8"]];
      setParametersReport([...date]);
    } else if (item === "9") {
      let date = [["Nombre de la columna del pais", "countryColumnR9"], ["Nombre de la columna de cantidad de vacunados", "vaccinedsR9"], ["Ingrese el nombre de la columna de los dias", "daysColumnR9"], ["Nombre del pais a evaluar", "countryR9"]];
      setParametersReport([...date]);
    } else if (item === "10") {
      let date = [["Nombre de la columna del pais", "countryColumnR10"], ["Nombre de la columna de cantidad de vacunados", "vaccinedsR10"], ["Ingrese el nombre de la columna de los dias", "daysColumnR10"], ["Nombre del pais a evaluar A", "countryAR10"], ["Nombre del pais a evaluar B", "countryBR10"]];
      setParametersReport([...date]);
    } else if (item === "15") {
      let date = [["Nombre de la columna del pais", "countryColumnR15"], ["Nombre de la columna de los departamentos", "departmentColumnR15"], ["Nombre de la columna de cantidad de confirmados", "confirmedsR15"], ["Ingrese el nombre de la columna de los dias", "daysColumnR15"], ["Nombre del pais a evaluar", "countryR15"], ["Nombre del departamento o estado a evaluar", "departmentR15"]];
      setParametersReport([...date]);
    }
  };

  const generateReport = async (e) => {
    e.preventDefault();
    var conc = "";
    if (actualReport === "1") {
      let countryColumn = document.getElementById("countryColumnR1Parameter").value;
      let infectedColumn = document.getElementById("infectedColumnR1Parameter").value;
      let daysColumn = document.getElementById("daysColumnR1Parameter").value;
      let countryName = document.getElementById("countryR1Parameter").value;
      const result = await fetch(`${API}/report1`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            infectedColumn: infectedColumn,
            countryName: countryName
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Tendencia de infección de covid-19 con un error de " + data.r2 + " y un rme de " + data.rme;
      setConclusion(conc);
    } else if (actualReport === "2") {
      let countryColumn = document.getElementById("countryColumnR2Parameter").value;
      let infectedColumn = document.getElementById("infectedColumnR2Parameter").value;
      let daysColumn = document.getElementById("daysColumnR2Parameter").value;
      let countryName = document.getElementById("countryR2Parameter").value;
      let timePredict = document.getElementById("daysPredictR2Parameter").value;
      const result = await fetch(`${API}/report2`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            infectedColumn: infectedColumn,
            countryName: countryName,
            timePredict: timePredict
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Prediccion de covid-19 con un error de " + data.r2 + " y un rme de " + data.rme + ", la predicción para " + timePredict + " es: " + data.predict;
      setConclusion(conc);
    } else if (actualReport === "3") {
      let infectedColumn = document.getElementById("infectedColumnR3Parameter").value;
      let daysColumn = document.getElementById("daysColumnR3Parameter").value;
      const result = await fetch(`${API}/report3`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            daysColumn: daysColumn,
            infectedColumn: infectedColumn,
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "el índice de progresión de la pandemia obtenido es: "+data.indice;
      setConclusion(conc);
    } else if (actualReport === "4") {
      let countryColumn = document.getElementById("countryColumnR4Parameter").value;
      let countryName = document.getElementById("countryR4Parameter").value;
      let deads = document.getElementById("deadsR4Parameter").value;
      let daysColumn = document.getElementById("daysColumnR4Parameter").value;
      let timePredict = document.getElementById("daysPredictR4Parameter").value;
      let departmentColumn = document.getElementById("departmentColumnR4Parameter").value;
      let department = document.getElementById("departmentR4Parameter").value;
      const result = await fetch(`${API}/report4`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            deads: deads,
            countryName: countryName,
            timePredict: timePredict,
            departmentColumn: departmentColumn,
            department: department
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Prediccion de mortalidad con un error de " + data.r2 + " y un rme de " + data.rme + ", la predicción para " + timePredict + " es: " + data.predict;
      setConclusion(conc);
    } else if (actualReport === "5") {
      let countryColumn = document.getElementById("countryColumnR5Parameter").value;
      let countryName = document.getElementById("countryR5Parameter").value;
      let deads = document.getElementById("deadsR5Parameter").value;
      let daysColumn = document.getElementById("daysColumnR5Parameter").value;
      let timePredict = document.getElementById("daysPredictR5Parameter").value;
      const result = await fetch(`${API}/report5`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            deads: deads,
            countryName: countryName,
            timePredict: timePredict
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Prediccion de mortalidad con un error de " + data.r2 + " y un rme de " + data.rme + ", la predicción para " + timePredict + " es: " + data.predict;
      setConclusion(conc);
    } else if (actualReport === "6") {
      let countryColumn = document.getElementById("countryColumnR6Parameter").value;
      let countryName = document.getElementById("countryR6Parameter").value;
      let deads = document.getElementById("deadsR6Parameter").value;
      let daysColumn = document.getElementById("daysColumnR6Parameter").value;
      const result = await fetch(`${API}/report6`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            deads: deads,
            countryName: countryName,
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Tendencia, con un error de " + data.r2 + " y un rme de " + data.rme;
      setConclusion(conc);
    } else if (actualReport === "8") {
      let countryColumn = document.getElementById("countryColumnR8Parameter").value;
      let countryName = document.getElementById("countryR8Parameter").value;
      let infectedColumn = document.getElementById("infectedColumnR8Parameter").value;
      let daysColumn = document.getElementById("daysColumnR8Parameter").value;
      const result = await fetch(`${API}/report8`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            infectedColumn: infectedColumn,
            countryName: countryName
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Predicción de casos de covid para un año, del país " + countryName;
      setConclusion(conc);
    } else if (actualReport === "9") {
      let countryColumn = document.getElementById("countryColumnR9Parameter").value;
      let countryName = document.getElementById("countryR9Parameter").value;
      let vaccineds = document.getElementById("vaccinedsR9Parameter").value;
      let daysColumn = document.getElementById("daysColumnR9Parameter").value;
      const result = await fetch(`${API}/report9`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            vaccineds: vaccineds,
            countryName: countryName
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Tendencia de vacunaciones contra covid-19 con un error de " + data.r2 + " y un rme de " + data.rme;
      setConclusion(conc);
    } else if (actualReport === "10") {
      let countryColumn = document.getElementById("countryColumnR10Parameter").value;
      let countryNameA = document.getElementById("countryAR10Parameter").value;
      let countryNameB = document.getElementById("countryBR10Parameter").value;
      let vaccineds = document.getElementById("vaccinedsR10Parameter").value;
      let daysColumn = document.getElementById("daysColumnR10Parameter").value;
      const result = await fetch(`${API}/report10`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            vaccineds: vaccineds,
            countryNameA: countryNameA,
            countryNameB: countryNameB
          })
      });
      const data = await result.json();
      setImage(data.image);
      setImage2(data.image2);
      conc = "Comparación entre tendencias de vacunaciones contra covid-19 con un error de " + data.r2 + " y un rme de " + data.rme;
      setConclusion(conc);
    } else if (actualReport === "15") {
      let countryColumn = document.getElementById("countryColumnR15Parameter").value;
      let countryName = document.getElementById("countryR15Parameter").value;
      let confirmeds = document.getElementById("confirmedsR15Parameter").value;
      let daysColumn = document.getElementById("daysColumnR15Parameter").value;
      let departmentColumn = document.getElementById("departmentColumnR15Parameter").value;
      let department = document.getElementById("departmentR15Parameter").value;
      const result = await fetch(`${API}/report15`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            fileType: fileType,
            countryColumn: countryColumn,
            daysColumn: daysColumn,
            confirmeds: confirmeds,
            countryName: countryName,
            departmentColumn: departmentColumn,
            department: department
          })
      });
      const data = await result.json();
      setImage(data.image);
      conc = "Prediccion de mortalidad con un error de " + data.r2 + " y un rme de " + data.rme;
      setConclusion(conc);
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const input = document.getElementById('toReportPDF');
    html2canvas(input)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Reporte.pdf`);
      });
  }

  return (
    <div>
      <div className="containter p-3">
        <input
          type="file"
          multiple={false}
          onChange={readFile}
          accept=".json, .csv, .xls, .xlsx"
        />
        <label htmlFor="cars">Seleccione un reporte</label>
        <select name="selectReport" id="selectReport">
          {
            listReports.map(report => {
              return (
                <option key={report[0]} value={report[0]}>{report[1]}</option>
              )
            })
          }
        </select>
        <p></p>
        <button className="btn btn-dark" onClick={parametrize}>
          Parametrizar
        </button>
      </div>
      <div className="container p-2 col s7">
        <table className="table table-striped">
          <thead>
            <tr>
              <th><h6>Parametros del archivo</h6></th>
              <th><h6>Parametros necesarios para este reporte</h6></th>
            </tr>
          </thead>
          <tbody>
            {
              parametersReport.map(param => {
                return (
                  <tr key={param[1]}>
                    <td>
                      <input id={param[1] + "Parameter"} type="text"></input>
                    </td>
                    <td><h5>{param[0]}</h5></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {
          actualReport !== "0" && <div>
            <button className="btn btn-primary" onClick={generateReport}>
              Establecer parametros
            </button>
          </div>
        }
      </div>
      <div>
      </div>
      {
        image !== "" &&
        <div id="toReportPDF">
          <center>
            <div className="container">
              <p className="formH6">{conclusion}</p>
            </div>
            <img src={`data:image/jpeg;base64,${image}`} />
            {
              image2 !== "" &&
              <center>
                <img src={`data:image/jpeg;base64,${image2}`} />
              </center>
            }
          </center>
        </div>
      }
      {
        image !== "" &&
        <div>
          <center>
            <button className="btn btn-success" type="button" onClick={handleDownload}>Descargar</button>
          </center>
        </div>
      }
    </div>
  );
}