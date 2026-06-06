import { catsData } from './data.js'

const emotions = document.getElementById('emotions')
const showCatMeme = document.getElementById('show-cat')
const gifsOnly = document.getElementById('gifs-only')
const getImage = document.getElementById('get-image')
const message = document.getElementById('message')
const body = document.getElementById('body')
const multiMemesCheckbox = document.getElementById('multi-memes')
const catsEmotions = []


function extractUniqueEmotions(){
    for (let cat of catsData){
        const catEmotionsArray = cat.emotionTags
        for (let catEmotion of catEmotionsArray){
            if (!catsEmotions.includes(catEmotion))
            {
                catsEmotions.push(catEmotion)
            }
        }
    }
}

function renderEmotions(){
    emotions.innerHTML=
    `<label for='select-emotion'>Select the emotion</label>
     <select id='select-emotion' name='emotions'>`
    const selectEmotion = document.getElementById('select-emotion')
    for (let emotion of catsEmotions){
        selectEmotion.innerHTML +=
        `<option id='${emotion}' value='${emotion}' name='emotion'>
            ${emotion}
         </option>`
    }
    selectEmotion.innerHTML +='</select>'
}

extractUniqueEmotions()
renderEmotions()

getImage.addEventListener("click",getSelectedEmotionImage)

function getSelectedEmotionImage(){
    const selectedEmotion = document.getElementById('select-emotion').value
    let selectedCats = []
    if (gifsOnly.checked){
        selectedCats= catsData.filter(function(cat){
            return cat.isGif && cat.emotionTags.includes(selectedEmotion)
        })
        if (selectedCats.length===0){
            message.style.display='block'
        }
    }else{
        selectedCats = catsData.filter(function(cat){
        return cat.emotionTags.includes(selectedEmotion)
    })
    }
    showCatMeme.style.display='block'
    showCatMeme.innerHTML = 
    `<button id="close-btn">X</button>
    <p id='meme-heading'>Your meme</p>
    <div id='meme'>`
    if (multiMemesCheckbox.checked){
        for (let cat of selectedCats){
            showCatMeme.innerHTML+=
            ` 
            <img 
            class='meme-img' 
            src='images/${cat.image}'
            alt=${cat.alt}>
        `
        }
        showCatMeme.innerHTML+='</div>'
    }else{
        const randomCat = selectedCats[Math.floor(Math.random()*selectedCats.length)]
        showCatMeme.innerHTML+=
            `
            <img 
            class='meme-img' 
            src='images/${randomCat.image}'
            alt=${randomCat.alt}>
        `
    }
    const closeBtn = document.getElementById('close-btn')
    closeBtn.addEventListener("click",closeMeme)
}


function closeMeme(){
    showCatMeme.style.display='none'
}