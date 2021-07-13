# Calculator e2e Test Project

This is a project to test your calculator app.

## Running Tests

To run tests, first you need to set your calculator app's url in `cypress.json` file as value of baseUrl key.

Also ensure that your display element in your application has the attribute `data-display`.
This is required to check your results.

Please use x character for multiply button icon.

Then run the following command:

```bash
  yarn
  yarn cypress open
```

This will open the cypress ui. You should select `calculator.spec.js`

It will open a new browser and start running tests for your app. 
You can see results from the opened browser.
  