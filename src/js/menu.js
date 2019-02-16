const mobileMenu = () => {
  document.querySelector('.header__menu').addEventListener('click', e => {
    document
      .querySelector('.header__nav__content')
      .classList.toggle('header__nav__content--visible')
  })
}

export default mobileMenu
