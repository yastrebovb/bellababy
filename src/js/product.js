const getImgsLength = data => {
  const imgesData = {
    'baby-chair': {
      blue: 3,
      grey: 4,
      orange: 2
    },
    'baby-seat': {
      black: 6,
      blue: 7,
      brown: 7,
      grey: 5,
      red: 8
    }
  }

  const { product, color } = data

  return imgesData[product][color]
}

const updateProductData = (productData, productObj) => {
  const { product, color, imgsLength } = productData

  let count = productObj.innerElements.length

  const pagination = document
    .querySelector(`.product--${product}`)
    .querySelector('.siema__pagination')

  if (count > 0) {
    for (let i = count - 1; i >= 0; i--) {
      productObj.remove(i)
    }
  }

  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild)
  }

  for (let i = 1; i <= imgsLength; i++) {
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')

    imgDiv.classList.add('siema__cell')
    img.setAttribute('src', `./public/products/${product}/${color}/${i}.jpg`)
    img.setAttribute('alt', '')

    imgDiv.appendChild(img)

    productObj.insert(imgDiv, i)
  }

  productObj.addPagination()
  productObj.goTo(0)
}

const setColorListeners = (productName, product) => {
  document
    .querySelectorAll(`.product--${productName} .product__colors`)
    .forEach(colorsList => {
      colorsList.addEventListener('click', e => {
        const productDataUpdated = {
          product: e.target.parentNode.classList[1],
          color: e.target.classList[1].match(/--(.*)/)[1]
        }

        e.target.parentNode.childNodes.forEach(el => {
          if (el.classList.contains('product__color--active')) {
            el.classList.remove('product__color--active')
          }
        })

        e.target.classList.add('product__color--active')

        productDataUpdated.imgsLength = getImgsLength(productDataUpdated)

        updateProductData(productDataUpdated, product)
      })
    })
}

export default setColorListeners
