> Tell us about one of your commercial projects with Node.js and/or AngularJS.

One of the last projects with Angular I had was Viven Health demo site. The project goal was to promote company products by an interactive demonstration of various product use cases and scenarios available for the customer to interact with.

As the solution Angular 6 based app was developed. App user had options to navigate app via different scenarios where he had to interact with onscreen objects by moving, rotating and scaling them to achieve demonstration goals in an entertaining way.

The cool technical solution during development was an abstraction of the common screen objects behaviors allowing behaviors e.g. dragging, resizing, etc, to be reused on items and widgets.
Also, the application data was completely handled by firebase which is also can be considered an interesting technical option for an app development.


> Detail how would you persist in data/present a schema to store several versioned text-based documents. It should allow to:
> - save a version representing a document state
> - keep the versions list/document history for browsing
> - browse a previous version and
> - visualize the changes/diff between two versions.
>
> Strive for storage size efficiency.

An obvious solution to the listed requirements seems to be git with its capabilities for persisting documents with their versions and branches, including history navigation and visualization tools. Alternatively, some database with versioning support or custom filesystem-based solution can be applied. Yet in any of those cases, it would require much higher effort to achieve same space and execution efficiency.

If the case is not to use an existing tool but create a nodejs application, there's always an option to wrap git command calls with an app which output is pretty convenient for further parsing and usage or concerning the performance there are available for using native libgit2 bindings for nodejs provided with `nodegit` package that can be firmly used by a nodejs application.


> Implement a simple server with a processing queue in latest Node LTS using Express.js that will provide an endpoint to receive requests for conversions for different file types (which you should consider to have different processing time). The request should be async, so the server will put the request into a queue for processing and acknowledge/respond it was accepted immediately. When it finishes should simple log it's completion on the console. The processing of these requests **should not be concurrent** (single worker) and consider the following two file types and their processing time: html with 1 sec and  pdf with 5 secs. Here's an example of an request sequence and the processing order we would expect (note how certain html requests were preempted because they take a fifth of a pdf time, optimizing processed files availability):
>
> ```
> // Requests
> 'pdf #1', 'pdf #2', 'html #3', 'html #4', 'html #5', 'html #6', 'html #7', 'html #8', 'pdf #9', 'html #10'
>
> // Processing order
> 'pdf #1', 'html #3', 'html #4', 'html #5', 'html #6', 'html #7','pdf #2', 'html #8', 'html #10', 'pdf #9'
> ```

[x] express 4 app on node v8.11.1 use `npm start` after `npm install` to run it on port 8000 (update config for different port)
[x] endpoint to put file into processing queue: `POST /queue` - accepts json with file name, e.g.: `{"name":"filename.pdf"}`
[ ] file processing - not implemented as doesn't seem to be a part of the requirements but can be added to related handlers located at `src/api/services/handlers`
[x] 1 sec processing for html and 5 secs for pdf
[x] smart processing order: there's no strict requirements here only example which doesn't uncover full logic. So here I had to go with assumptions that I'll list below.

First of all you can test your scenario with following request:
```sh
for data in \
'{"name": "file-01.pdf"}' \
'{"name": "file-02.pdf"}' \
'{"name": "file-03.html"}' \
'{"name": "file-04.html"}' \
'{"name": "file-05.html"}' \
'{"name": "file-06.html"}' \
'{"name": "file-07.html"}' \
'{"name": "file-08.html"}' \
'{"name": "file-09.pdf"}' \
'{"name": "file-10.html"}'
do
curl -X POST -H 'Content-Type: application/json' 127.0.0.1:8000/queue -d "$data"
echo
done
```

That will send ten requests with file types ordered as in your example. And from the server console output, you'll be able to see processing order.

Now regarding my assumptions - it was that processing request submitted near the same time and the logic had to cover the processing order of this complete queue.
The first submitted item get processed first which is pretty straightforward. But the second pdf according to example should be processed only after five html-jobs that are further in the queue. That ended me with following queue conditions:
* item in queue skips forward other items that require less time to process than he is but not more items that have summary processing time more than the item processing time
* item cannot skip forward in queue another item with the same processing time
