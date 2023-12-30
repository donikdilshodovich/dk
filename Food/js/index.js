let modal_btns = document.querySelectorAll("[data-modal]")
let modal = document.querySelector(".modal")
let modal_dialog = document.querySelector(".modal__dialog")
let close_modal = document.querySelectorAll("[data-close]")

modal_btns.forEach(btn => {
    btn.onclick = () => {
        modal.classList.add("fade", "show")
        modal_dialog.classList.add("fade", "show")
    }
})
close_modal.forEach(btn => {
    btn.onclick = () => {
        modal.classList.remove("show")
        modal_dialog.classList.remove("show")
    }
})

let is_show = true

window.addEventListener("scroll", () => {
    let windowHeight = window.innerHeight
    let scrollPosition = window.scrollY
    let documentHeight = document.body.scrollHeight

    if (is_show && scrollPosition + windowHeight >= documentHeight) {
        modal.classList.add("show")
        modal_dialog.classList.add("show")
        is_show = false
    }
});


//!---------------------------------------------------------


let offer__slider_prev = document.querySelector('.offer__slider-prev')
let offer__slider_next = document.querySelector('.offer__slider-next')
let slides = document.querySelectorAll('.offer__slide')
let total = document.querySelector('#total')
let current = document.querySelector('#current')
let slideIndex = 0

showSlides()

function showSlides(n) {
    total.innerHTML = formatNums(slides.length)

    if (n > slides.length - 1) {
        slideIndex = 0
    }

    if (n < 0) {
        slideIndex = slides.length - 1
    }

    slides.forEach(el => el.classList.add('hide'))
    slides[slideIndex].classList.remove('hide')
    slides[slideIndex].classList.add('fade')
    current.innerHTML = formatNums(slideIndex + 1)
}

offer__slider_next.onclick = () => {
    slideIndex++
    showSlides(slideIndex)
}

offer__slider_prev.onclick = () => {
    slideIndex--
    showSlides(slideIndex)
}

function formatNums(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num + "";
}


//!---------------------------------------------------------


let tab_contents = document.querySelectorAll(".tabcontent")
let tab_buttons = document.querySelectorAll(".tabheader__item")

tab_contents.forEach(cont => cont.classList.add("hide"))
tab_contents[0].classList.remove("hide")

tab_buttons.forEach((btn, ind) => {
    btn.onclick = () => {
        tab_buttons.forEach(el => el.classList.remove("tabheader__item_active"))
        btn.classList.add("tabheader__item_active")

        tab_contents.forEach(cont => cont.classList.add("hide", "fade"))
        tab_contents[ind].classList.remove("hide")
    }
})


//!----------------------------------------------------------

let gender = document.querySelectorAll("#gender .calculating__choose-item");
let constitution = document.querySelectorAll(".calculating__choose_medium .calculating__choose-item")
let activity = document.querySelectorAll(".calculating__choose_big .calculating__choose-item")
let result = document.querySelector(".result")

let userData = {
    gender: "woman",
}

gender.forEach(el => {
    let key = el.getAttribute("data-gender")
    el.onclick = () => {
        userData.gender = key
        gender.forEach(item => item.classList.remove("calculating__choose-item_active"))
        el.classList.add("calculating__choose-item_active")
    }
})

constitution.forEach(el => {
    let key = el.getAttribute("id")
    el.onkeyup = () => {
        userData[key] = el.value
        el.style.border = "none"
    }
})


activity.forEach(el => {
    let key = +el.getAttribute("data-activity")
    activity.forEach(item => item.classList.remove("calculating__choose-item_active"))
    el.onclick = () => {
        activity.forEach(item => item.classList.remove("calculating__choose-item_active"))
        el.classList.add("calculating__choose-item_active")

        const { gender, height, weight, age } = userData
        let temp = 0

        let isEror = false

        constitution.forEach(inp => {
            if (inp.value.length === 0) {
                inp.style.border = "1px solid red"
                isEror = true
            }
        })

        if (isEror) {
            return
        }

        if (gender === "woman") {
            temp = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)
        } else {
            temp = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
        }
        result.innerHTML = Math.floor(temp * key)
    }
})


//!--------------------------------------------------------------------

let title = document.querySelector(".promotion__timer .title")
let deadline = "2023-12-20"


function getRemainingTime(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor((t / 1000) / 60 / 60 / 24),
        hours = Math.floor((t / 1000) / 60 / 60 % 24),
        minutes = Math.floor((t / 1000) / 60 % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        t,
        days,
        hours,
        minutes,
        seconds,
    }
}

function setTime(endTime, selector) {
    let t = document.querySelector(selector),
        days = t.querySelector('#days'),
        hours = t.querySelector('#hours'),
        minutes = t.querySelector('#minutes'),
        seconds = t.querySelector('#seconds'),
        interval = setInterval(updateTime, 1000);

    function updateTime() {
        let t = getRemainingTime(endTime)
        days.innerHTML = t.days
        hours.innerHTML = t.hours
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds

        if (t.t <= 0) {
            title.innerHTML = ("Акция закончилась:")
            clearInterval(interval)
        }
    }
}

setTime(deadline, '.timer')


//!-----------------------------------------------------------


let congratulate = document.querySelector(".congratulate")
let close_congrat = document.querySelector(".congrat__close")
let congrat_name = document.querySelector(".congrat__name")
let congrat_phone = document.querySelector(".congrat__phone")

const forms = document.querySelectorAll('form');
const userInfo = {};

forms.forEach(form => {
    const inputs = form.querySelectorAll('input');
    const submitButton = form.querySelector('.btn');

    inputs.forEach(el => {
        let key = el.getAttribute("name")
        el.onkeyup = () => {
            userInfo[key] = el.value
            el.style.border = "none"
        }
    })

    submitButton.onclick = function (event) {
        event.preventDefault();
        let isEror = false
        inputs.forEach(inp => {
            if (inp.value.length === 0) {
                inp.style.border = "1px solid red"
                setTimeout(() => {
                    inp.style.border = "none"
                }, 5000);
                isEror = true
            }
        })
        if (isEror) {
            return
        }

        congrat_name.innerHTML = userInfo.name
        congrat_phone.innerHTML = userInfo.phone
        congratulate.style.display = "block"
        modal.classList.remove("show")
        modal_dialog.classList.remove("show")
        inputs.forEach(input => input.value = "")
    }
});

close_congrat.onclick = () => {
    congratulate.style.display = "none"
}
