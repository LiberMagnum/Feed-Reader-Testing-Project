/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //checks that the url of each item in allFeeds is defined
         it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         //checks that the name of each item in allFeeds is defined
         it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });

    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    describe('The menu', function() {
        //checks that the menu is hidden by default
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //checks that the menu changes visibility when clicked
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function() {
        //loads the feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        //checks that the feed has at least one .entry element
        it('contains at least one .entry element', function(done) {
            expect($('.feed').has('.entry').length).not.toBe(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

    describe('New Feed Selection', function() {
        var afterContents,
            beforeContents,
            firstDone,
            secondDone;

        //loads the first feed and saves its contents to a variable
        //before anything else is done 
        beforeAll(function(done) {
            loadFeed(0, function() {
                done();
            });

            beforeContents = $('article:first-child').text();
            done();
        });

        //loads the second feed before each test is run
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });
        });

        //checks that the second feed loaded is not the same as the first feed
        it('changes when a new feed is loaded', function(done) {
            afterContents = $('article:first-child').text();
            expect(beforeContents).not.toBe(afterContents);
            done();
        });
    });
}());
