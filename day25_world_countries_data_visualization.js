// Creating HTML elements
const countriesAPI = 'https://restcountries.com/v2/all'
const wrapper = document.createElement('div')
const titleBlock = document.createElement('div')
const switchBlock = document.createElement('div')
const visualBlock = document.createElement('div')
const h1 = document.createElement('h1')
const h2 = document.createElement('h2')
const populationButton = document.createElement('button')
const languagesButton = document.createElement('button')
const subtitleInfo = document.createElement('span')
let isPopulationButton = true
let countriesData = null
let isPopdataLoaded = false
let isLangDataLoaded = false

// Filling HTML elements
h1.textContent = 'World Countries Data'
h2.textContent = `Currently, we have 0 countries`
populationButton.textContent = 'POPULATION'
languagesButton.textContent = 'LANGUAGES'
subtitleInfo.textContent = `10 Most populated countries in the world`

// Appending HTML elements
document.body.appendChild(wrapper)
wrapper.appendChild(titleBlock)
wrapper.appendChild(switchBlock)
wrapper.appendChild(visualBlock)
titleBlock.appendChild(h1)
titleBlock.appendChild(h2)
switchBlock.appendChild(populationButton)
switchBlock.appendChild(languagesButton)
switchBlock.appendChild(subtitleInfo)

// Styles
const styles = {
    titleBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'inset 0 -8px 10px -10px black'
    },
    switchBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        margin: '0 auto',
        boxShadow: 'inset 0 -8px 10px -10px black'
    },
    visualBlock: {
        boxShadow: 'inset 0 -8px 10px -10px black',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px 0'
    },
    h1: {
        fontSize: '60px',
        color: 'orange',
        margin: '0'
    },
    h2: {
        marginTop: '10px'
    },
    button: {
        width: '110px',
        height: '30px',
        backgroundColor: 'orange',
        border: 'none',
        borderRadius: '3px',
        margin: '30px 5px 20px 5px',
        textShadow: '1px 0 black',
        cursor: 'pointer',
        outline: 'none'
    },
    span: {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        marginBottom: '10px'
    },
    country: {
        margin: '5px 0',
        height: '25px',
        width: '60%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    countryVisualData: {
        width: '60%',
        height: '30px'
    },
    countrySpan: {
        width: '20%'
    },
    countryData: {
        width: '10%',
        textAlign: 'right'
    },
    dataColor: {
        width: '0%',
        height: '30px',
        backgroundColor: 'orange'
    }
}

// Applying styles
Object.assign(wrapper.style, styles.wrapper)
Object.assign(titleBlock.style, styles.titleBlock)
Object.assign(switchBlock.style, styles.switchBlock)
Object.assign(visualBlock.style, styles.visualBlock)
Object.assign(h1.style, styles.h1)
Object.assign(h2.style, styles.h2)
Object.assign(populationButton.style, styles.button)
Object.assign(languagesButton.style, styles.button)
Object.assign(subtitleInfo.style, styles.span)

// Creating visual data block
for (let i = 0; i < 10; i++) {
    // Creating additional HTML elements
    const countryItem = document.createElement('div')
    const countryItemName = document.createElement('span')
    const countryItemBar = document.createElement('div')
    const countryBarLine = document.createElement('div')
    const countryPopulation = document.createElement('div')

    // Filling content
    countryItem.className = `country-${i + 1}`
    countryItemName.className = `country-name-${i + 1}`
    countryItemName.textContent = `country ${i + 1}`
    countryPopulation.textContent = `data ${i + 1}`
    countryPopulation.className = `country-data-${i + 1}`
    countryBarLine.className = `country-data-bar-${i + 1}`

    // Appending elements
    visualBlock.appendChild(countryItem)
    countryItem.appendChild(countryItemName)
    countryItem.appendChild(countryItemBar)
    countryItemBar.appendChild(countryBarLine)
    countryItem.appendChild(countryPopulation)

    // Adding style for the elements
    Object.assign(countryItem.style, styles.country)
    Object.assign(countryItemName.style, styles.countrySpan)
    Object.assign(countryItemBar.style, styles.countryVisualData)
    Object.assign(countryBarLine.style, styles.dataColor)
    Object.assign(countryPopulation.style, styles.countryData)
}

