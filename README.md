# Disney Explorer App

A React Native mobile application that allows users to explore Disney characters using the [Disney API](https://disneyapi.dev), with search functionality and analytics reporting.


## Features

✨ **Core Features:**
- Splash screen with Disney logo
- User name entry (stored locally)
- Welcome screen with random Disney character
- Character search functionality
- Detailed character information
- Search analytics reports
- Search history by character and user
- Bottom navigation footer

🎁 **Bonus Features:**
- Animated transitions between screens
- Debounced search input
- Clean component architecture
- Responsive UI design

## Tech Stack

🛠 **Technologies Used:**
- **Frontend:** React Native
- **Navigation:** React Navigation
- **State Management:** Context API
- **API Client:** Axios
- **Local Database:** AsyncStorage
- **Charts:** react-native-chart-kit
- **Date Handling:** date-fns
- **Styling:** Custom StyleSheet
- **Animation:** react-native-animatable


### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-news-aggregator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```


### Running the App

#### Android
```bash
npx react-native run-android
```

#### iOS
```bash
npx react-native run-ios
```

## 🏗️ Project Structure

```
/src
├── /assets            # Images, fonts, etc.
├── /components        # Reusable components
│   ├── Footer.js      # Navigation footer
│   └── ...
├── /context           # Global state management
│   └── AppContext.js
├── /screens           # Application screens
│   ├── SplashScreen.js
│   ├── WelcomeScreen.js
│   ├── SearchScreen.js
│   └── ...
├── /services          # API and database services
│   ├── api.js
└── App.js             # Main application entry
```



