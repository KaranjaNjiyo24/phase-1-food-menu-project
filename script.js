document.addEventListener("DOMContentLoaded", () => {
    const foodMenu = document.getElementById('food-menu')
    const baseUrl = 'https://foodish-api.com/api'
    let menuItems = [];
    
    //Use our Fetch 
    for (let i=0; i<10; i++) {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            const imageUrl =data.image
            //function to extract category from url
            const category = extractCategoryFromUrl(imageUrl)
            //function to get the dishname from url
            const dishName = formatDishName(category)

            menuItems.push({
                imageUrl: imageUrl,
                dishName: dishName,
                category: category,
                likes:0,
                dsilikes:0,
                liked:false,
                dislike: false,
                comments:[]
            })

            if (menuItems.length === 10) {
                displayFoodItems()
            }

        })
    }
    function displayFoodItems() {
        foodMenu.innerHTML = ""
        menuItems.forEach((item, index) => {
            const card = document.createElement("div")
            card.classList.add("food-card")

            card .innerHTML = `
                <img src="{item.imageUrl}" class="food-image" alt="${item.dishName}">
                <div class="food-info">
                    <h3>${item.dishName}</h3>
                    <p>Category: ${item.category}</p>
                </div>
            `
            foodMenu.appendChild(card)
        })
    }

    //Creating the extract category from URL
    //Using split
    function extractCategoryFromUrl(imageUrl) {
        const urlParts = imageUrl.split("/")
        return urlParts[urlParts.length - 2]
    }

    //Formatting the dishname to capitlize the first letter
    // using toUpperCase
    function formatDishName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
})