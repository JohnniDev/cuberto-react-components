## Installation

**Using NPM:**

Since this Plugin is not officially published yet please follow below steps for local testing.


**Note:**

Run the library and the project in different terminals


**Short:**

```
npm run setup
npm start

cd ./example
npm start
```


**Full:**

1. Install Node Modules for web pack dependencies.
    ```
    npm install
    ```
    
2. In the root of your NPM package, do this to build.
    ```
    npm run build
    ```

3.  Install the Package into local node_modules.
    ```
    npm install . -g
    ```
4. Create a symlink package that points to your working directory.
    ```
    npm link
    ```
    
5. Local NPM Package installation. Use this command in relevant React project directory. This will link global node_module plugin directory to project's local node_modules directory.
    ```
    npm link cuberto-react-components
    ```
    
6. Run library watch mode.
    ```
    npm start
    ```
    
7. Go to the project, install the dependencies
    ```
    cd ./example && npm install
    ```
    
7. Run project dev server.
    ```
    npm start
    ```