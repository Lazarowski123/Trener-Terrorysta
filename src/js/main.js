
const nav = document.querySelector('.nav')
const sideBarOpenBtn = document.querySelector('.nav__burger')
const sideBarClouseBtn = document.querySelector('.sidebar__btn')
const sidebar = document.querySelector('.sidebar')

const skills = document.querySelector('.about-me__skills')
const skillsBtns = document.querySelectorAll('.about-me__skills__btn')


const gallery = document.querySelector('.gallery')
const galleryItem = document.querySelectorAll('.gallery__list__item img')
const galleryPopup = document.querySelector('.gallery__popup')
const galleryPopupImg = document.querySelector('.gallery__popup__img')
const arrowLeft = document.querySelector('.gallery__popup__arrow-left')
const arrowRight = document.querySelector('.gallery__popup__arrow-right')
let currentImgIndex;

const footerYear = document.querySelector('.footer__year')

const offersOptions = document.querySelectorAll('.offers__option')



// sidebar
const sideBarOpen = () => {
    sidebar.classList.add('sidebar--active')
}
const sideBarClouse = () => {
    sidebar.classList.remove('sidebar--active')
}
const chceckBtns = (e) => {
    if (e.target.classList.value === 'sidebar__btn' || 'sidebar__item') {
        sideBarClouse()
    }
}



// scrollspy nav shadow
const scrollSpyNavbar = () => {
    if (window.scrollY !== 0) {
        nav.classList.remove('hidden')
        nav.classList.add('shadow')
    } else {
        nav.classList.remove('shadow')
        nav.classList.add('hidden')
    }
}

// Intersection Observer offers

const options = {
    rootMargin: '0px 0px -300px 0px',
    threshold: 0
}

const animation = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
        }
    })
}

const observer = new IntersectionObserver(animation, options)
offersOptions.forEach(option => {
    observer.observe(option)
})




// about-me acordion

function showSkill() {
    if (this.nextElementSibling.classList.contains('about-me--active')) {
        this.nextElementSibling.classList.remove('about-me--active')
    } else {
        clouseSkills()
        this.nextElementSibling.classList.toggle('about-me--active')
    }
}
const clouseSkills = () => {
    const allActiveSkills = document.querySelectorAll('.about-me__skills__text')
    allActiveSkills.forEach(skill => skill.classList.remove('about-me--active'))
}
const clickOutsideSkills = (e) => {
    if (e.target.classList.contains('about-me__skills__btn') ||
        e.target.classList.contains('about-me__skills__text')
    ) { return }
    clouseSkills()
}





// GALLERY

const clousePopup = () => {
    galleryPopup.classList.remove('gallery__popup--show')
    galleryItem.forEach((el) => {
        el.setAttribute('tabindex', 0)
    })
}


galleryItem.forEach((item, index) => {
    const showPopup = (e) => {
        galleryPopup.classList.add('gallery__popup--show')
        galleryPopupImg.src = e.target.src
        currentImgIndex = index
        galleryItem.forEach((el) => {
            el.setAttribute('tabindex', -1)
        })
    }
    item.addEventListener('click', showPopup)
    item.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.keyCode === 13) {
            showPopup(e)
        }
    })
})

const nextImage = () => {
    if (currentImgIndex === galleryItem.length - 1) {
        currentImgIndex = 0
    } else {
        currentImgIndex++
    }
    galleryPopupImg.src = galleryItem[currentImgIndex].src
}
const previousImage = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = galleryItem.length - 1
    } else {
        currentImgIndex--
    }
    galleryPopupImg.src = galleryItem[currentImgIndex].src
}

gallery.addEventListener('click', (e) => {
    if (e.target.classList.value === 'gallery__popup gallery__popup--show' || e.target.classList.value === 'gallery__popup__btn' || e.target.classList.value === 'fa-solid fa-x') {
        clousePopup()
    }
})
arrowRight.addEventListener('click', nextImage)
arrowLeft.addEventListener('click', previousImage)


document.addEventListener('keydown', (e) => {
    if (galleryPopup.classList.contains('gallery__popup--show')) {
        if (e.code === "ArrowRight" || e.keyCode === 39) {
            nextImage()
        } else if ((e.code === "ArrowLeft" || e.keyCode === 37)) {
            previousImage()
        } else if (e.code === 'Escape' || e.keyCode === 27) {
            clousePopup()
        }
    }
})




// footer year
const currentYear = () => {
    const year = (new Date).getFullYear()
    footerYear.innerText = year
}
currentYear()


window.addEventListener('scroll', scrollSpyNavbar)

sideBarOpenBtn.addEventListener('click', sideBarOpen)
sidebar.addEventListener('click', chceckBtns)

skillsBtns.forEach(btn => btn.addEventListener('click', showSkill))
window.addEventListener('click', clickOutsideSkills)



