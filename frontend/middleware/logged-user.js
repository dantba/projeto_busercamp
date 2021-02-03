export default ({ store, redirect, req }) => {
  if (!store.getters['auth/loggedIn']) {
    return req ? redirect('/', { next: req.url }) : redirect('/')
  }
}
