
//////////////////////////////////////////////////////////////////////
////////////////////Exmo подключение 
function Exmo(command, param, method) {
  var key = "api key"
  var secret = "api secret"
  var nonce = new Date().getTime();
  var nonceG = nonce + nonce;
  var cb = "nonce=" + nonce;
  Logger.log(method)
  Logger.log(param)
  Logger.log(command)
  Logger.log(cb)


  if (method == 1) {
    var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, cb, secret);
    var stringSignature = signature.map(function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    var headers = {
      "Key": key,
      "Sign": stringSignature
    };
    var options = {
      "method": "post",
      "headers": headers,
      "payload": cb,
    };
    var response = UrlFetchApp.fetch("https://api.exmo.com/v1/" + command, options);
  }
  else if (method == 2) {
    var cb = "nonce=" + nonce
    var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, cb + param, secret);
    var stringSignature = signature.map(function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
    var headers = {
      "Key": key,
      "Sign": stringSignature
    };
    var options = {
      "method": "post",
      "headers": headers,
      "payload": cb + param
    };
    var response = UrlFetchApp.fetch("https://api.exmo.com/v1/" + command, options);

  }
  Logger.log(data)
  var data = JSON.parse(response.getContentText());
  return data;
}
