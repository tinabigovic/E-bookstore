var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

const books = [
  {
    id: 1,
    name: 'Čarobni breg',
    author: 'Tomas Man',
    price: 1200,
    description: 'opis',
    imageURL: 'https://www.delfi.rs/_img/artikli/2015/02/carobni_breg_-_knjiga_prva_vv.jpg',
    genre: 'biografije',
    user: 'mika',
    contact: 'mika@gmail.com'
  },
  {
    id: 2,
    name: 'Na Drini ćuprija',
    author: 'Ivo Andrić',
    price: 900,
    description: 'opis2',
    imageURL: 'https://www.delfi.rs/_img/artikli/2016/04/na_drini_cuprija_vv.jpg',
    genre: 'romani',
    user: 'mika',
    contact: 'mika@gmail.com'
  },
  {
    id: 3,
    name: 'Stepski vuk',
    author: 'Herman Hese',
    price: 890,
    description: 'opis',
    imageURL: 'https://novaknjiga.com/product-images/79173/310_1.jpg',
    genre: 'romani',
    user: 'mika',
    contact: 'mika@gmail.com'
  },
  {
    id: 4,
    name: 'Jadnici',
    author: 'Viktor Igo',
    price: 1000,
    description: 'opis2',
    imageURL: 'https://s.cdnmpro.com/129900401/p/l/9/jadnici-viktor-igo~443999.jpg',
    genre: 'romani',
    user: 'mika',
    contact: 'mika@gmail.com'

  }
];

var checkIfLoggedIn = (req, res, next) => {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({ msg: 'Please login to access this information' });
};

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundbooks = books.filter(
      (book) => book.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundbooks);
  }
  return res.status(200).json(books);
});

// router.get('/:name', (req, res) => {
//   let bookName = req.params.name;
//   const foundbook = books.find((book) => book.name == bookName);
//   if (foundbook) {
//     res.json(foundbook);
//   } else {
//     return res.status(400).json({ msg: 'book with name ' + bookName + ' not found.' })
//   }
// });

router.get('/:user', (req, res) => {
  let bookUser = req.params.user;
  const foundBooks = books.filter(
    (book) => book.user.toLowerCase() == bookUser);
  if (foundBooks) {
    res.json(foundBooks);
  } else {
    return res.status(200).json({ msg: 'book posted by ' + bookUser + ' not found.' });
  }
});

router.get('/genreS/:genre', (req, res) => {
  let bookGenre = req.params.genre;
  const foundBooks = books.filter(
    (book) => book.genre.toLowerCase() == bookGenre);
  if (foundBooks) {
    res.json(foundBooks);
  } else {
    return res.status(200).json({ msg: 'book with genre ' + bookGenre + ' is not found.' });
  }
});

router.post('/', checkIfLoggedIn, (req, res) => {

  let newbook = req.body;
  const foundbook = books.find((book) => book.name == newbook.name);

  if (foundbook) {
    return res.status(400)
      .json({ msg: 'book seems to already have an id assigned' });
  }

  newbook.id = books.length + 1;
  // book.rating = 0;
  books.push(newbook);
  return res.status(200).json(newbook);
});

// router.patch('/:name', checkIfLoggedIn, (req, res) => {
//   let bookName = req.params.name;
//   const foundbook = books.find((book) => book.name == bookName);
//   if (foundbook) {
//     let changeInQuantity = req.body.changeInQuantity;
//     foundbook.rating += changeInQuantity;
//     return res.status(200).json({ msg: 'Successfully updated rating' });
//   }
//   return res.status(400).json({ msg: 'book with name ' + bookName + ' not found.' });
// });

router.patch('/:id', checkIfLoggedIn, (req, res) => {
  console.log("usao u js")
  let bookId = req.params.id;
  const foundbook = books.find((book) => book.id == bookId);
  if (foundbook) {
    let changeName = req.body.changeName;
    if (changeName != "") {
      foundbook.name = changeName;
    }

    let changeAuthor = req.body.changeAuthor;
    if (changeAuthor != "") {
      foundbook.author = changeAuthor;
    }

    let changePrice = req.body.changePrice;
    if (changePrice != "") {
      foundbook.price = changePrice;
    }

    let changeDescription = req.body.changeDescription;
    if (changeDescription != "") {
      foundbook.description = changeDescription;
    }

    let changeImageURL = req.body.changeImageURL;
    if (changeImageURL != "") {
      foundbook.imageURL = changeImageURL;
    }

    let changeGenre = req.body.changeGenre;
    if (changeGenre != "") {
      foundbook.genre = changeGenre;
    }

    let changeContact = req.body.changeContact;
    if (changeContact != "") {
      foundbook.contact = changeContact;
    }

    return res.status(200).json({ msg: 'Successfully updated book' });
  }
  return res.status(400).json({ msg: 'book with id ' + bookId + ' not found.' });
});

module.exports = router;