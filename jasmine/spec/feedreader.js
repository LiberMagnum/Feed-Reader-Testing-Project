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


         //checks that the url of each item in allFeeds is defined
         it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
         });

         //checks that the name of each item in allFeeds is defined
         it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
         });
    });


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


    describe('Initial Entries', function() {
        //loads the feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        //checks that the feed has at least one .entry element
        it('contains at least one .entry element', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });


    describe('New Feed Selection', function() {
        var afterContents,
            beforeContents;

        //loads two different feeds and saves their contents
        beforeEach(function(done) {
            loadFeed(0, function() {
                beforeContents = $('.feed article:first-child').text();

                loadFeed(1, function() {
                    afterContents = $('.feed article:first-child').text();
                    done();
                }); 
            });
        });


        //checks that the second feed loaded is not the same as the first feed
        it('changes when a new feed is loaded', function(done) {
            expect(beforeContents).not.toBe(afterContents);
            done();
        });
    });
}());
