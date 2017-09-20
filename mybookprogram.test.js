const mybookprogram = require('./mybookprogram');

const data = {
   "bk101": {
      "description": "Cat in a tree.",
      "title": "The Cat",
   },
   "bk102": {
      "description": "Fox in a car.",
      "title": "The Fox",
   },
   "bk103": {
      "description": "Bug in a car.",
      "title": "The Bug",
   }
}

const testCache = mybookprogram.buildCache(data);

describe('formatWordList', () => {
   it('should make all letters lower case', () => {
      expect(mybookprogram.formatWordList('  BOok')).toEqual(['book']);
      expect(mybookprogram.formatWordList('book  THE')).toEqual(['book', 'the']);
   });

   it('should remove whitespaces from strings', () => {
      expect(mybookprogram.formatWordList('  book')).toEqual(['book']);
      expect(mybookprogram.formatWordList('book  ')).toEqual(['book']);
      expect(mybookprogram.formatWordList('book')).toEqual(['book']);
   });

   it('should remove special characters from strings', () => {
      expect(mybookprogram.formatWordList('book.')).toEqual(['book']);
      expect(mybookprogram.formatWordList('b$%ook')).toEqual(['book']);
      expect(mybookprogram.formatWordList('@book')).toEqual(['book']);
   });

   it('should split strings up into words by whitespace', () => {
      expect(mybookprogram.formatWordList('book the')).toEqual(['book', 'the']);
      expect(mybookprogram.formatWordList('the b$%ook')).toEqual(['the', 'book']);
   });
});

describe('buildCache', () => {
   it('should store every word it finds in each title and description as a key in the cache', () => {
      expect([...testCache.keys()]).toEqual([ 'the', 'cat', 'in', 'a', 'tree', 'fox', 'car', 'bug' ]);
   });

   it('should have a set with a list of IDs for each word', () => {
      expect([...testCache.get('car')]).toEqual(['bk102', 'bk103']);
      expect([...testCache.get('cat')]).toEqual(['bk101']);
   });
});

describe('booksThatContain', () => {
   it('should return a list of objects that have the word', () => {
      expect(mybookprogram.booksThatContain(['car'], testCache, data)).toEqual([{ id: 'bk102', title: 'The Fox' }, { id: 'bk103', title: 'The Bug' }]);
      expect(mybookprogram.booksThatContain(['the'], testCache, data)).toEqual([{ id: 'bk101', title: 'The Cat' }, { id: 'bk102', title: 'The Fox' }, { id: 'bk103', title: 'The Bug' }]);
      expect(mybookprogram.booksThatContain(['foo'], testCache, data)).toEqual([]);
   });

   it('should return a list of objects for multiple words', () => {
      expect(mybookprogram.booksThatContain(['cat', 'fox'], testCache, data)).toEqual([{ id: 'bk101', title: 'The Cat' }, { id: 'bk102', title: 'The Fox' }]);
   });
});
