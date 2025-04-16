<p style="font-weight: 900; text-align: center;">FRIDGE TO FORK</p>

Fridge to Fork is a single-page web application designed to help users discover healthy and delicious recipes using ingredients they already have at home. By inputting available ingredients, users can find recipes that match their pantry contents.

**Features**

Ingredient-Based Search: Enter ingredients to find matching recipes.

Expandable Recipe Details: View ingredients, instructions, and nutritional information without leaving the search page.

Favorites Section: Save and revisit favorite recipes during the session, with an option to download them.

Clean and Intuitive UI: User-friendly interface with a header containing a search bar and a link to the favorites section.

**Getting Started**

***Prerequisites:***

Node.js (version 20.19.0)
npm (version 10.8.2)

**Installation**

***Clone the repository:***

git clone https://github.com/your-username/fridge-to-fork.git

***Navigate to the project directory:***

cd fridge-to-fork

***Install dependencies:***

npm install

***Start the development server:***

npm run dev

The application will be available at http://localhost:5173.

**API Usage**

This application utilizes the Spoonacular API to fetch recipe data based on user-inputted ingredients. Specifically, it uses the "What's in your fridge" endpoint to search for recipes that can be made with the provided ingredients.

**Data Handling**

User-inputted ingredients are sent to the Spoonacular API to retrieve matching recipes.

Recipe details, including ingredients, instructions, and nutritional information, are displayed in an expandable view.

Favorite recipes are stored in the session and can be downloaded for future reference.