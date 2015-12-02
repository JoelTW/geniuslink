# GeniusLink
MindTouch GeniusLink is an integration SDK for MindTouch customer success sites. Integrate your MindTouch site's content, search, and usage data into your CRM, websites, and more!

## Usage

NOTE: The MindTouch API currently does not allow authenticated requests over CORS (Cross-Origin Resource Sharing). As a result, all requests will be in the context of an anonymous site visitor.

### GeniusLink.init({String} host)
Sets up the GeniusLink integration environment.

**host** {String} - A MindTouch site homepage url or hostname (e.g. `example.mindtouch.us`, `https://example.mindtouch.us`). Please note that HTTPS url's cannot be used on on non-HTTP origins. The system or website utilizing GeniusLink must be HTTPS for an HTTPS connection to a MindTouch site.

### GeniusLink.search({String} query, {Object} options)
The interface to search for help articles from a MindTouch site. Returns a promised object for asynchronous JavaScript programming.

**query** {String} - the terms or advanced query syntax

**options** {Object}
* **page** {Number} - paginate page number (default = 1)
* **limit** {Number} - limit search results to x items per paginated page (default = 10)
* **tags** {String} - Tags by which to filter the results in a comma delimited list (default = '')
* **path** {String} - A specific hierarchy path to filter by (default = '')

**Returns {Promise\<Object\>}**
```
{
    count: "10"
    queryCount: "15"
    queryId: "..."
    ranking: "..."
    recommendationCount: "0"
    result: [
    {
        author: "..."
        content: "..."
        dateModified: Date
        id: "..."
        mime: "..."
        page: {}
        rank: "..."
        title: "..."
        uri: "..."
        uriTrack: "..."
    },
    { ... }
    ]
}
```

**Sample**
```javascript
GeniusLink.init('https://success.example.com');
GeniusLink.search('example search query').then(response) {

    // get the search result count...
    return response.result;
}).then(results) {

    // do something with the search results...
    results.forEach({ ... });
});
```

### GeniusLink.user.getCurrentUser()
Gets the MindTouch site user that GeniusLink requests will be performed as. NOTE: The MindTouch API currently does not allow authenticated requests over CORS (Cross-Origin Resource Sharing). As a result, all requests will be in the context of an anonymous site visitor.

**Returns {Promise\<Object\>}**
```
{
    dateCreated: "..."
    dateLastLogin: "..."
    email: "..."
    fullname: "..."
    href: "..."
    id: ...
    username: "..."
    wikiId: "..."
}
```

**Sample**
```javascript
GeniusLink.init('https://success.example.com');
GeniusLink.user.getCurrentUser().then(response) {

    // get the email address...
    return response.email;
}).then(email) {

    // do something with the email address...
});
```

### GeniusLink.user.getLoginUrl()
Gets the the URL to the MindTouch site primary login experience.

**Returns {String}**
```
${host}/@app/login/redirect
```

**Sample**
```javascript
GeniusLink.init('https://success.example.com');
window.location = GeniusLink.user.getLoginUrl();
```
