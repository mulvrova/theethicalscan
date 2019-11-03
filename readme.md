# The Ethical Scan

## Architectural Remarks
The Ethical scan runs as a an App on iOS as well as Android using React Native (see App subfolder). The App itself requests data from a microservice that is implemented as a PHP script (see PHP subfolder). The data are regulary provided with a Jupyter Notebook we provide in JupyterNotebooks subfolder.

## Requirements
*Frontend*

The frontend is based on React Native. For it to work you need at least NodeJS v10.0 and NPM v6.12.

*Backend*

For the backend you need at least PHP v7.0 (no special requirements) and Python v3.6 with Jupyter Notebooks, Pandas and NumPY available.


## Installation
1. Clone the repository

```
git clone https://github.com/rahelp/theethicalscan
```

2. Change directory
```
cd App
```

3. Install react-native packages
```
npm install
```

4. Run The App in Expo mode
```
npm start
```