const mobileMenu = () => {
  document
    .querySelector('.header__nav--mobile')
    .addEventListener('click', e => {
      document
        .querySelector('.header__nav__content')
        .classList.toggle('header__nav__content--visible')

      console.log('sd')
    })
}

export default mobileMenu
