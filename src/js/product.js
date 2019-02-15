const Flickity = require('flickity')

const findProducts = () => {
  return {
    main: [...document.querySelectorAll('.carousel-main')]
  }
}

const initProducts = () => {
  const data = findProducts()

  data.main.forEach((carousel, index) => {
    const flktyMain = new Flickity(carousel, {
      lazyLoad: 1
    })
  })
}

export default initProducts
