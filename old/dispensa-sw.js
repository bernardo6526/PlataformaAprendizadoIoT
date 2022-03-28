// Define o nome do cache atual, considerando a sua versão.
var cacheName = 'dispensa-v1.0';

// Armazena todos os arquivos no cache atual
self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/estilo.css',
      '/script.js',
      '/imagens/delete.png',
      '/imagens/edit.png',
      '/imagens/plus0.png',
      '/imagens/plus1.png',
      '/imagens/icones/cookiejarfavicon.ico',
      '/imagens/icones/cookiejar48.png',
      '/imagens/icones/cookiejar72.png',
      '/imagens/icones/cookiejar96.png',
      '/imagens/icones/cookiejar144.png',
      '/imagens/icones/cookiejar192.png',
      '/imagens/icones/cookiejar152.png',
      '/imagens/icones/cookiejar180.png',
    ]);
  });
});

// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Tenta servir o arquivo do cache atual. Se não for possível,
// baixa o recurso da web e o armazena localmente, antes de entregar
// uma cópia para o usuário.
self.addEventListener('fetch', function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;
      return fetch(event.request).then((recurso) => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});