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
