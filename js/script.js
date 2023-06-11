const switcher = document.querySelector('.switcher_input')
const wrapper = document.querySelector('.wrapper')
const headerBtn = document.querySelector('.header_btn')
const headerLiA = Array.from(document.querySelectorAll('.header_li_a'))
const slideImg1 = document.querySelector('.slideImg1')
const slideImg2 = document.querySelector('.slideImg2')
const slideImg3 = document.querySelector('.slideImg3')
const slideImg4 = document.querySelector('.slideImg4')
const sections = Array.from(document.querySelectorAll('section'))

const feedBackSliderCont = document.querySelector('.slider_feedback_container')
const pagDivArr = Array.from(document.querySelectorAll('.pagination'))

switcher.addEventListener('click', () => {
    wrapper.classList.toggle('active')
    headerBtn.classList.toggle('active')
    headerLiA.map((item,index,array) => item.classList.toggle('active'))
})


// начало кода для первого слайдера
const slider = document.querySelector('.slider_container')
const arrPhoto = [slideImg1,slideImg2,slideImg3,slideImg4];
let count = 0;

for(let i = 0; i < arrPhoto.length; i++){
    const sliderContainer = document.querySelector('.slider_container')
    slider.style.backgroundImage = `url(${arrPhoto[i]})`
    
}

const sidescroll = (countCard) => {
   const widthPict = slider.children[0].clientWidth 
   slider.scroll({top:0,left:widthPict* countCard,behavior:"smooth"})
}

setInterval(() => {
sidescroll(count)
count < arrPhoto.length - 1 ? count++ : count = 0
},3000)
// конец кода для первого слайдера

//начало кода для флипа карточек
const arrCard = Array.from(document.querySelectorAll('.session_card'))
arrCard.map((item,index,array) => item.addEventListener('click', (e) => {
item.classList.toggle('active_card')
setTimeout(() => {
    item.classList.toggle('active_card')
    item.querySelector('.flip1').classList.toggle('opacity')
    item.querySelector('.flip2').classList.toggle('opacity')
},170)
}))
//конец кода для флипа карточек

//код фидбека не доделал
const scrollFidBack = (index) => {
    const elemWidth = feedBackSliderCont.children[index].clientWidth + 80
    const elem = feedBackSliderCont.children[index]
    Array.from(feedBackSliderCont.children).map(item => item.classList.remove('scale'))
    feedBackSliderCont.children[index]
    feedBackSliderCont.scroll({
        top:0,
        left: (index) * elemWidth,
        behavior: 'smooth'
    })
    elem.classList.add('scale') 
}

pagDivArr.map((item, index) => item.addEventListener('click', () => {
    scrollFidBack(index)    
}))

scrollFidBack(1)
// код фидбека  доделал

//код рулетки

const cells = 31

const items = [
    {name: 'Spa' , img: './img/17301.jpg', chance: 10, description: 'одно бесплатное посещение Spa'},
    {name: 'massage' , img: './img/spa-dlya-nee-1.jpg', chance: 40, description: 'один бесплатный курс расслабляющего массажа'},
    {name: 'plavanie' , img: './img/plavanie.jpg', chance: 60, description: 'одно бесплатное посещение бассейна'},
    {name: 'diving' , img: '/img/GBR-potato-cod-site.jpg', chance: 80, description: 'одно бесплатное погружение с инструктором'},
]

function getItem(){
    let item;

    while(!item) {    //пока item пустой
        const chance = Math.floor(Math.random() * 100000) // пока item пустой - генерируй рандомное число (каждую итерацию)


        items.forEach(elem => { //переберает массив с объектами
                if(chance < elem.chance && !item) item = elem  //если рандомное число меньше чем шанс объекта и item пустой,то в item записывается объект
        })
    }
    return item
}

function generateItems() { //создает функцию для генерации itemов на странице
    document.querySelector('.list').remove() //сначала удалил
    document.querySelector('.scope').innerHTML = ` 
    <ul class = "list"></ul>
    `
    // потом опять добавил,чтобы запустить бесконечную работу функции

    const list = document.querySelector('.list')
    
    for(let i = 0; i < cells; i++){
        const item = getItem() //записывает в item нужный объект из функции getitem
        
        const li = document.createElement('li')
        li.classList.add('list_item') 
        li.classList.add(item.name)
        li.innerHTML = `
        <img src = "${item.img}" alt = "" /> 
        `
        // а затем создает элемент li,и добавляет туда картинку объекта с помощью innerhtml
        list.append(li) //и потом добавляет сам элемент списка внутрь листа
    }
}

generateItems()

function start() {
    

    generateItems() // вызывает функию 
    const list = document.querySelector('.list') // ищет по селлектору list
    const item = list.querySelectorAll(`li`)[15]
    setTimeout (() => {      //settimeout нужно чтобы как только функция запустилась,все отрендарилось,только после этого при клике на старт,нас перенасило на центр всех карточек (всего списка)
        list.style.left = '50%' // чтобы был скролл вправо до середины
        list.style.transform = 'translate3d(-50%, 0, 0)'
        setTimeout(() =>    rouletteSlidePopup(0,item), 5500) 
    }, 0)






//  list.addEventListener('transitioned' , () => {
//     setTimeout(() => {
//         rouletteSlidePopup
//      },0)
//     item.classList.add('active')
//     console.log(list.querySelectorAll('li').length);
//  })



}
//код рулетки закончен

