/// <reference types="Cypress" />

import { Then } from "cypress-cucumber-preprocessor/steps";

Then('user is clicking on a button', () => {

    cy.document().then(($document) => {
        $document.addEventListener('click', () => {
            window.setTimeout(()=>{

            
            let urlList = new Array();
            const entries = window.performance.getEntries().map(r => r.name);;

            for (let i = 0; i < entries.length; i++) {
                let temp = entries[i].toString();
                console.log(temp)
                if (temp.includes("nci.122.2o7.net")) {

                    urlList.push(entries[i]);
                }
            }
            if (urlList.length > 0) {
                console.log(urlList);
            }
            // const url = new URL(urlList[urlList.length - 1]);
            // const urlParams = new URLSearchParams(url.search);
            // console.log(urlParams)


        },1000);
            return false;
        });
    })
    cy.get('.on-this-page > ul > :nth-child(1) > a').click();


    // cy.get('.on-this-page > ul > :nth-child(1) > a').should(($link) => {
    //     $link.on('click', () => {
    //         let urlList = new Array();
    //         const entries = window.performance.getEntries().map(r => r.name);;

    //         for (let i = 0; i < entries.length; i++) {
    //             let temp = entries[i].toString();
    //             console.log(temp)
    //             if (temp.includes("nci.122.2o7.net")) {

    //                 urlList.push(entries[i]);
    //             }
    //         }
    //         if(urlList.length>0){
    //             console.log(urlList);
    //         }
    //        // const url = new URL(urlList[urlList.length - 1]);
    //         // const urlParams = new URLSearchParams(url.search);
    //         // console.log(urlParams)


    //         return false;
    //     });
    // })
    // cy.get('.on-this-page > ul > :nth-child(1) > a').click();
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
