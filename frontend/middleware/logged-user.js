export default ({ store, redirect, req }) => {
  if (!store.getters['auth/loggedIn']) {
    return req ? redirect('/index', { next: req.url }) : redirect('/index')
  }
}
