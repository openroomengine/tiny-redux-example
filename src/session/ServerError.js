export default class ServerError extends Error {
  constructor (res) {
    super(res.statusText)

    this.name = 'ServerError'
    this.httpStatus = res.status
  }
}
