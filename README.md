# WalletApp

## Project Features
1. Track In and Out transactions categorized by accounts.
2. Set a budget for each category by loading a CSV file with `category`, `type`, and `amount (budget)`.
3. Notify users of any action and alert them when they exceed their set budgets.
4. Visualized summary of transactions by date and other criteria.
5. Report generation with CSV export functionality.
6. User authentication.

---

## Tech Stack and Technologies Used
- **Framework**: Next.js
- **CSS Framework**: TailwindCSS
- **State Management**: Context API
- **Database**: PostgreSQL (supports SQLite in development)
- **Authentication**: Clerk.js
- **Charting Library**: Recharts

---

## Project UI Overview

### Dashboard
![Dashboard View](https://example.com/path-to-image/dashboard.png)


### Transaction Management
![Dashboard View](https://example.com/path-to-image/dashboard.png)


### Budget Management
![Dashboard View](https://example.com/path-to-image/dashboard.png)


### Reports
![Dashboard View](https://example.com/path-to-image/dashboard.png)


### Add Expense and Income Modal
![Dashboard View](https://example.com/path-to-image/dashboard.png)


---

## How to Use

### Access the Application
Navigate to [WalletApp on Vercel](https://walletapp-zeta.vercel.app).

**Login**: Use Gmail or GitHub to sign in.

---

### Steps to Get Started
1. **Load Your Budget**:
   - Use a CSV file with the format: `category`, `type`, and `amount`.
   - Download a sample CSV: [TestData CSV to Load as Budget](#).
2. **Track Transactions**:
   - Record each In and Out transaction as they occur.
3. **View Summary**:
   - Access data visualizations and budget notifications.
4. **Generate Reports**:
   - Create and download monthly or yearly reports in CSV format.

---

## How to Run the Project Locally

### Get Started
1. Clone the repository and install dependencies:
   ``` bash
   git clone <repository-link>
   cd walletapp
   npm install
   
   ```

2. Set Up the Database:

For development, use SQLite. Access prisma/schema.prisma and update the datasource:
``` prisma

datasource db {
  provider = "sqlite" 
  url = "file:./dev.db" 
}
```
For production, use PostgreSQL. Update DATABASE_URL in .env.local.
Set Up Clerk Authentication:

Create a .env.local file in the root directory:
``` bash

NEXT_CLERK_PUBLISHABLE_KEY=**************************************
CLERK_SECRET_KEY=************************************************
NEXT_CLERK_SIGN_IN_URL=/sign-in
NEXT_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=<your-postgresql-database-url>
```
Run the Development Server:

``` bash

npm run dev

```
Open http://localhost:3000 in your browser.

# Future Improvements
`. Integration with Bank APIs for direct transaction tracking.
2. Integration with Mobile Money (MoMo) APIs.
3. Budget validation before payments to ensure users are aware of their budget status.