//код попапа для рулетки



const rouletteSlidePopup = (countCard,item) => {    //countcard - наш счетчик(порядковый номер элемента) на который будет перелистываться слайд. item - это наша картинка . 
    if(item){     //Если item был передан в функцию,то выспроизводится код ниже
        let newObj //создали путую переменную для записи в нее объекта с картинкой и описанием
        items.map(obj => Array.from(item.classList).includes(obj.name) ? newObj = obj : obj) //перебираем наш массив с объектами,затем наши элементы преобразуем наш список классов item в массив,для поиска свойства(includes) объекта внутри этого массива. Если true записываем объект в новую пустую переменную ,а если false то ничего
 
        const roulettePopup = document.querySelector('.roulette_popup')
        const popDescr = document.querySelector('.roulette_popup_description')
        
        popupImg.src = newObj.img //в атрибуты записали значения ключей
        popDescr.innerHTML = newObj.description
        popupImg.classList.add('popup_img')
        roulettePopup.prepend(popupImg)
    }
    

    const rouletteSection = document.querySelector('.roulette_section')
    const hightPict = rouletteSection.children[0].clientHeight  
    rouletteSection.scroll({top:hightPict* countCard,left:0,behavior:"smooth"}) // эти строки отвечаю за то,чтобы наш попап скроллился вертикально(осуществлял вертикальный скролл)

 }
 

rouletteSlidePopup(1)  // вызов функции, а в скобках функии передается индекс элемента для скрола
const popupImg = document.createElement('img')
const btnPopup = document.querySelector('.btn_popup')
btnPopup.addEventListener('click', () => {
    rouletteSlidePopup(1)
})


// код попапа для рулетки закончен

//начало кода Анимация картинок Aboutritm

const containersAboutritm = document.querySelectorAll('.containers_aboutritm')

for(let i = 0; i < containersAboutritm.length; i++){
    const aboutritmElem = containersAboutritm[i]
    aboutritmElem.addEventListener('mousemove', rotate)
    aboutritmElem.addEventListener('mouseout', stoprotate)
}


function rotate (event){
    const cardItem =  this.querySelector('.img_aboutritm')
    const halfHeight = cardItem.offsetHeight / 2
    cardItem.style.transform = 'rotateX('+-(event.offsetY - halfHeight)/5+'deg) rotateY('+(event.offsetX - halfHeight) / 5 + 'deg)'
}

function stoprotate (event){
    const cardItem =  this.querySelector('.img_aboutritm')
    
    cardItem.style.transform = 'rotate(0)'
}

//конец кода анимация картинок Aboutritm

//код для input_date в modal window

const inputDate = document.querySelector('.date_input')

const date = new Date()
const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
const day = date.getDay() < 10 ? '0' + (date.getDay() + 1) : (date.getDay() + 1)
inputDate.value = date.getFullYear() + '-' + month + '-' + day
// конец кодa для input_date в modal window

//код для form (собираем данные с form)

const bookplaceBtn = document.querySelector('.bookplace')

bookplaceBtn.addEventListener('click', () => {
    
    const arrkey = ['name', 'surname', 'email', 'types of services', 'date']
    const form = document.forms['booking_data']
    const arrElements = Array.from(form.elements)
    arrElements.pop()
    const bool = inputPlace(arrElements)
    if(bool == 'true'){
        const arrObject = arrElements.map((item,index,array) => [arrkey[index],item.value])
        const object = Object.fromEntries(arrObject)
        console.log(object)
        const json = JSON.stringify(object)
        console.log(json)
        bookplaceAnimation()
    }
})


//код для form (собираем данные с form) закончен

//код для открытия попапа записи
const bookplaceAnimation = () => {
    bookplaceBtn.innerHTML = 'Вы записаны'
    bookplaceBtn.classList.add('bookplace-active')
}

const exit = document.querySelector('.exit_popupbooking')
const popapBooking = document.querySelector('.popupbooking_background')

exit.addEventListener('click',() => {
    popapBooking.classList.remove('popupbooking_active')
})

headerBtn.addEventListener('click',() => {
    popapBooking.classList.add('popupbooking_active')
})

const inputPlace = (arr) => {
    let bool = 'true'
    arr.map((item) => item.value == '' ? [item.placeholder = 'заполните поле ввода', bool = 'false'] : item)
    return bool
}

//код для открытия попапа записи


//код чтобы по клику на хедер открывался определенный раздел страницы
 const scroll = (index) => {
    wrapper.scroll({
        top: sections[index].offsetTop,
        left: 0,
        behavior: "smooth"})
    
 }
const elements = Array.from(document.querySelectorAll('.header_li_a'))
elements.map((item, index) => item.addEventListener('click',() => {
 scroll(index)
} ))


