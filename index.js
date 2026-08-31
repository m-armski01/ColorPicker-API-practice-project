const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const baseColor = document.getElementById('base-color-pick').value.slice(1)
    const paletteStyle = document.getElementById('palette-style').value.toLowerCase()
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${paletteStyle}&count=6`)
        .then(response => response.json())
        .then(data => {
            const generatedPalette = document.getElementById('color-palette')
            
            const html = data.colors.map(color => `
                <div class="swatch" style="background-color: ${color.hex.value}">
                    <span>${color.hex.value}</span>
                </div>
            `).join('')
            
            generatedPalette.innerHTML = html
        })
})