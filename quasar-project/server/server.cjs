const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const db = mysql.createConnection({
  host: 'ucka.veleri.hr',
  user: 'ppilat',
  password: '11',
  database: 'ppilat'
});

db.connect(err => {
  if (err) {
    console.error('Greška pri spajanju:', err);
  } else {
    console.log('Povezano s MySQL bazom!');
  }
});

app.get('/knjige', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 50
  const offset = (page - 1) * pageSize

  db.query(
    'SELECT * FROM knjige LIMIT ? OFFSET ?',
    [pageSize, offset],
    (err, results) => {
      if (err) return res.status(500).send(err)
      res.json(results)
    }
  )
})

app.get('/nove-knjige', (req, res) => {
  db.query(
    'SELECT * FROM knjige ORDER BY id DESC LIMIT 5',
    (err, results) => {
      if (err) return res.status(500).send(err)
      res.json(results)
    }
  )
})

app.get('/pretraga', (req, res) => {
  const term = req.query.term || ''
  const byAutor = req.query.byAutor === 'true'  // checkbox vraća boolean
  const byNaslov = req.query.byNaslov === 'true'

  let query = 'SELECT *, dostupno FROM knjige WHERE 1=1'
  const params = []

  if (term) {
    const termLike = `%${term}%`
    if (byAutor && byNaslov) {
      query += ' AND (autor LIKE ? OR naslov LIKE ?)'
      params.push(termLike, termLike)
    } else if (byAutor) {
      query += ' AND autor LIKE ?'
      params.push(termLike)
    } else if (byNaslov) {
      query += ' AND naslov LIKE ?'
      params.push(termLike)
    }
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send(err)

    // mapiraj status iz tinyint -> Dostupno/Nedostupno
    const mapped = results.map(item => ({
      id: item.id,
      naslov: item.naslov,
      autor: item.autor,
      status: item.dostupno === 1 ? 'Dostupno' : 'Nedostupno'
    }))

    res.json(mapped)
  })
})

app.post('/knjige', upload.single('slika'), (req, res) => {
  const { naslov, autor, opis, dostupnost } = req.body
  const slika = req.file ? `/uploads/${req.file.filename}` : null
  const dostupnoInt = dostupnost === 'true' ? 1 : 0

  const sql = 'INSERT INTO knjige (naslov, autor, opis, dostupno, slika) VALUES (?, ?, ?, ?, ?)'
  db.query(sql, [naslov, autor, opis, dostupnoInt, slika], (err, result) => {
    if (err) return res.status(500).send(err)
    res.json({ message: 'Knjiga dodana!', id: result.insertId, slika })
  })
})

app.post('/registracija', async (req, res) => {
  const { ime, prezime, email, korisnicko_ime, lozinka } = req.body;

  if (!ime || !prezime || !email || !korisnicko_ime || !lozinka) {
    return res.status(400).json({ message: 'Svi podaci su obavezni.' });
  }


  const sql = `INSERT INTO korisnici (ime, prezime, email, korisnicko_ime, lozinka) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [ime, prezime, email, korisnicko_ime, lozinka], (err, result) => {
      if (err) {
        console.log('MYSQL ERROR:', err);
        return res.status(500).json({ message: 'Greška pri registraciji', error: err });
      }
        res.json({ message: 'Korisnik registriran!', id: result.insertId });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Korisničko ime i lozinka su obavezni.' });

  const sql = `SELECT * FROM korisnici WHERE korisnicko_ime = ? AND lozinka = ?`;
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Greška servera', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Pogrešno korisničko ime ili lozinka' });

    const user = results[0];
    res.json({ message: 'Uspješno prijavljen', user: { id: user.id, ime: user.ime, korisnicko_ime: user.korisnicko_ime } });
  });
});

app.listen(3000, () => console.log('Server radi na portu 3000'));