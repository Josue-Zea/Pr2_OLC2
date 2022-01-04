# Manual técnico

_Proyecto de Organización de lenguajes y Compiladores 2_

## Coronavirus Data Analysis With Machine Learning - Proyecto 2🚀

| Nombre:                     | Carné     |
| --------------------------- | --------- |
| Josué David Zea Herrera     | 201807159 |

#### Frontend
### Descripción: 
Para la creación de la interfaz web se utilizó el framework REACT y sus ventajas para una mejor representación de la aplicación al usuario.

### Hooks utilizados en react

| Nombre:                     | Descripción     |
| --------------------------- | --------- |
| parametersReport   | Para almacenar los parametros que se usan por reporte |
| actualReport     | Identificador para saber que reporte se está solicitando |
| fileType     | Almacena la extensión del archivo cargado en el sistema |
| image     | Almacena la codificación en base64 de la imagen a representar |
| conclusion     | Almacena la conclusión a mostrar por reporte |

## Frontend
#### Metodos principales
## 📋 readFile
    const data = e.target.files[0];
    if (!data) return;
    guardo archivo";
    setFileType(type);
    let form = new FormData();
    form.append('myFile', data);
- ### Descripción: 
  Metodo encargado de recibir el archivo que se cargue al sistema, al recibirlo lo envía al backend para que se guarde en la memoria del mismo.

## 📋 loadFile
    const result = await fetch(`${API}/loadFile`, {
      method: "POST",
      body: archivo
    });
    const data = await result.json();
    if(data === "Recived"){
      alert("Archivo cargado con éxito");
    }
- ### Descripción: 
  Metodo que se encarga de enviar al backend el archivo que se cargó en el frontend.

## 📋 parametrize
    e.preventDefault();
    var item = document.getElementById("selectReport").value;
    setActualReport(item);
    if (item === "1") {
      let date = [["Nombre de la columna del pais", "countryColumn"], ["Nombre de la columna de infectados", "infectedColumn"], ["Ingrese el nombre de la columna de los dias", "daysColumn"], ["Nombre del pais a evaluar", "country"]];
      setParametersReport([...parametersReport, ...date]);
    }
- ### Descripción: 
  En este metodo se establecen los parametros que se solicitarán al usuario para crear cada reporte, este utiliza un hook de react para saber que reporte se utilizará.

## 📋 generateReport
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
- ### Descripción: 
  Este método envía al backend la solicitud y la información necesaria para crear cada uno de los reportes dependiendo el que se esté solicitando.

## 📋 handleDownload
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
- ### Descripción: 
  Este método crea un pdf con el contenido de un div, para la creación del reporte como pdf se imprime este en un archivo.

#### Backend
### Descripción: 
Para la creación del API se hace uso de flask, una librería de python encargada de la creación de servidores con la que se trabaja con el lenguaje python.

### Variables globales utilizadas en python

| Nombre:                     | Descripción     |
| --------------------------- | --------- |
| actualFile   | Almacena el archivo a analizar que se cargo en el sistema |

## 📋 getImageEncode
    def getImageEncode(svg):
        encoded = base64.b64encode(svg).decode("ascii")
        return encoded
- ### Descripción: 
  Para la representación de imagenes, se utiliza un método en el cual se codifica la imagen en base64, de esta manera se facilita el paso de esta a travéz de una respuesta del  backend al frontend.