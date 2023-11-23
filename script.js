document.addEventListener("DOMContentLoaded", function () {
// Set default values for p, q, and e
document.getElementById("p").value = "3557";
document.getElementById("q").value = "2579";
document.getElementById("e").value = "3";

// Generate keys with default values
generateKeys();

document.getElementById("generateKey").addEventListener("click", function () {
  generateKeys();
});

    document.getElementById("generateKey").addEventListener("click", function () {
      var p = parseInt(document.getElementById("p").value);
      var q = parseInt(document.getElementById("q").value);
      var e = parseInt(document.getElementById("e").value);
  
      var keys = generateKeys(p, q, e);
  
      document.getElementById("publicKey").textContent = `(${keys.n}, ${keys.e})`;
      document.getElementById("privateKey").textContent = `(${keys.n}, ${keys.d})`;
    });
  
    document.getElementById("sign").addEventListener("click", function () {
      var message = document.getElementById("messageToSign").value;
      var privateKey = parseKey(document.getElementById("privateKey").textContent);
      var signature = sign(message, privateKey.n, privateKey.e);
  
      document.getElementById("signatureValue").textContent = signature;
    });
  
    document.getElementById("verify").addEventListener("click", function () {
      var message = document.getElementById("messageToVerify").value;
      var receivedSignature = document.getElementById("receivedSignature").value;
      var publicKey = parseKey(document.getElementById("publicKey").textContent);
      var isVerified = verify(message, receivedSignature, publicKey.n, publicKey.e);
  
      document.getElementById("verificationResult").textContent = isVerified ? "Valid" : "Invalid";
    });
  
    function parseKey(keyString) {
      var keyValues = keyString.match(/\d+/g);
      return {
        n: parseInt(keyValues[0]),
        e: parseInt(keyValues[1])
      };
    }
  
    function generateKeys(p, q, e) {
      var n = p * q;
      var phi = (p - 1) * (q - 1);
      var d = modInverse(e, phi);
  
      return {
        n: n,
        e: e,
        d: d
      };
    }
  
    function modInverse(a, m) {
      for (var x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
          return x;
        }
      }
      return null;
    }
  
    function sign(message, n, d) {
      var hash = hashFunction(message); // Assume you have a hash function
      return numberCalculation(hash, n, d);
    }
  
    function verify(message, signature, n, e) {
      var hash = hashFunction(message);
      var decryptedSignature = numberCalculation(signature, n, e);
      return hash === decryptedSignature;
    }
  
    function numberCalculation(m, n, exp) {
      var result = 1;
      for (var i = 0; i < exp; i++) {
        result = (result * m) % n;
      }
      return result;
    }
  
    function hashFunction(message) {
      // Implement your hash function (e.g., convert message to ASCII and sum the values)
      var hash = 0;
      for (var i = 0; i < message.length; i++) {
        hash += message.charCodeAt(i);
      }
      return hash;
    }
  });
  