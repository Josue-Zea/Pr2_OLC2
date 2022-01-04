from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS
from methods import *
from report1 import *
from report2 import *
from report3 import *
from report4 import *
from report5 import *
from report6 import *
from report8 import *
from report9 import *
from report15 import *

app = Flask(__name__)
actualFile = ""

CORS(app)

@app.route("/")
def index():
  return jsonify("Hola")

@app.route("/loadFile", methods=["POST"])
def loadFile():
  global actualFile
  actualFile = request.files['myFile']
  actualFile = actualFile.read()
  return jsonify("Recived")

@app.route("/report1", methods=["POST"])
def report1():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  infectedColumn = request.json["infectedColumn"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  var = getReport1(actualFile, fileType, countryColumn, infectedColumn, daysColumn, countryName)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2])})

@app.route("/report2", methods=["POST"])
def report2():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  infectedColumn = request.json["infectedColumn"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  timePredict = request.json["timePredict"]
  var = getReport2(actualFile, fileType, countryColumn, infectedColumn, daysColumn, countryName, timePredict)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2]), "predict":str(var[3])})

@app.route("/report3", methods=["POST"])
def report3():
  global actualFile
  fileType = request.json["fileType"]
  infectedColumn = request.json["infectedColumn"]
  daysColumn = request.json["daysColumn"]
  var = getReport3(actualFile, fileType, infectedColumn, daysColumn)
  return jsonify({"image":str(getImageEncode(var[0])), "indice":var[1]})

@app.route("/report4", methods=["POST"])
def report4():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  deads = request.json["deads"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  department = request.json["department"]
  departmentColumn = request.json["departmentColumn"]
  timePredict = request.json["timePredict"]
  var = getReport4(actualFile, fileType, countryColumn, departmentColumn, deads, daysColumn, countryName, department, timePredict)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2]), "predict":str(var[3])})

@app.route("/report5", methods=["POST"])
def report5():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  deads = request.json["deads"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  timePredict = request.json["timePredict"]
  var = getReport5(actualFile, fileType, countryColumn, deads, daysColumn, countryName, timePredict)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2]), "predict":str(var[3])})

@app.route("/report6", methods=["POST"])
def report6():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  deads = request.json["deads"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  var = getReport6(actualFile, fileType, countryColumn, deads, daysColumn, countryName)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2])})

@app.route("/report8", methods=["POST"])
def report8():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  infectedColumn = request.json["infectedColumn"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  var = getReport8(actualFile, fileType, countryColumn, infectedColumn, daysColumn, countryName)
  return jsonify({"image":str(getImageEncode(var[0]))})

@app.route("/report9", methods=["POST"])
def report9():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  vaccineds = request.json["vaccineds"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  var = getReport9(actualFile, fileType, countryColumn, vaccineds, daysColumn, countryName)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2])})

@app.route("/report10", methods=["POST"])
def report10():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  vaccineds = request.json["vaccineds"]
  daysColumn = request.json["daysColumn"]
  countryNameA = request.json["countryNameA"]
  countryNameB = request.json["countryNameB"]
  var = getReport9(actualFile, fileType, countryColumn, vaccineds, daysColumn, countryNameA)
  varB = getReport9(actualFile, fileType, countryColumn, vaccineds, daysColumn, countryNameB)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2]), "image2":str(getImageEncode(varB[0]))})

@app.route("/report15", methods=["POST"])
def report15():
  global actualFile
  fileType = request.json["fileType"]
  countryColumn = request.json["countryColumn"]
  confirmeds = request.json["confirmeds"]
  daysColumn = request.json["daysColumn"]
  countryName = request.json["countryName"]
  department = request.json["department"]
  departmentColumn = request.json["departmentColumn"]
  var = getReport15(actualFile, fileType, countryColumn, departmentColumn, confirmeds, daysColumn, countryName, department)
  return jsonify({"image":str(getImageEncode(var[0])), "rme":str(var[1]), "r2":str(var[2])})

if __name__ == "__main__":
  app.run(port = 5000, debug=True)