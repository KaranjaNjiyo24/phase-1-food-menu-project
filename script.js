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
                dislikes:0,
                liked:false,
                disliked: false,
                comments:[]
            })

            if (menuItems.length === 10) {
                displaymenuItems()
            }

        })
    }
    function displaymenuItems() {
        foodMenu.innerHTML = ""
        menuItems.forEach((item, index) => {
            const card = document.createElement("div")
            card.classList.add("food-card")

            card.innerHTML = `
                <img src="${item.imageUrl}" class="food-image" alt="${item.dishName}">
                <div class="food-info">
                    <h3>${item.dishName}</h3>
                    <p>Category: ${item.category}</p>
                    <p>Likes: <span id="like-count-${index}">${item.likes}</span> | Dislikes: <span id="dislike-count-${index}">${item.dislikes}</span></p>
                </div>
                <div class="interaction-buttons">
                    <button id="like-btn-${index}" onclick="likeFood(${index})">Like</button>
                    <button id="dislike-btn-${index}" onclick="dislikeFood(${index})">Dislike</button>
                </div>
                <div class="comment-section">
                    <textarea id="comment-${index}" placeholder="Leave a comment"></textarea>
                    <button class="comment-button" onclick="addComment(${index})">Comment</button>
                </div>
                <div id="comments-list-${index}" class="comments-list"></div>
            `
            foodMenu.appendChild(card)
        })
    }
        // Functions to handle likes and dislikes with inverse relationship
    window.likeFood = function(index) {
        if (!menuItems[index].liked) {
            menuItems[index].likes++;
            menuItems[index].liked = true;
            // If previously disliked, remove the dislike
            if (menuItems[index].disliked) {
                menuItems[index].dislikes--;
                menuItems[index].disliked = false;
            }
        }
        document.getElementById(`like-count-${index}`).textContent = menuItems[index].likes;
        document.getElementById(`dislike-count-${index}`).textContent = menuItems[index].dislikes;
    };


    // Functions to handle likes and dislikes with inverse relationship
    window.likeFood = function(index) {
        if (!menuItems[index].liked) {
            menuItems[index].likes++;
            menuItems[index].liked = true;
            // If previously disliked, remove the dislike
            if (menuItems[index].disliked) {
                menuItems[index].dislikes--;
                menuItems[index].disliked = false;
            }
        }
        document.getElementById(`like-count-${index}`).textContent = menuItems[index].likes;
        document.getElementById(`dislike-count-${index}`).textContent = menuItems[index].dislikes;
    };

    window.dislikeFood = function(index) {
        if (!menuItems[index].disliked) {
            menuItems[index].dislikes++;
            menuItems[index].disliked = true;
            // If previously liked, remove the like
            if (menuItems[index].liked) {
                menuItems[index].likes--;
                menuItems[index].liked = false;
            }
        }
        document.getElementById(`like-count-${index}`).textContent = menuItems[index].likes;
        document.getElementById(`dislike-count-${index}`).textContent = menuItems[index].dislikes;
    };

    // Function to handle adding comments
    window.addComment = function(index) {
        const commentText = document.getElementById(`comment-${index}`).value;
        if (commentText.trim() !== "") {
            menuItems[index].comments.push(commentText);
            document.getElementById(`comment-${index}`).value = ""; // Clear the textarea
            displayComments(index);
        }
    };

    // Function to display the list of comments for a food item
    function displayComments(index) {
        const commentsList = document.getElementById(`comments-list-${index}`);
        commentsList.innerHTML = ""; // To clear previous comments

        menuItems[index].comments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.textContent = comment;
            commentsList.appendChild(commentElement);
        });
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

    const themeToggleButton = document.getElementById('theme-toggle');

    // Add an event listener for the button click
    themeToggleButton.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body element
        document.body.classList.toggle('dark-mode');

        // Optional: Change the button text depending on the current theme
        if (document.body.classList.contains('dark-mode')) {
            themeToggleButton.textContent = "Switch to Light Mode";
        } else {
            themeToggleButton.textContent = "Switch to Dark Mode";
        }
    });
})