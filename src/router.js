const express = require('express')
const NotebooksController = require('./controllers/NotebooksController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const notebooksController = new NotebooksController(sqlClient)

// Routes
router.get('/', notebooksController.renderHomeWithNotebooks)

router.get('/notebooks/create', notebooksController.renderNotebookCreationForm)
router.post('/notebooks/create', notebooksController.insertAndRenderNotebook)

router.get('/notebooks/:id', notebooksController.renderSingleNotebook)

router.get('/notebooks/:id/update', notebooksController.renderNotebookUpdateForm)
router.post('/notebooks/:id/update', notebooksController.updateAndRenderNotebook)

router.post('/notebooks/:id/delete', notebooksController.deleteNotebookAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
