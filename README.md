Crypto Payment Integration with Coinbase Commerce
This Node.js backend application integrates cryptocurrency payment processing using the Coinbase Commerce API. It supports creating payments, handling webhook events, and tracking payment statuses, built as part of the Fabtechsol Junior Node.js Developer assignment. The project focuses on clean, modular code and simulates transactions in a sandbox environment, with no real money involved.
Table of Contents

Project Overview
Tech Stack
Setup Instructions
My Approach
Why Coinbase Commerce
API Endpoints
Testing the Application
Directory Structure

Project Overview
This project demonstrates a backend API for processing cryptocurrency payments (e.g., USDT, ETH, SOL) using Coinbase Commerce. All transactions were simulated in a Coinbase Commerce sandbox environment using testnet credentials, ensuring no real money was involved. Key features include:

Creating payment charges via the Coinbase Commerce API.
Handling webhook events for payment updates (e.g., pending, confirmed, failed).
Tracking payment statuses in MongoDB (or in-memory storage as a fallback).
Logging success and failure responses to a file for transparency.
Simulated successful and failed transactions for testing.

The code adheres to the assignment’s constraints: Node.js (v18+), no full-stack frameworks (e.g., Next.js, NestJS), Axios for API requests, dotenv for environment variables, and no third-party payment processing libraries.
Tech Stack

Node.js (v18+): Backend runtime environment.
Express.js: Lightweight framework for routing and middleware.
Axios: For making API requests to Coinbase Commerce.
MongoDB: For storing payment requests and statuses (optional, with in-memory fallback).
dotenv: For managing environment variables.
winston: For logging success/failure responses.

Setup Instructions
Follow these steps to set up and run the project locally:

Clone the Repository:
git clone https://github.com/saimrana1/coinbase-payment-integration.git
cd coinbase-payment-integration

Install Dependencies: Install the required Node.js packages using npm:
npm install

Set Up Environment Variables: Create a .env file in the root directory and add the following configuration:
COINBASE_API_KEY=coinbase_api_key
COINBASE_WEBHOOK_SECRET=coinbase_webhook_secret
COINBASE_API_URL=https://api.commerce.coinbase.com
MONGO_URI=mongodb://localhost:27017/crypto_payments
PORT=4000

Obtain the COINBASE_API_KEY and WEBHOOK_SECRET from your Coinbase Commerce sandbox account (https://commerce.coinbase.com).
Example .env file is provided as .env.example for reference (do not commit sensitive data).

Set Up MongoDB (Optional):

Install MongoDB locally or use a cloud service like MongoDB Atlas.
Ensure MongoDB is running: mongod.

Run the Application: Start the server:
npm run dev

The server will run on http://localhost:4000 (or the port specified in PORT).

Test the API: Use tools like Postman or curl to test the API endpoints (see API Endpoints and Testing the Application).

My Approach
I built a modular Node.js application using Express.js for API routing. The Coinbase Commerce API is integrated to create charges via POST /charges requests using Axios. Webhook events are processed securely by verifying the Coinbase signature with the WEBHOOK_SECRET. Payment statuses are stored in MongoDB for persistence, with an in-memory object as a fallback for environments without MongoDB. Successful transactions were simulated by mocking webhook events with a "charge:confirmed" status, while failed transactions used "charge:expired" or "charge:unresolved" statuses. The code includes JSDoc comments for clarity and logs API responses to logs/payment.log using the winston logger. Error handling ensures robust operation, and the modular structure separates routes, controllers, and utilities for maintainability.
Why Coinbase Commerce
I chose Coinbase Commerce for its developer-friendly API, support for multiple cryptocurrencies (e.g., USDT, ETH, SOL), and robust sandbox environment for testing without real funds. The webhook system is reliable for real-time payment status updates, and the comprehensive documentation enabled efficient integration within the 72-hour deadline. Compared to alternatives like OpenNode or Fireblocks, Coinbase Commerce offered broader cryptocurrency support and simpler sandbox setup, making it ideal for this task.

Testing the Application

Route: POST /create-payment

curl --location 'https://h0w5xtk6-4000.inc1.devtunnels.ms/api/v1/create-payment' \
--header 'Content-Type: application/json' \
--header 'Cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZt8gvPANYLFDzNeDCAZpQAP_1Ftfm411l2gfhH3omLnGjYJMZWs2d1-Nnvil5jUnmtQ0PmvHQdqkyNMz050IZsnu-r_YvHNOyJINnnk9hHBM4YSDQCXszdGQ4kKhdF3ZHI9OI6eqQZ3ztRKi7IdFNhdU_6Xmg_vyg-bvd99nQ4yZ3AkPtKbFOF9dYRumFm1v3HKn36X1kWR6wM89df5tuF11XiuP2R9dyDL8O_LEMFVXL9PMxM9iBSCcezgocbyNM_TO09_Uoy2Ga3MPvD8vZXQskYN7b-6C9IlOjwXP2EPd9SM9lb1hmqoGw9-3GTq-CYtiYazdcK9eSsfRKyA5c-MGbK_rhi4TvJedUwBpyp-o709_G9YxUZHSZHt4Z-sxkmpWdd8QoszFlU5-vFiu4Cvlt7ILnGkEB24syP2p4s5maEGNWmaqNBTF5fodLRcMEU9_65cbz8l8Qh5eluy9dfHkJicS_3gdulGhKJ297YFqbLfhI-Xu-bhbeqpfEqMkhjJBjPWApT-fabpTKdTPAXQhBSzBH-VUWCHoc1heImxQzMltknv150KfN1z6IchsAJsrRIXjoeMsJ28u_qOF0CaphZhfMlhyP9zlulm_7_k0qTQOrXZRp5LeBpdIcIjR-Xol4afJe1SmC5cJOB0jIML1hsPAWDhqnVUniV3blGafETOxGCFE5bql0rKgH86dzXKHYCqzgD8WEZ9i9yX5PAo7ZuGhpumpo1sPxGHGM8LVTRjzhGlFkqYWPi0CO_N8N_DKBZuEIPAE0gfxAS5Zy0L_zwkLNpKn112ENHPK1NRIEx93n9P4pxlRlYa7g5NN_VXzuPkBZSXeY1CHfBBxlIGYxzfInfeAVdfYWPEmgsh-nxz6boa7c9TdGnzXKX5E73tcuNpLM11nvYVsOeUsVXn' \
--data '{
"amount": "5",
"currency": "USDC"
}'

