# Equipment Sales Website

## Overview
The Equipment Sales Website is a comprehensive platform designed to facilitate the sale and management of equipment. Built with modern web technologies including Firebase, TypeScript, React.js, and MUI, this project showcases a custom Content Management System (CMS), a shopping cart feature, and robust user authentication.

## Key Features
- **Custom CMS**: Manage your equipment listings with ease. Add, remove, or alter items on sale through an intuitive interface.
- **Shopping Cart**: A fully functional shopping cart that allows customers to browse, select, and purchase equipment.
- **User Authentication**: Secure user login and registration powered by Firebase Authentication.
- **Real-time Data Management**: Utilize Firebase Firestore for seamless and real-time data handling.
- **Responsive Design**: Ensure a smooth user experience across various devices with a responsive layout using MUI.

## Technologies Used
- **Firebase**: For database management and user authentication.
- **TypeScript**: To add type safety and improve code maintainability.
- **React.js**: For building a dynamic and responsive user interface.
- **MUI**: To create a modern and accessible design.

## Getting Started
To get started with this project, clone the repository and follow the instructions below.

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/equipment-sales-website.git
    ```
2. Navigate to the project directory:
    ```sh
    cd equipment-sales-website
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file and add your Firebase configuration:
    ```
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

### Running the Project
To start the development server, run:
```sh
npm start
```

Visit `http://localhost:3000` to view the app in your browser.

## Contributions
Contributions are welcome! Please feel free to submit a Pull Request or open an Issue if you have any suggestions or improvements.

## License
This project is licensed under the MIT License.
