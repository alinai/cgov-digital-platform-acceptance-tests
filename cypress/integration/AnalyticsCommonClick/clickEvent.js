/// <reference types="Cypress" />

import { Then } from "cypress-cucumber-preprocessor/steps";



Then('user is clicking on a button', () => {    
    // cy.server({
    //     onRequest: (xhr) => {
    //         console.log(xhr);
    //     }
    // });
    // cy.route({
    //     method: 'GET',
    //     url: 'https://nci.122.2o7.net/**',
    //     status: 200,
    //     onRequest: (xhr) => {
    //         console.log(xhr);
    //     }
    // }).as('analyticsClick');

    //cy.fixture('https://nci.122.2o7.net/**', 'binary').then((dunno) => {
    //    console.log(dunno);
    //})

    // Make the browser desktop viewport so left nav shows.
    // Do this BEFORE tracking analytics call since it also
    // makes a call.
    cy.viewport(1025, 600);

    // Now wait for the resize to finish and the analytics call to
    // be made. This is really because I am lazy...
    cy.wait(500);

    cy.document().then($document => {

        // Prevent default browser behavior.
        $document.addEventListener('click', (e) => { e.preventDefault(); return false; })

        // Listen for a dom insertion
        $document.addEventListener('analyticsCall', (e) => {
            // Do the assertion here!!!
            const url = e.detail;
        });
    })

    // Click the left nav to trigger the event, which the above eventListener
    // will listen for.
    cy.get('#nvcgSlSectionNav a[href="/about-cancer/coping/feelings/relaxation"]').click();

});

Then('the common click event properties are captured', () => {

    // Cypress.on('window:before:unload', (win) => {

    //     console.log('unload');
    //     console.log(win);
    //     var entries = win.performance.getEntries().map(r => r.name);
    //     console.log(win);
    // })

    // cy.window().then((win) => {

    //        var urlList = new Array();
    //     var entries = win.performance.getEntries().map(r => r.name);
    //     // console.log(entries)
    //    for(var i=0; i<entries.length; i++){
    //       var temp = entries[i].toString()
    //     if(temp.includes("nci.122.2o7.net")){
    //         urlList.push(entries[i]);
    //      }
    //     }
    //     var url = new URL(urlList[urlList.length-1]);
    //    var urlParams = new URLSearchParams(url.search);
    //    console.log(urlParams.get('pe'))


    //    })
});




function isClickTypeEvent(a) {
    var urlParams = new URLSearchParams(a.search);
    if (urlParams.get('pe') === null && urlParams.get('pev2') === null) {
        return false;
    } else if (urlParams.get('pe') === 'lnk_o') {
        return true;
    } else {
        return false;
    }
}
