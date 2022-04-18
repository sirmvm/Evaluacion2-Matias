class NotebooksDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, name_computer, mark FROM notebook')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, name_computer, mark FROM notebook WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (notebook) {
    const response = await this.db.query('INSERT INTO notebook (name_computer, mark) VALUES (?, ?)', [notebook.name_computer, notebook.mark])
    const result = response[0]
    return result.insertId
  }

  async update (notebook) {
    const response = await this.db.query('UPDATE notebook SET name_computer = ?, mark = ? WHERE id = ?', [notebook.name_computer, notebook.mark, notebook.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM notebook WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = NotebooksDAO
