# Manual t茅cnico

_Proyecto de Organizaci贸n de lenguajes y Compiladores 2_

## Coronavirus Data Analysis With Machine Learning - Proyecto 2馃殌

| Nombre:                     | Carn茅     |
| --------------------------- | --------- |
| Josu茅 David Zea Herrera     | 201807159 |

#### Frontend
### Descripci贸n: 
Para la creaci贸n de la interfaz web se utiliz贸 el framework REACT y sus ventajas para una mejor representaci贸n de la aplicaci贸n al usuario.

### Hooks utilizados en react

| Nombre:                     | Descripci贸n     |
| --------------------------- | --------- |
| parametersReport   | Para almacenar los parametros que se usan por reporte |
| actualReport     | Identificador para saber que reporte se est谩 solicitando |
| fileType     | Almacena la extensi贸n del archivo cargado en el sistema |
| image     | Almacena la codificaci贸n en base64 de la imagen a representar |
| conclusion     | Almacena la conclusi贸n a mostrar por reporte |

## Frontend
#### Metodos principales
## 馃搵 readFile
    const data = e.target.files[0];
    if (!data) return;
    guardo archivo";
    setFileType(type);
    let form = new FormData();
    form.append('myFile', data);
- ### Descripci贸n: 
  Metodo encargado de recibir el archivo que se cargue al sistema, al recibirlo lo env铆a al backend para que se guarde en la memoria del mismo.

## 馃搵 loadFile
    const result = await fetch(`${API}/loadFile`, {
      method: "POST",
      body: archivo
    });
    const data = await result.json();
    if(data === "Recived"){
      alert("Archivo cargado con 茅xito");
    }
- ### Descripci贸n: 
  Metodo que se encarga de enviar al backend el archivo que se carg贸 en el frontend.

## 馃搵 parametrize
    e.preventDefault();
    var item = document.getElementById("selectReport").value;
    setActualReport(item);
    if (item === "1") {
      let date = [["Nombre de la columna del pais", "countryColumn"], ["Nombre de la columna de infectados", "infectedColumn"], ["Ingrese el nombre de la columna de los dias", "daysColumn"], ["Nombre del pais a evaluar", "country"]];
      setParametersReport([...parametersReport, ...date]);
    }
- ### Descripci贸n: 
  En este metodo se establecen los parametros que se solicitar谩n al usuario para crear cada reporte, este utiliza un hook de react para saber que reporte se utilizar谩.

## 馃搵 generateReport
    e.preventDefault();
    var conc = "";
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
- ### Descripci贸n: 
  Este m茅todo env铆a al backend la solicitud y la informaci贸n necesaria para crear cada uno de los reportes dependiendo el que se est茅 solicitando.

## 馃搵 handleDownload
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
- ### Descripci贸n: 
  Este m茅todo crea un pdf con el contenido de un div, para la creaci贸n del reporte como pdf se imprime este en un archivo.

#### Backend
### Descripci贸n: 
Para la creaci贸n del API se hace uso de flask, una librer铆a de python encargada de la creaci贸n de servidores con la que se trabaja con el lenguaje python.

### Variables globales utilizadas en python

| Nombre:                     | Descripci贸n     |
| --------------------------- | --------- |
| actualFile   | Almacena el archivo a analizar que se cargo en el sistema |

## 馃搵 getImageEncode
    def getImageEncode(svg):
        encoded = base64.b64encode(svg).decode("ascii")
        return encoded
- ### Descripci贸n: 
  Para la representaci贸n de imagenes, se utiliza un m茅todo en el cual se codifica la imagen en base64, de esta manera se facilita el paso de esta a trav茅z de una respuesta del  backend al frontend.