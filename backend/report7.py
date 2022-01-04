import io
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn import preprocessing
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression

def crearRegrecion(file, fileType, vaccinedColumn, infectedColumn, daysColumn, countryName):
  df = ""
  if fileType == "csv":
    df = pd.read_csv(file)
  elif fileType == "json":
    df = pd.read_json(file)
  else:
    df = pd.read_excel(file)
  df.dropna()
  x = np.asarray(df[df['dias']])[:, np.newaxis]
  y = np.asarray(df[df['infectados']])[:, np.newaxis]
  poly_degree = 3
  polynomial_features = PolynomialFeatures(degree=poly_degree)
  x_transform = polynomial_features.fit_transform(x)
  # fit the model
  model = LinearRegression().fit(x_transform, y)
  y_new = model.predict(x_transform)
  # calculate rmse and r2
  rmse = np.sqrt(mean_squared_error(y, y_new))
  r2 = r2_score(y, y_new)
  # prediction
  x_new_min = x.min()
  x_new_max = x.max()
  x_new = np.linspace(x_new_min, x_new_max)
  x_new = x_new[:, np.newaxis]
  x_new_transform = polynomial_features.fit_transform(x_new)
  y_new = model.predict(x_new_transform)
  # plot the prediction
  plt.plot(x_new, y_new, color='coral', linewidth=3)
  plt.grid()
  plt.xlim(x_new_min, x_new_max)
  title = 'Degree = {}; RMSE = {}; R2 = {}'.format(
      poly_degree, round(rmse, 2), round(r2, 2))
  plt.title(
      "Prediction of Infection of Covid-19 in Guatemala\n " + title, fontsize=10)
  plt.xlabel('x')
  plt.ylabel('y')
