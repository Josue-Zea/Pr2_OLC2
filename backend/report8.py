import io
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn import preprocessing
from sklearn.metrics import  mean_squared_error, r2_score
import matplotlib.pyplot as plt
import numpy as np

def getReport8(file, fileType, countryColumn, infectedColumn, daysColumn, countryName):
  df = ""
  if fileType == ".csv":
    df = pd.read_csv(file)
    df = df.fillna(0)
  elif fileType == ".json":
    df = pd.read_json(file)
    df = df.replace(np.nan, "")
  else:
    df = pd.read_excel(file)
    df = df.fillna(0)
  le = preprocessing.LabelEncoder()
  df = df.loc[df[countryColumn]==countryName]
  X = le.fit_transform(df[infectedColumn].to_numpy())
  Y = le.fit_transform(df[daysColumn].to_numpy())
  
  X = np.asarray(X)
  Y = np.asarray(Y)

  X = X[:,np.newaxis]
  Y = Y[:,np.newaxis]

  plt.scatter(X,Y)
  grado = 4

  polynomial_features = PolynomialFeatures(degree = grado)

  X_TRANF = polynomial_features.fit_transform(X)

  model = LinearRegression()
  model.fit(X_TRANF, Y)

  Y_NEW = model.predict(X_TRANF)

  rmse = np.sqrt(mean_squared_error(Y,Y_NEW))
  r2 = r2_score(Y,Y_NEW)

  x_new_min = 0.0
  x_new_max = 365

  X_NEW = np.linspace(x_new_min,x_new_max,365)
  X_NEW = X_NEW[:,np.newaxis]

  X_NEW_TRANSF = polynomial_features.fit_transform(X_NEW)

  Y_NEW = model.predict(X_NEW_TRANSF)

  plt.plot(X_NEW,Y_NEW,color='red',linewidth=3)

  plt.grid()
  plt.xlim(x_new_min,x_new_max)
  plt.ylim(0,300)

  title = 'Grado = {}; RMSE = {}; R2 = {}'.format(grado,round(rmse,2),round(r2,2))

  plt.title("Predicción de casos de "+countryName+" para un año.\n"+title,fontsize=10)

  plt.xlabel('Número del día')
  plt.ylabel('Número de infectados')

  buf = io.BytesIO()
  plt.savefig(buf, format='png')
  finalValue = [buf.getvalue()]
  return finalValue