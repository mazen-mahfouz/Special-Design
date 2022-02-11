
let sidebar = document.getElementById('sidebar');
let bar = document.getElementById('bar');
let change_sidebar = 'open';
let bar_style = document.head.appendChild(document.createElement("style"));
let skil_style = document.head.appendChild(document.createElement("style"));
let div_skils = document.getElementById('skils');
let img_view = document.getElementById('img-view');
let overlay = document.getElementById('overlay');
let change_colore = document.querySelectorAll('#change-color > div');
let change_color_array = Array.from(change_colore)
let yesno_background = document.querySelectorAll('#change-Background > div');
let background_open;
let yesno_bullets = document.querySelectorAll('#change-bullets > div');
let bullets = document.getElementById('bullets');

setloacl()
function setloacl() {
    // localStorage.clear()
    if (localStorage.getItem("color-count") !== null && localStorage.getItem("color") !== null) {
        change_colore[localStorage.getItem("color-count")].classList.add('active')
        document.documentElement.style.setProperty("--them-color", localStorage.getItem("color"));
    } else {
        document.documentElement.style.setProperty("--them-color", '#ff9800');
        change_colore[0].classList.add('active')
    }

    if (localStorage.getItem("background-ele") !== null && localStorage.getItem("background-open") !== null) {
        yesno_background[localStorage.getItem('background-ele')].classList.add('active')
        change_background(yesno_background[localStorage.getItem('background-ele')], localStorage.getItem('background-open'))
    }

    if (localStorage.getItem("bullets-ele") !== null && localStorage.getItem("bullets-open") !== null) {
        yesno_bullets[localStorage.getItem('bullets-ele')].classList.add('active')
        change_bullets(yesno_bullets[localStorage.getItem('bullets-ele')], localStorage.getItem('bullets-open'))
    }

}

function sidebar_fun() {
    if (change_sidebar == 'open') {
        sidebar.style.left = 10 + '%';
        bar.style.height = 0 + 'px';
        bar_style.innerHTML = '#bar::before{top: 0px !important; transform: rotate(45deg)} #bar::after{top: 0px !important; transform: rotate(-45deg)}';
        change_sidebar = 'close';
    } else {
        sidebar.style.left = 100 + '%';
        bar.style.height = 2 + 'px';
        bar_style.innerHTML = ' ';
        change_sidebar = 'open';
    }

}


window.onscroll = function () {
    scrol();
};

let num_skil = ['90%', '85%', '50%', '80%'];
let o = [];
let u = 'no';

function scrol() {
    if (div_skils.offsetTop - 800 < Math.floor(window.pageYOffset) && (div_skils.offsetTop + 800 > Math.floor(window.pageYOffset))) {
        if (u == 'no') {
            for (let i = 0; i <= 4; i++) {
                o[i] = document.head.appendChild(document.createElement("style"));
                o[i].innerHTML = '.skil-' + (i + 1) + '::after{width:' + num_skil[i] + '}';
                u = 'yes';
            }
        }
    } else {
        if (u == 'yes') {
            for (let i = 0; i <= 4; i++) {
                o[i].innerHTML = "";
                u = 'no';
            }
        }
    }
}

function view_img(x) {
    img_view.style.display = 'block';
    overlay.style.display = 'block';
    document.querySelector('#img-view img').src = x.src;
}

function close_img_view() {
    img_view.style.display = 'none';
    overlay.style.display = 'none';
}

function background_random() {
    if (background_open == true) {
        let header = document.getElementById('header');
        let random = Math.floor(Math.random() * 10) + 1;
        header.style.backgroundImage = `url(img/${random}.jpg)`;

        setTimeout(() => {
            background_random()
        }, 5000);
    }
}
background_random()

let setting_sidebar_open = false;
let sidebar_setting = document.getElementById('setting-sidebar');
let setting = document.getElementById('setting');
let setting_img = document.querySelector('#setting img');
function setting_bar() {
    console.log(setting_img)
    if (setting_sidebar_open == false) {
        setting_sidebar_open = true;
        sidebar_setting.style.left = 0;
        setting.style.left = sidebar_setting.offsetWidth + 'px';
        setting_img.classList.add('setting_anime')
        console.log(sidebar_setting.offsetWidth)
    } else {
        setting_sidebar_open = false;
        sidebar_setting.style.left = -sidebar_setting.offsetWidth + 'px';
        setting.style.left = 0;
        setting_img.classList.remove('setting_anime')
    }
}


change_color_array.forEach((ele) => {
    ele.addEventListener('click', function (e) {
        change_color_array.forEach((ele) => {
            ele.classList.remove('active');
        })

        ele.classList.add('active')

        localStorage.setItem("color", e.currentTarget.dataset.color);
        localStorage.setItem("color-count", e.currentTarget.dataset.count);

        document.documentElement.style.setProperty("--them-color", (e.currentTarget.dataset.color));
    })
})


function change_background(x, y) {
    switch (y) {
        case 'yes':
            yesno_background[1].classList.remove('active')
            x.classList.add('active');
            background_open = true;
            localStorage.setItem("background-open", y);
            localStorage.setItem("background-ele", 0);
            background_random()
            break;

        case 'no':
            yesno_background[0].classList.remove('active')
            x.classList.add('active');
            background_open = false;
            localStorage.setItem("background-open", y);
            localStorage.setItem("background-ele", 1);
            break;
    }
}

function change_bullets(x, y) {
    switch (y) {
        case 'yes':
            yesno_bullets[1].classList.remove('active')
            x.classList.add('active');
            bullets.style.display = 'block';
            localStorage.setItem("bullets-open", y);
            localStorage.setItem("bullets-ele", 0);
            break;

        case 'no':
            yesno_bullets[0].classList.remove('active')
            x.classList.add('active');
            bullets.style.display = 'none';
            localStorage.setItem("bullets-open", y);
            localStorage.setItem("bullets-ele", 1);
            break;
    }
}

function reset() {
    localStorage.setItem("color", '#ff9800');
    localStorage.setItem("color-count", 0);
    change_color_array.forEach((ele) => {
        ele.classList.remove('active');
    })
    change_colore[localStorage.getItem("color-count")].classList.add('active')
    document.documentElement.style.setProperty("--them-color", localStorage.getItem("color"));

    localStorage.setItem("background-ele", 0);
    change_background(yesno_background[localStorage.getItem('background-ele')], 'yes')

    localStorage.setItem("bullets-ele", 0);
    change_bullets(yesno_bullets[localStorage.getItem('bullets-ele')], 'yes')
}