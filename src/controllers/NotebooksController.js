const NotebooksDAO = require('../models/dao/NotebooksDAO')

class NotebooksController {
  constructor (db) {
    this.notebooksDao = new NotebooksDAO(db)
    this.renderHomeWithNotebooks = this.renderHomeWithNotebooks.bind(this)
    this.renderSingleNotebook = this.renderSingleNotebook.bind(this)
    this.renderNotebookCreationForm = this.renderNotebookCreationForm.bind(this)
    this.renderNotebookUpdateForm = this.renderNotebookUpdateForm.bind(this)
    this.insertAndRenderNotebook = this.insertAndRenderNotebook.bind(this)
    this.updateAndRenderNotebook = this.updateAndRenderNotebook.bind(this)
    this.deleteNotebookAndRenderResponse = this.deleteNotebookAndRenderResponse.bind(this)
  }

  async renderHomeWithNotebooks (req, res) {
    const notebooks = await this.notebooksDao.getAll()
    res.render('home', {
      notebooks
    })
  }

  async renderSingleNotebook (req, res) {
    const id = req.params.id

    try {
      const notebook = await this.notebooksDao.getById(id)

      if (!notebook) {
        res.status(404).render('404')
        return
      }

      res.render('notebook', {
        id,
        name_computer: notebook.name_computer,
        mark: notebook.mark
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderNotebookCreationForm (req, res) {
    res.render('notebook-form')
  }

  async renderNotebookUpdateForm (req, res) {
    const id = req.params.id

    try {
      const notebook = await this.notebooksDao.getById(id)

      if (!notebook) {
        res.status(404).render('404')
        return
      }

      res.render('notebook-form', {
        id,
        name_computer: notebook.name_computer,
        mark: notebook.mark
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderNotebook (req, res) {
    const name_computer = req.body.name_computer
    const mark = req.body.mark

    const notebook = { name_computer, mark }

    try {
      const id = await this.notebooksDao.create(notebook)

      res.redirect(`/notebooks/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderNotebook (req, res) {
    const id = req.params.id
    const name_computer = req.body.name_computer
    const mark = req.body.mark

    try {
      const notebook = { name_computer, mark, id }

      await this.notebooksDao.update(notebook)

      res.redirect(`/notebooks/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteNotebookAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const notebook = await this.notebooksDao.getById(id)

      if (!notebook) {
        res.status(404).render('404')
        return
      }

      await this.notebooksDao.delete(id)

      res.render('notebook-deleted', {
        id,
        name_computer: notebook.name_computer
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = NotebooksController
