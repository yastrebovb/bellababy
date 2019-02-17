import '../scss/main.scss'

import mobileMenu from './menu'
import initCarousels from './carousel'

import smoothscroll from 'smoothscroll-polyfill'

mobileMenu()
initCarousels()

smoothscroll.polyfill()
