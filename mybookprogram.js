const bookData = require('./bookdata.json');

function formatWordList(string) {
   return string.split(' ')
   .map((word) => word.trim().replace(/[^a-zA-Z ]/g, "").toLowerCase())
   .filter((word) => word !== '');
}

function buildCache(data) {
   let bookCache = new Map();
   for (let bookID in data) {
      let titleWords = formatWordList(data[bookID].title);
      let descriptionWords = formatWordList(data[bookID].description);
      for(word of titleWords.concat(descriptionWords)) {
         if(bookCache.has(word)) {
            bookCache.get(word).add(bookID);
         } else {
            bookCache.set(word, new Set([bookID]));
         }
      }
   }
   return bookCache;
}

function booksThatContain(words, cache, data = bookData) {
   let ids = new Set();
   for (let word of words) {
      if (cache.has(word)){
         for(let id of cache.get(word)) {
            ids.add(id)
         }
      }
   }
   return [...ids].map((id) => {
      return { id: id, title: data[id].title }
   });
}

function display(books) {
   console.log(`ID:     Title:`);
   for (let book of books) {
      console.log(`${book.id}   ${book.title}`);
   }
}

const bookCache = buildCache(bookData);
const searchResults = booksThatContain(process.argv.slice(2), bookCache);
display(searchResults);

module.exports = { formatWordList, buildCache, booksThatContain, display };
