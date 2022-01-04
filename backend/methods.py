import base64

def getImageEncode(svg):
  encoded = base64.b64encode(svg).decode("ascii")
  return encoded