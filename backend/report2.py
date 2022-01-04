import io
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn import preprocessing
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression

def getReport2(file, fileType, countryColumn, infectedColumn, daysColumn, countryName, timePredict):
  df = ""
  if fileType == "csv":
    df = pd.read_csv(file)
  elif fileType == "json":
    df = pd.read_json(file)
  else:
    df = pd.read_excel(file)
  values = df.loc[df[countryColumn]==countryName]
  values['date_ordinal'] = pd.to_datetime(values[daysColumn]).apply(lambda date: date.toordinal())
  le = preprocessing.LabelEncoder()
  x1_encoded = le.fit_transform(values[infectedColumn].to_numpy())
  x2_encoded = le.fit_transform(values[daysColumn].to_numpy())
  
  features  = list(zip(x1_encoded, x2_encoded))
  data = pd.DataFrame(features)
  
  Y = np.asarray(values[infectedColumn]).reshape(-1,1)
  X = np.asarray(values['date_ordinal']).reshape(-1,1)
  linear_regressor = LinearRegression()
  try:
      linear_regressor.fit(X, Y)
  except:
      X = np.asarray(x1_encoded).reshape(-1,1)
  linear_regressor.fit(X, Y)
  Y_pred = linear_regressor.predict(X)

  plt.scatter(X, Y)
  rmse = np.sqrt(mean_squared_error(Y, Y_pred))
  r2 = r2_score(Y, Y_pred)
  title = ' RMSE = {}; R2 = {}'.format(round(rmse,2), round(r2,2))
  plt.title('Predicción de Infectados en '+countryName+' para la fecha '+timePredict+' \n ' + title, fontsize=10)
  plt.xlabel('Dias')
  plt.ylabel('Infectados')
  plt.plot(X, Y_pred, color='blue')
  buf = io.BytesIO()
  plt.savefig(buf, format='png')
  #######################Final values###################################
  variable = pd.to_datetime(timePredict, dayfirst = True).toordinal()
  predict = linear_regressor.predict([[variable]])
  finalValue = [buf.getvalue(), rmse, r2, predict]
  return finalValue