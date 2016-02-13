# Pomodoro To-Do List

[Live Site][live]

[live]: http://pomodoro-to-do.herokuapp.com/

## Summary

Pomodoro To-Do List is a single page application that allows users to create, update, read, and delete personal to-do items.  In addition, users can allocate a number of Pomodoros for to each to-do item.  Users can start to-do items and will get notified once a Pomodoro is over.

### Languages

* Python
* JavaScript
* HTML
* SASS/CSS

### Frameworks

* Flask
* React and Flux

### Libraries and Technologies

* Node technologies
  + Webpack
  + jQuery
  + ReactRouter

* Python technologies
  + MongoEngine
  + BCrypt
  + Flask-WTForms

* DB technologies
  + MongoDB

### App features
- Hand rolled user authentication (up to 5 session supported)
- Stores user, to do items, and pomodoros in MongoDB (user credentials hashed with BCrypt)
- Incorporates latest JavaScript ES6 features and syntax
- Webpack used to manage JavaScript module dependencies and to load ES6 and SASS files
- RESTful API for retrieving to-do list items
- CRUD operations for to do items supported
- Styling is done with responsiveness in mind (using %'s, vh, vw, etc.)

### Product trade-off decisions

- When each timer is over, the next timer doesn't start automatically.  Right now, the user has freedom to start, pause, and skip timers as desired.  I thought about implementing a feature where the timers start automatically after one timer ends (ie: pomodoro timer finished, break timer starts).  However, this would take some time and the product needs to get shipped!  Therefore I left it out (this is added to future developments section)

- I spent some time getting multiple session support working correctly.  This was a time trade-off since I knew this wasn't a requirement, but I decided to spend time implementing it because I believe proper session management is very important.  It's better for users to be able to log in with multiple sessions rather than just one. Number of sessions per user is limited to 5.

### Technical trade-off decisions

- I chose to use MongoDB over an RDB because I initially didn't think I'd be doing anything complicated with the data (proved to be slightly wrong here... see next bullet).  MongoDB and NoSQL in general is great for simplified data sets whereas SQL databases are good if there are complicated data requirements for reporting, analytics, etc.  

- One thing I attempted to implement was adding a status tracker for each pomodoro (ie: "not_started", "in_progress", "complete") that would get updated whenever the user starts, pauses, or resumes a pomodoro. I also wanted to update the remaining time for "in_progress" pomodoros whenever a user pauses the timer and also every minute of elapsed time.  The reason for that is because if internet connection fails, the browser crashes, or the user accidentally closes the browser the remaining time would still be stored so the user wouldn't have to start the pomodoro over.  This implementation proved to be difficult because of how the Pomodoro model was set up in MongoDB.  I didn't feel like it was necessary to have a collection just for Pomodoros and instead chose to embed them in each of the To Do documents they belong to.  The benefit of this was to improve the simplicity of the data and because deleting a to do item would also delete the pomodoros.  However, the trade off was making it difficult to do what I originally wanted to do.  While I do believe this can be done, given time constraints I chose not to implement this.

- I looked into more meaningful ways of notifying the user when a pomodoro timer was up.  In the end for ease of implementation and lack of time I went with the Flash message that I use for all notifications since it was simple and working.  I wanted to use a modal, but didn't have the time to implement it.

### Future developments
- Secure the API with auth token / API token
- Add feature to auto start the pomodoros and break timers
- Implement status tracking for the pomodoros to track remaining time left
- Use modal or another feature to notify user
- Add avatar pictures to user profile
- Make it even more responsive (mobile, ipad, smaller screens) w/ media queries
