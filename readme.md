# Pomodoro To-Do List

WIP - Live Site coming

## Summary

Pomodoro To-Do List is a single page application that allows users to create, update, read, and delete personal to-do items.  In addition, users can allocate a number of Pomodoros for to each to-do item.  Users can start to-do items and will get notified once a Pomodoro is over.

### Languages

* Python
* JavaScript
* HTML
* SASS/CSS

### Frameworks

* Flask - I used Flask as the backend because I tend to prefer the micro-frameworks in general. Flask is very lightweight and every additional piece of functionality you need can be installed via an add-on.  As a result, my app is kept lean and only includes the packages I know I need.
* React and Flux

### Libraries and Technologies

* Node technologies
  + Webpack - The best and easiest way to manage JS dependencies and load stylesheets, html, images, you name it.
  + jQuery - Still the best DOM wrapper out there.
  + ReactRouter - Extremely good routing solution to enable a single page application.

* Python technologies
  + MongoEngine - MongoDB Python wrapper.  While the MongoDB shell isn't very difficult to use and commands can be executed with JavaScript, the wrapper still helped me stick with Python and only Python when working on the backend.  In the end, it was certainly a productivity booster.
  + BCrypt - Relatively well-known and great algorithm for hashing user passwords and even incorporates salt.
  + Flask-WTForms - Great flask add on for providing form validation support.  Very easy to use and provides good support for custom validations.

* DB technologies
  + MongoDB - In general, MongoDB is better to use when you know you aren't going need to do a lot of querying or calculations for deeply nested/joined data.  I also find myself getting more comfortable querying for documents instead of inputting a SQL query.  Because of these reasons and especially knowing that my data requirements weren't going to be very heavy I decided to go with MongoDB.

### App features
- Hand rolled user authentication (up to 5 session support)
- Stores user, to do items, and pomodoros in MongoDB (user credentials hashed with BCrypt)
- Incorporates latest JavaScript ES6 features and syntax
- Webpack used to manage JavaScript module dependencies and to load ES6 and SASS files
- RESTful API for retrieving to-do list items
- CRUD operations for to do items supported

### Product trade-off decisions
- I thought through possible scenarios of what a user would expect when he/she added or removed pomodoros when editing them.  What about the pomodors


### Technical trade-off decisions
- One thing I attempted to implement was adding a status tracker for each pomodoro (ie: "not_started", "in_progress", "complete") that would get updated whenever the user starts, pauses, or resumes a pomodoro. I also wanted to update the remaining time for "in_progress" pomodoros whenever a user pauses the timer and also every minute of elapsed time.  The reason for that is because if internet connection fails, the browser crashes, or the user accidentally closes the browser the remaining time would still be stored so the user wouldn't have to start the pomodoro over.  This implementation proved to be difficult because of how the Pomodoro model was set up.  I didn't feel like it was necessary to have a collection just for Pomodoros and instead chose to embed them in each of the To Do documents they belong to.  The benefit of this was to improve querying/maintainability of the data 

- I looked into more meaningful ways of notifying the user when a pomodoro timer was up.  In the end for ease of implementation and lack of time I went with the Flash message that I use for all notifications since it was simple and working.  I wanted to use a modal, but