// Sort function
const getTenMostCountries = (countryData, button) => {
    if (button === true) {
        // Creating additional HTML element for WORLD total data
        const worldCountryItem = document.createElement('div')
        const worldName = document.createElement('span')
        const worldBar = document.createElement('div')
        const worldBarProgress = document.createElement('div')
        const worldData = document.createElement('div')

        // Filling content
        worldCountryItem.className = `world`
        worldName.textContent = `World`
        worldData.textContent = `0`

        // Appending elements
        visualBlock.appendChild(worldCountryItem)
        worldCountryItem.appendChild(worldName)
        worldCountryItem.appendChild(worldBar)
        worldBar.appendChild(worldBarProgress)
        worldCountryItem.appendChild(worldData)

        // Adding style for the elements
        Object.assign(worldCountryItem.style, styles.country)
        Object.assign(worldName.style, styles.countrySpan)
        Object.assign(worldBar.style, styles.countryVisualData)
        Object.assign(worldBarProgress.style, styles.dataColor)
        Object.assign(worldData.style, styles.countryData)

        // 1 style rule for world item
        worldCountryItem.style.order = '-1'

        const worldPop = countryData.reduce((acc, cur) => {
            return acc + cur.population
        }, 0)

        const pop = countryData.sort((a, b) => {
            return b.population - a.population
        })

        for (let i = 0; i < 10; i++) {
            const getCountryName = document.querySelector(`.country-name-${i + 1}`)
            const getCountryPopulation = document.querySelector(`.country-data-${i + 1}`)
            const getCountryBarLine = document.querySelector(`.country-data-bar-${i + 1}`)
            const curPopulationLine = (pop[i].population / worldPop) * 100
            let loadPopulation = 0
            let loadLine = 0

            getCountryName.textContent = pop[i].name

            if (isPopdataLoaded === false) {
                setInterval(() => {
                    if (loadPopulation <= worldPop) {
                        worldData.textContent = loadPopulation.toLocaleString().replace(/\s/g, ',')
                        loadPopulation += 10000000
                    }

                    if (loadPopulation <= pop[i].population) {
                        getCountryPopulation.textContent = loadPopulation.toLocaleString().replace(/\s/g, ',')
                        loadPopulation += 1000000
                    }
                }, 5)

                setInterval(() => {
                    if (loadLine <= 100) {
                        worldBarProgress.style.width = `${loadLine}%`
                        loadLine++
                    }

                    if (loadLine <= curPopulationLine) {
                        getCountryBarLine.style.width = `${loadLine}%`
                        loadLine++
                    }
                }, 40)
            } else {
                worldData.textContent = worldPop.toLocaleString().replace(/\s/g, ',')
                getCountryPopulation.textContent = pop[i].population.toLocaleString().replace(/\s/g, ',')
                worldBarProgress.style.width = '100%'
                getCountryBarLine.style.width = `${curPopulationLine}%`
            }
        }

        isPopdataLoaded = true
    }

    if (button === false) {
        const allLanguages = []
        const languageCount = []

        countriesData.forEach(country => {
            country.languages.forEach(lg => {
                allLanguages.push(lg.name)
            })
        })

        const uniqueLanguages = new Set(allLanguages)
        for (let curLang of uniqueLanguages) {
            const curLangNum = allLanguages.filter(lang => lang === curLang).length
            languageCount.push({ [curLang]: curLangNum })
        }

        languageCount.sort((a, b) => {
            const countA = Object.values(a)[0]
            const countB = Object.values(b)[0]
            return countB - countA
        })

        const tenLangs = languageCount.slice(0, 10)

        for (let i = 0; i < 10; i++) {
            const getCountryName = document.querySelector(`.country-name-${i + 1}`)
            const getCountryData = document.querySelector(`.country-data-${i + 1}`)
            const getCountryBarLine = document.querySelector(`.country-data-bar-${i + 1}`)
            const curLangCounts = Object.entries(tenLangs[i])[0]
            const biggestLangCounts = Object.entries(tenLangs[0])[0][1]
            const curCountLine = Math.round((curLangCounts[1] / biggestLangCounts) * 100)
            let loadLine = 0
            let loadCountLang = 0

            getCountryName.textContent = curLangCounts[0]
            // getCountryData.textContent = curLangData[1]

            if (isLangDataLoaded === false) {
                setInterval(() => {
                    if (loadLine <= curCountLine) {
                        getCountryBarLine.style.width = `${loadLine}%`
                        loadLine++
                    }
    
                    if (loadCountLang <= curLangCounts[1]) {
                        getCountryData.textContent = loadCountLang
                        loadCountLang++
                    }
                }, 10)
            } else {
                getCountryBarLine.style.width = `${curCountLine}%`
                getCountryData.textContent = curLangCounts[1]
            }
        }

        isLangDataLoaded = true
    }
}

// Getting data from API
fetch(countriesAPI)
    .then(response => response.json())
    .then(data => {
        getTenMostCountries(data, isPopulationButton)
        let countryCount = 0
        setInterval(() => {
            if (countryCount < 250) {
                countryCount += 1
                h2.textContent = `Currently, we have ${countryCount} countries`
            }
        }, 5)
        countriesData = data
    })
    .catch(error => console.error(error))

// Adding eventListener to buttons
languagesButton.addEventListener('click', () => {
    subtitleInfo.textContent = `10 Most Spoken languages in the world`
    isPopulationButton = false
    document.querySelector('.world').style.display = 'none'
    getTenMostCountries(countriesData, isPopulationButton)
    languagesButton.style.boxShadow = 'inset 0 -8px 10px -10px black'
    populationButton.style.boxShadow = 'none'
})

populationButton.addEventListener('click', () => {
    subtitleInfo.textContent = `10 Most populated countries in the world`
    isPopulationButton = true
    getTenMostCountries(countriesData, isPopulationButton)
    if (document.querySelector('.world')) {
        document.querySelector('.world').remove()
    }
    languagesButton.style.boxShadow = 'none'
    populationButton.style.boxShadow = 'inset 0 -8px 10px -10px black'
})