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

- To notify the user after a pomodoro or break timer is up, I display a flash message and play a "ding" sound.  I thought playing the "ding" sound was good enough since it is very hard to miss, but I also decided to display a flash message because it was very easy to implement since it is the same function I use for all of my notifications and it will notify users who are deaf or hard of hearing.  I realize the flash notification positioning can be improved depending what the user is being notified of.  Right now it's positioned a certain % from the top and left of the viewport.  I added this to the future improvements section.  

### Technical trade-off decisions

- I chose to use MongoDB over an RDB because I initially didn't think I'd be doing anything complicated with the data (proved to be slightly wrong here... see next bullet).  MongoDB and NoSQL in general are great for simplified data sets whereas SQL databases are good if there are complicated data requirements for reporting, analytics, etc.  Also, almost all of my planned calculations for pomodoros (number of complete/incomplete/total, pomodoros until long break) all are done in the front end since they were so simple.  

- One thing I attempted to implement was adding a status tracker for each pomodoro (ie: "not_started", "in_progress", "complete") that would get updated whenever the user starts, pauses, or resumes a pomodoro. I also wanted to update the remaining time for "in_progress" pomodoros whenever a user pauses the timer and also every minute of elapsed time.  The reason for that is because if internet connection fails, the browser crashes, or the user accidentally closes the browser the remaining time would still be stored so the user wouldn't have to start the pomodoro over.  This implementation proved to be difficult because of how the Pomodoro model was set up in MongoDB.  I didn't feel like it was necessary to have a collection just for Pomodoros and instead chose to embed them in each of the To Do documents they belong to.  The benefit of this was to improve the simplicity of the data and because deleting a to do item would also delete the pomodoros.  However, the trade off was making it difficult to do what I originally wanted to do.  While I do believe it still can be done with the current set up, given time constraints I chose not to implement this.

- Getting the timer to be very accurate proved tricky.  I calculate elapsed time using system time (new Date()) and get the remaining time by subtracting elapsed time from the start time.  There is some lag with getting state to update in React.  For the timer component, updating state with a new start time takes about 800ms, therefore the first second on the timer is only 200ms.  To account for this I added 800ms to the start time when invoking the setState method.  I realize there is probably a better solution like exploring the React lifecycle methods or even taking a step back and reorganizing my components such that the timer and start time are set at exactly the same time.  However, due to time constraints and for the sake of getting the product out I went with adding 800ms when setting the start time state.

### Future developments
- Improve flash notification positioning for different types of notifications
- Secure the API with auth token / API token
- Implement status tracking for the pomodoros to track remaining time left
- Use modal or another feature to notify user
- Add avatar pictures to user profile
- Make it even more responsive (mobile, ipad, smaller screens) w/ media queries
