// "Decrypt" e-mail links
// Copyright (c) 2016 Christopher Harrison
// MIT License
(function(root) {
  var crypto = root.document.getElementById('encrypted-mail'),
      payload = crypto.dataset.payload.match(/.{2}/g),
      key = crypto.dataset.key, l = key.length;

  crypto.href = String.fromCharCode.apply(null, payload.map(function(e, i) {
    return parseInt(e, 16) ^ key[i % l].charCodeAt();
  }));
})(window);