Response:

{
"message": "Payment created successfully",
"data": {
"url": "https://commerce.coinbase.com/pay/f1aacc2e-836f-4cf0-b62c-cebbae1c5b80",
"chargeId": "f1aacc2e-836f-4cf0-b62c-cebbae1c5b80"
}
}

Route: POST /get-payment-status

curl --location 'https://h0w5xtk6-4000.inc1.devtunnels.ms/api/v1/payment-status/6ecef410-1b7e-4a6f-86a1-6c2db9e5c8df' \
--header 'Cookie: .Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZtT4-Xebddp8iNMjHs4BpyE813puEUR52bXnVVMF_mRegPP_1gqiTu5PhSVf4GSjIEGz7_fnXMxmoXf1YC-sC6WF4AJ2STZmDrSmDc2LLj-1vgBepLcYrdmK1DuZDhHpJFGygfcz8yKSIqLZaqabh-MeNFauv1z6C-BiflXV73R-XfzD1O0iyyxLGUE0Nfzzaiunhl-MSnr8Kf9sdBhpjLhq6GmBn4MUh44r9Lb4GgBqjHtt6-Te1BG6MjUKzG7mcHWapa7g8fhSO805xyPJenmSxA4xIjBLaFJSjr1wZG80XVdE6J2Q5LQggkK8EyRU87cH9KQFFw4svHJYoaBxSH3qSgiloe5BfczYr3CJMtck3mZ-Ljdhhe8bMyxu4KGFTN5tlr8AcGSzCzmosu1VT8xvfYdI27spt6lFnY9Id6PkFpLyZKikH5CsX1FP_mVL4yzJAplMY5yKW61E-\_DiFOimP_kePu3tI8eSSTMY3mVX0lhkEoBcnggyTKQXgJIq3sqG48GOCLdIrDCHwQoLsAPWk_O5bD8sxRGZNNrk9l9srQ5uStgzXW-5GyafgV9O1ZKvpm3uf4pCLZXnxUFsLa0SntJe5rZVUUhcz8aOumHgJz6kmx2lfFgzqlm3dnYHay-qfAapoFiioQJC3PlnVijQ53o5-KQ26BcqZ9xNh-iusnm-UUt1hkX34lwtgfG91hMH8hPFlHM3Pe6R5OtlNCMkqYTR4j3TaxHhmiBYYvS5MlyjWpbBtJTgP2mnjZv9mr6IW4J1Ote3P5jEVr9-LP2EQXSzLwkrN686roUWcdEsaGBCL5b1Dr5npkAprxpjJ8a8VYsznYwFwbHamy44Kzj9DcE7NKKwHPJzV8rjM4NU70V11C5iycpC2bxCCir7lVylqRg_n1L8Dd_RK-C4GOP'

Response:

{
"message": "Payment status retrieved successfully",
"data": {
"status": "PENDING"
}
}
