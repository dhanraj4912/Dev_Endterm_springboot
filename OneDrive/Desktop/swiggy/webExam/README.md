
I created a restaurant website like Swiggy using React and Tailwind CSS.

First, I made the React app using Vite and installed tailwindcss, axios, and react-router-dom.  
Then I setup Tailwind and added it in index.css.  

After setup, I created components:
- Navbar.jsx
- Footer.jsx
- RestaurantList.jsx
- RestaurantCard.jsx
- RestaurantDetails.jsx
- Home.jsx

In Home.jsx, I called the restaurant API using axios inside useEffect.  
I used useState to store data like:

const [restaurants, setRestaurants] = useState([]);

Then I mapped this data in RestaurantList.jsx and sent each restaurant to RestaurantCard.jsx as props.

In RestaurantCard.jsx, I showed the restaurant image, name, rating, and cuisine using Tailwind classes for design.
Each card was clickable — on click, it opened RestaurantDetails.jsx page with the selected restaurant id.

In RestaurantDetails.jsx, I again called API using that id to fetch menu items.
I stored items in:


const [menuItems, setMenuItems] = useState([]);


Then displayed all food items with price and description using Tailwind UI.

Navbar and Footer were common in all pages, added in App.jsx.
Used react-router-dom for routes like:

* `/` → Home (shows all restaurants)
* `/restaurant/:id` → shows restaurant menu and details

Used Tailwind for full styling — grid for layout, flex for alignment, bg for colors, shadow for cards, hover for effects, rounded for corners, and responsive classes for small and large screens.

At last, I checked all pages, all data fetched properly from API, cards displayed fine, and the site looked responsive and clean using only React and Tailwind.

Deployment----

<!-- https://flowbite.com/docs/components/footer/ used footer component -->
<!-- https://flowbite.com/docs/components/navbar/ -->