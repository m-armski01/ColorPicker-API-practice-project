const form = document.getElementById('form')
const generatedPalette = document.getElementById('color-palette')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const baseColor = document.getElementById('base-color-pick').value.slice(1)
    const paletteStyle = document.getElementById('palette-style').value.toLowerCase()

    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${paletteStyle}&count=6`)
        .then(response => response.json())
        .then(data => {
            const html = data.colors.map(color => `
                <div class="swatch" style="background-color: ${color.hex.value}">
                    <span class="color-code">${color.hex.value}</span>
                </div>
            `).join('')

            generatedPalette.innerHTML = html
        })
})

generatedPalette.addEventListener('click', async (e) => {
    const colorCode = e.target.closest('.color-code')
    if (!colorCode) return

    const text = colorCode.textContent.trim()

    try {
        await navigator.clipboard.writeText(text)
        console.log('Copied:', text)
    } catch (err) {
        console.error('Copy failed:', err)
    }
})