/**
 *
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

var num = 0

app.use(session({
  secret: 'blablabla', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

const users = [{
  username: 'Admin',
  password: 'changethispassword',
  email: 'admin@test.com'
}]

const articles = [{
  title: 'Maladie',
  person: 'Admin',
  date: '2019/10/22',
  status: 'overdue',
  content: 'Les ravages de la peste',
  id: 0
}]

app.get('/api/article', (req, res) => {
  res.json(articles)
})

app.post('/api/article', (req, res) => {
  console.log(num)
  num = num + 1
  articles.push({
    title: req.body.title,
    person: req.body.person,
    date: req.body.date,
    status: req.body.status,
    content: req.body.content,
    id: num
  })
  res.json({
    title: req.body.title,
    person: req.body.person,
    date: req.body.date,
    status: req.body.status,
    content: req.body.content,
    id: num
  })
})

app.post('/api/suprarticle', (req, res) => {
  console.log(req.body.ID)
  articles.splice(req.body.ID - 1, 1)
  res.json({
    message: 'article supprimé'
  })
})

app.post('/api/addElement', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  const user = users.find(u => u.username === req.body.username || u.email === req.body.email)
  if (!user) {
    // gérez le cas il n'y a pas d'utilisateur correspondant et donc on ajoute un
    users.push({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    // res.status(401)
    res.json({
      message: 'Utilisateur ajouté'
    })
  } else {
    // Erreur, utilisateur ou mot de passe deja pris
    res.status(401)
    res.json({
      message: 'Le nom ou le mot de passe existe déjà'
    })
  }
})

app.post('/api/login', (req, res, next) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)

  if (!req.session.userId) {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)
    if (!user) {
      // gérez le cas où on n'a pas trouvé d'utilisateur correspondant
      res.status(401)
      res.json({
        message: 'error'
      })
    } else {
      if (req.session.userId !== 1000 && req.body.userID !== 1000) {
        // connect the user
        req.session.userId = 1000 // connect the user, and change the id
        res.json({
          username: req.body.username,
          email: user.email
        })
        console.log(this.articles)
      } else {
        res.status(401)
        res.json({
          message: 'Vous êtes déjà connecté'
        })
      }
    }
  } else {
    res.json({
      message: 'Vous êtes déjà connecté'
    })
  }
})

app.get('/api/logout', (req, res) => {
  if (!req.session.userId) {
    res.status(401)
    res.json({
      message: 'Vous êtes déjà déconnecté'
    })
  } else {
    req.session.userId = 0
    res.json({
      message: 'Vous êtes déjà déconnecté'
    })
  }
})

app.get('/api/admin', (req, res) => {
  if (!req.session.userId || req.session.isAdmin === false) {
    res.status(401)
    res.json({ message: 'Non autorisé' })
    return
  }

  res.json({
    message: 'Félicitation, vous êtes connecté'
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
