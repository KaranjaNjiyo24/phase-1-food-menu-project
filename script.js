document.addEventListener("DOMContentLoaded", () => {
    const foodMenu = document.getElementById('food-menu')
    const baseUrl = 'https://foodish-api.com/api'
    //Use our Fetch 
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
        const imgFood = document.createElement('img')
        imgFood.src = data.image
        imgFood.alt = "Food Image"
        imgFood.style.width = "200px"
        imgFood.style.height = "200px";
        foodMenu.appendChild(imgFood)
    })
})