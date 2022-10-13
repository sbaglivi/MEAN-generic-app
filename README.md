# Mean-app
![website main page](https://github.com/sbaglivi/mean_app/blob/master/assets/images/website_ss.png?raw=true)
<hr/>
Learning project made using NodeJS, Express and MongoDB to serve server rendered pages with EJS as the template engine.
The website also uses Bootstrap for styling.

It implements authentication (through passport.js), a REST API and crud functionalities both for the 'item' listings and for comments on the individual item pages.

Most of the material is a slight variation of the one created in the course "The Web Developer Bootcamp" on Udemy by Colt Steele.

## To try it out you need to:
- clone the repository `git clone https://github.com/sbaglivi/mean_app`
- cd into it and install dependencies `cd mean_app && npm i`
- provide a mongodb connection string: `app.js` expects a CONNECTION_STRING environment variable that can point either to a local mongodb instance or to a   mongodb server. You can also just modify line the `mongoose.connect(...)` line and just copy paste the connection string if you prefer. [More info](https://mongoosejs.com/docs/connections.html)
- finally run `node app.js` and (unless you specified a different port in a PORT environment variable) the website will be waiting for you at `localhost:3000`.
