# Manual de usuario

_Proyecto de Organizaci贸n de lenguajes y Compiladores 2_

## Coronavirus Data Analysis With Machine Learning - Proyecto 2馃殌

| Nombre:                     | Carn茅     |
| --------------------------- | --------- |
| Josu茅 David Zea Herrera     | 201807159 |

_Durante la emergencia sanitaria provocada por el COVID-19, se ha observado un notable incremento en la aplicaci贸n de nuevas tecnolog铆as al campo de la salud y la investigaci贸n. Desde la creaci贸n de todo tipo de dispositivos inteligentes destinados a detectar el m谩s m铆nimo s铆ntoma indicativo de contagio, hasta el dise帽o de nuevos patrones de investigaci贸n en la cura del nuevo coronavirus._

_El flujo esencial de la aplicaci贸n es la carga de un archivo para obtener los datos, de esta manera se pueden crear diferetes reportes con el paso del tiempo o bien con diferentes datos._

#### Flujo de la aplicaci贸n 馃殌
![This is a alt text.](./img/Flux.png)

### Herramientas Utilizadas 馃搵

- React.
- Flask.
- Pandas.
- sklearn.
- Windows 10 Home: Sistema operativo
- GitHub - GithubPage: Para el control de versiones y para publicar la pagina del frontend estatica con GithubPage.
- Heroku: Para el control de versiones y para publicar la API.
- html2canvas: Creaci贸n de un archivo pdf con el contenido establecido.
  
![This is a alt text.](./img/General.png)


### 馃搵 Detalle del Flujo de la aplicaci贸n
- 1. Seleccionar un archivo, se cargar谩 al sistema un archivo con las extensiones permitidas, csv, json, xls y xlsx.
- 2. Se selecciona el reporte que se va a generar y se procede a parametrizar.
- 3. Se eligen los parametros con los que se va a trabajar.
- 4. Se procede a hacer la solicitud de creaci贸n del reporte.
- 5 (opcional). Se podr谩 descargar el reporte en un formato de tipo pdf para guardarlo.

# 馃搵 Detalle de funcionalidad

#### Parametrizaci贸n
![This is a alt text.](./img/Parametrice.png)
#### Creaci贸n de imagen y concluci贸n
![This is a alt text.](./img/Graphic.png)

#### Tipos de archivos permitidos

| Tipo:                     | 
| --------------------------- |
| csv   |
| json     |
| xls     |
| xlsx     |
