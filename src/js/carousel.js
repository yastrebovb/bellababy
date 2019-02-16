import Siema from 'siema'
import setColorListeners from './product'

Siema.prototype.addArrows = function() {
  const arrowsDiv = document.createElement('div')
  const prevArrow = document.createElement('button')
  const nextArrow = document.createElement('button')

  arrowsDiv.classList.add('siema__btns')

  prevArrow.classList.add('siema__btn', 'siema__btn--prev')
  prevArrow.textContent = '<'
  prevArrow.addEventListener('click', () => this.prev())

  nextArrow.classList.add('siema__btn', 'siema__btn--next')
  nextArrow.textContent = '>'
  nextArrow.addEventListener('click', () => this.next())

  arrowsDiv.appendChild(prevArrow)
  arrowsDiv.appendChild(nextArrow)

  this.selector.parentNode.insertBefore(arrowsDiv, this.selector.nextSibling)
}

Siema.prototype.addPagination = function() {
  const navDiv = document.createElement('div')
  navDiv.classList.add('siema__pagination')

  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement('button')

    i === 0
      ? btn.classList.add(
          'siema__pagination__item',
          'siema__pagination__item--active'
        )
      : btn.classList.add('siema__pagination__item')

    btn.addEventListener('click', () => this.goTo(i))
    navDiv.appendChild(btn)
  }

  this.selector.parentNode.insertBefore(navDiv, this.selector.nextSibling)
}

Siema.prototype.updatePagination = function() {
  const productName = this.config.productName
  const currImg = this.currentSlide

  const paginationItems = document
    .querySelector(`.product--${productName}`)
    .querySelectorAll('.siema__pagination__item')

  paginationItems.forEach((item, i) => {
    currImg === i
      ? item.classList.add('siema__pagination__item--active')
      : item.classList.remove('siema__pagination__item--active')
  })
}

const siemas = document.querySelectorAll('.siema')

const initCarousels = () => {
  for (const siema of siemas) {
    const productName = siema.classList[1].slice(7)

    const instance = new Siema({
      selector: siema,
      draggable: true,
      productName: productName,
      onChange: function() {
        this.updatePagination()
      }
    })

    instance.addPagination()
    instance.addArrows()

    setColorListeners(productName, instance)
  }
}

export default initCarousels
