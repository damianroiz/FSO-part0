# fso-part0
Full Stack Open exercises from Part 0 of the curriculum

## 0.4: New note diagram 

```mermaid
sequenceDiagram
    
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Note left of Server: 302 FOUND 
    Note right of Server: server content is updated<br/>with new note
    Note left of Browser: server content in retrieved<br/>to client with new note
    Server->>Browser: GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate Server
    Note right of Browser: 200 OK
  
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server->>Browser: css file
    deactivate Server   
    Note right of Browser: 304 Not Modified

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server->>Browser: js file
    deactivate Server   
    Note right of Browser: 304 Not Modified

    Note left of Browser: main.js is executed at the browser 
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server->>Browser: json file
    deactivate Server   
    Note right of Browser: 200 OK
    Note left of Browser: list of notes returned as json data

    Browser->>Server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate Server
    Server->>Browser: image
    deactivate Server   
    Note right of Browser: 200 OK

```

## 0.5: Single page app diagram

```mermaid 
sequenceDiagram
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Note left of Server: 304 NOT MODIFIED 
    deactivate Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Note left of Server: 304 NOT MODIFIED
    deactivate Server 
    Browser->>Server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate Server
    Note left of Server: 200 OK
    deactivate Server
```

## 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Note left of Server: 201 CREATED 
    Note right of Server: server content is updated<br/>with json data
    deactivate Server
    Note left of Browser: browser rerenders the same page<br/>including new note
```

### Reference
*[GET - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)*
*[POST - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)*
*[200 OK - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)*
*[201 Created - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201)*
*[304 Not Modified - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)*

