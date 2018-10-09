<h2>
Sample project for Return Path
</h2>
<div>
  <h3>Running the application</h3>
  <ol>
    <li>Fork the repo locally</li>
    <li>Open a terminal window and cd to the `email-api` folder</li>
    <li>Run the command `composer start`</li>
    <li>Open a second terminal window and cd to the `email-portal` folder</li>
    <li>Run the command `npm start`</li>
    <li>The UI will open in localhost:3000</li>
  </ol>
</div>
<div>
  <h3>Notes</h3>
  <ul>
    <li>There is a Docker Compose file in the application root that I'm still working on. I'd like to try to finish it before Thursday.</li>
    <li>I had a CORS issue in trying to call the API, which I resolved by installing the CORS plugin in Chrome. This, of course is not ideal. I tried to find a way to configure my Slim router to allow cross-domain connections, rather than set it in my local Apache server, so that this setting would follow the application, rather than depend on the local server.</li>
    <li>I had written the app for the happy path prior to working on the Docker part of the exercise. I will work on error handling before Wednesday, Oct 10.</li>
  </ul>
  </div>
