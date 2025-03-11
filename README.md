☕ CoffeeShop - Full-Stack Web Application
🚀 CoffeeShop is a feature-rich, full-stack web application for managing a coffee shop's online presence. Customers can explore the menu, place orders, make reservations, leave reviews, and complete payments using PayPal & UPI.

🔗 Live Demo:  https://coffeeshopfrontend.netlify.app/

📌 Features
✅ User Authentication - Secure login/signup system
✅ Dynamic Menu Management - View, add, update, and delete menu items
✅ Cart Functionality - Add items to cart, update quantity, and checkout
✅ Order Processing - Place and manage orders seamlessly
✅ Reservations - Book a table and manage reservations
✅ Reviews & Ratings - Users can leave feedback for orders
✅ Payments Integration - Supports PayPal & UPI
✅ Admin Dashboard - Manage menu, orders, reservations, and reviews
✅ Responsive UI - Built with Tailwind CSS & ShadCN for a sleek and modern look

🛠️ Tech Stack
Frontend:
React.js
Redux Toolkit
Tailwind CSS
ShadCN
Axios
Backend:
Node.js
Express.js
MongoDB (Mongoose)
Cloudinary (for image uploads)
JSON Web Tokens (JWT) for authentication

Deployment:
Frontend: Netlify
Backend: Render
Database: MongoDB Atlas

🚀 Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v18+)
MongoDB (Local or MongoDB Atlas)
1️⃣ Clone the Repository
cd coffeeshop
🏗 Backend Setup

2️⃣ Navigate to Backend
cd backend

3️⃣ Install Dependencies
npm install

4️⃣ Configure Environment Variables
Create a .env file in the backend folder and add:
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URI=http://localhost:5173
DASHBOARD_URI=http://localhost:5173

5️⃣ Start the Backend Server
npm run dev
Your backend will be running on http://localhost:5000

🎨 Frontend Setup
6️⃣ Navigate to Frontend
cd ../frontend

7️⃣ Install Dependencies
npm install

8️⃣ Configure Environment Variables
Create a .env file in the frontend folder and add:
env
Copy
Edit
VITE_BACKEND_URI=http://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

9️⃣ Start the Frontend
npm run dev
Your frontend will be running on http://localhost:5173

⚡ API Routes
Method	Endpoint	Description
POST	/api/auth/register	User Registration
POST	/api/auth/login	User Login
GET	/api/menu	Fetch Menu Items
POST	/api/orders	Place an Order
PUT	/api/orders/:id	Update Order Status
DELETE	/api/orders/:id	Cancel Order
POST	/api/reservations/make	Make a Reservation
PUT	/api/reservations/update/:id	Update Reservation Status
DELETE	/api/reservations/delete/:id	Delete Reservation
POST	/api/reviews	Submit a Review
📂 Folder Structure
pgsql
Copy
Edit
📦 CoffeeShop
 ┣ 📂 frontend   # React App (Client)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 App.jsx
 ┃ ┃ ┣ 📜 main.jsx
 ┃ ┗ 📜 package.json
 ┣ 📂 backend    # Node.js API (Server)
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 package.json
 ┣ 📜 README.md  # Documentation
 ┣ 📜 .gitignore
 
🚀 Deployment

Frontend (Netlify)
Go to Netlify
Connect GitHub repository
Set VITE_BACKEND_URI as an environment variable
Deploy!
Backend (Render/Vercel)
Go to Render or Vercel
Connect GitHub repository
Add backend environment variables
Deploy!
🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

📩 Contact
If you have any questions or feedback, feel free to reach out:

📧 Email: arbazzsiddique104@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/arbaz-siddique-b99529244/

⭐ Show Some Support!
If you like this project, don’t forget to star ⭐ the repository on GitHub!

