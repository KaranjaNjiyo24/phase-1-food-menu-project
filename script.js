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
    // Function to handle adding comments
    window.addComment = function(index) {
        const commentText = document.getElementById(`comment-${index}`).value;
        if (commentText.trim() !== "") {
            foodItems[index].comments.push({
                text: commentText,
                edited: false // Track whether a comment has been edited
            });
            document.getElementById(`comment-${index}`).value = ""; // Clear the textarea
            displayComments(index);
        }
    };

    // Function to display the list of comments for a food item
    function displayComments(index) {
        const commentsList = document.getElementById(`comments-list-${index}`);
        commentsList.innerHTML = ""; // Clear previous comments

        foodItems[index].comments.forEach((comment, commentIndex) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment-item");

            // Display the comment and buttons
            commentElement.innerHTML = `
                <p>${comment.text} ${comment.edited ? "(edited)" : ""}</p>
                <button onclick="editComment(${index}, ${commentIndex})">Edit</button>
                <button onclick="deleteComment(${index}, ${commentIndex})">Delete</button>
            `;

            commentsList.appendChild(commentElement);
        });
    }

    // Function to handle deleting comments
    window.deleteComment = function(foodIndex, commentIndex) {
        foodItems[foodIndex].comments.splice(commentIndex, 1); // Remove the comment
        displayComments(foodIndex); // Refresh the comments list
    };

    // Function to handle editing comments
    window.editComment = function(foodIndex, commentIndex) {
        const newCommentText = prompt("Edit your comment:", foodItems[foodIndex].comments[commentIndex].text);
        if (newCommentText !== null && newCommentText.trim() !== "") {
            foodItems[foodIndex].comments[commentIndex].text = newCommentText;
            foodItems[foodIndex].comments[commentIndex].edited = true; // Mark the comment as edited
            displayComments(foodIndex); // Refresh the comments list
        }
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

    //Formatting the dishname to capitalize the first letter
    // using toUpperCase
    function formatDishName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1)
    }

    const darkModeToggle = document.getElementById('theme-toggle');
    let isDarkMode = false;

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;

        // Apply dark mode styles if true, else light mode
        //This is where our if else comes in!!
        if (isDarkMode) {
            document.body.style.backgroundColor = "#333"; // Dark background
            document.body.style.color = "#fff"; // Light text color

            // Update food card background color for dark mode
            document.querySelectorAll('.food-card').forEach(card => {
                card.style.backgroundColor = "#444"; // Dark background for cards
                card.style.color = "#fff"; // Light text color inside the card
            });

        } else {
            document.body.style.backgroundColor = "#fff"; // Light background
            document.body.style.color = "#333"; // Dark text color

            // Reset food card background color for light mode
            document.querySelectorAll('.food-card').forEach(card => {
                card.style.backgroundColor = "#fff"; // Light background for cards
                card.style.color = "#333"; // Dark text color inside the card        
            });
        }
    }

    // Add event listener for button click to toggle dark mode
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Add a 'mouseover' event listener to change button text when hovering over the toggle button
    darkModeToggle.addEventListener('mouseover', () => {
        darkModeToggle.textContent = "Ready to switch themes?";
    });

    // Add a 'mouseleave' event listener to revert the button text back to its original state
    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
    });
})