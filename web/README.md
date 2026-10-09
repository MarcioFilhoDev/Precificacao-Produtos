# Product Pricing

Web application built with React and Vite for product pricing management, including authentication, storage, and a database powered by Firebase.

[Leia este README em português](README.pt-BR.md).

## Technologies

- React
- TypeScript
- Vite
- Firebase Authentication
- Firestore
- Firebase Storage
- React Router
- Tailwind CSS

## Prerequisites

Before running the project, make sure you have installed:

- Node.js 18 or later
- npm
- A Firebase account

## Project structure

```bash
web/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 1) Installation

Run the following command from the project directory:

```bash
npm install
```

## 2) Firebase configuration

Create a Firebase project and add a web app:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app
4. Copy the Firebase credentials
5. Create `src/services/firebaseConnection.ts` if it does not exist yet
6. Add your project configuration to the file

Example:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

> Important: replace the example values with your actual Firebase project credentials.

## 3) Running the project

To start the application in development mode:

```bash
npm run dev
```

The application will be available at Vite's default address, usually:

```bash
http://localhost:5173
```

## 4) Production build

To create a production build:

```bash
npm run build
```

You can then preview the build locally with:

```bash
npm run preview
```

## 5) Features

- User authentication
- Sign-up and sign-in with an option to choose whether to persist the session locally
- Product management
- Automatic product pricing based on each product's ingredients
- Sales management
- Dashboard with an integrated filter to view sales and profit by product
- Protected private and public routes
- Firebase integrations for storage and data

## Tips

- Keep your Firebase keys secure
- If you use email and password authentication, enable the corresponding sign-in method in Firebase
- Check your Firestore and Storage rules before testing in production

## Note

This README is intended to make local setup and connection to the project's Firebase services easier. In collaborative environments, credentials should preferably be stored in environment variables or in a project-specific configuration file, in accordance with your team's security policies.