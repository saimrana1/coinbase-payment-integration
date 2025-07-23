# Crypto Payment Integration with Coinbase Commerce

This Node.js backend application integrates cryptocurrency payment processing using the **Coinbase Commerce API**. It supports creating payments, handling webhook events, and tracking payment statuses, built as part of the Fabtechsol Junior Node.js Developer assignment. The project focuses on clean, modular code and simulates transactions in a sandbox environment, with no real money involved.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [My Approach](#my-approach)
- [Why Coinbase Commerce](#why-coinbase-commerce)
- [API Endpoints](#api-endpoints)
- [Testing the Application](#testing-the-application)
- [Directory Structure](#directory-structure)

## Project Overview
This project demonstrates a backend API for processing cryptocurrency payments (e.g., USDT, ETH, SOL) using Coinbase Commerce. Key features include:
- Creating payment charges via the Coinbase Commerce API.
- Handling webhook events for payment updates (e.g., pending, confirmed, failed).
- Tracking payment statuses in MongoDB for persistence.
- Logging success and failure responses for transparency.
- Simulated successful and failed transactions in a sandbox environment.

The code follows a modular structure, uses `dotenv` for environment configuration, and adheres to the assignment’s constraints (e.g., no full-stack frameworks, no third-party payment libraries).

## Tech Stack
- **Node.js** (v18+): Backend runtime environment.
- **Express.js**: Lightweight framework for routing and middleware.
- **Axios**: For making API requests to Coinbase Commerce.
- **MongoDB**: For storing payment requests and statuses (with in-memory fallback option).
- **dotenv**: For managing environment variables.

## Setup Instructions
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/saimrana1/coinbase-payment-integration.git
   cd coinbase-payment-integration