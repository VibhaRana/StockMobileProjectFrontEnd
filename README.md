# StockMobileFrontEnd

A mobile application built using React Native and [react-navigation](https://github.com/react-navigation/react-navigation)

## Features

- Login/Logout Screen
- Authentication 
- Register Screen
- Search Screen
- Stock Detail Screen
- Watchlist Screen
- Portfolio Screen
- Purchase and Sell Stocks
- Generate Chart of your daily portfolio performance

## Requirements

- NodeJS
- Expo

## Setup instructions

### 1. Install dependencies

```
git clone https://github.com/xdc811/StockMobileFrontEnd
cd StockMobileFrontEnd
npm install
```

### 2. Find your local IPv4 address

Get your IPv4 address of your local computer.

```
ipconfig
```
```
IPv4 Address. . . . . . . . . . . :###.###.#.#:5000
```
### 3. Insert your IPv4 address into the project

Open your project, go to auth/AuthAPIClass.js and insert your IPv4 address into the baseURL following with ':5000' for port 5000

```
var instance = axios.create({
    baseURL: 'http://###.###.#.#:5000/'
});
```

### 4. Start your app

```
npm start
```

Follow the instructions from the terminal to preview the app on your phone or using an emulator.

### 5.Addtional Information

-sample account
-username:a@a.com
-password:P@ssw0rd!
