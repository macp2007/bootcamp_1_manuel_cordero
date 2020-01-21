import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';

const port = 5000;

/* Global variables */
let listingData, server;

const requestHandler = (request, response) => {
    const parsedUrl = url.parse(request.url);
    //console.log(request); Used to verify status of server (information)
    if( parsedUrl.path == '/listings' && request.method=='GET'){
      response.writeHead(200, {'Content-Type': 'application/json'})
      .end(JSON.stringify(listingData));
      
       // response.write('Testing1!'); 
        //response.write(listingData);
       response.end();
    }
    
    
    //  else if( parsedUrl.path == '/' && request.method == 'GET'){
    //   response.writeHead(200, {'Content-Type': 'application/json'});
    //   response.write('Welcome'); 
    //   response.end();

    //  }
     
    else {
       response.writeHead(404, {'Content-Type': 'text/plain'}).end('Bad gateway error');
       response.end();
    }

   
    /*
      Your request handler should send listingData in the JSON format as a response if a GET request
      is sent to the '/listings' path. Otherwise, it should send a 404 error.

      HINT: Explore the request object and its properties
      HINT: Explore the response object and its properties
      https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
      http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation

      HINT: Explore how callback's work
      http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4

      HINT: Explore the list of MIME Types
      https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

     */
};

fs.readFile('listings.json', 'utf8', (err, data) => {
  
    /*
      This callback function should save the data in the listingData variable,
      then start the server.

      HINT: Check out this resource on fs.readFile
      //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

      HINT: Read up on JSON parsing Node.js
     */

    // Check for errors


    // Save the sate in the listingData variable already defined

    if (err) throw err;
    listingData=JSON.parse(data);

    http.createServer(requestHandler).listen(port, () => {
    //once the server is listening, this callback function is executed
    console.log(`Server listening on: http://127.0.0.1:${port}`);
});
  

});
