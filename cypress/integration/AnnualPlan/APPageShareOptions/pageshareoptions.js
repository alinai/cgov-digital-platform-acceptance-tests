/// <reference types="Cypress" />

import { And, Then } from "cypress-cucumber-preprocessor/steps";

Then('the page options should appear in a fixed position to the right of the main content area', () => {
    cy.get('#PageOptionsControl1').should('have.attr', 'class').and('not.include', 'bottom-options');
});


And('the following page options are displayed', dataTable => {
    for (const { pageOption } of dataTable.hashes()) {
        cy.document().then(doc => {
            if (doc.documentElement.clientWidth < 768) {
                cy.get(`.mobile-page-options #PageOptionsControl1 a[title='${pageOption}']`).should('be.visible');
            } else {
                cy.get(`#PageOptionsControl1 a[title='${pageOption}']`).should('be.visible');
            }
        })
    }
});

Then('the page options should appear under the bottom of the content area', () => {
    cy.get('.mobile-page-options #PageOptionsControl1').should("have.attr", "class").and('include','bottom');

});



And('{string} option is not displayed', (printOption) => {
    cy.get('.mobile-page-options li.page-options--print').find(`a[title='${printOption}']`).should('not.be.visible');

});

And('the page options will have a header {string}', (shareText) => {
    cy.get('.mobile-page-options').find('p').should('have.text', shareText);

});

When('user clicks on a page option {string} link', (option) => {

    if (option === 'Print') {
        cy.window().then(win => {
            //stubbing the print window to prevent the call to open it, 
            //but still triggering the click event
            const printStub = cy.stub(win, 'print')
            cy.get(`div.page-options-container a[title='${option}']:visible`).click({ force: true });

        })
    } else {
        cy.get(`div.page-options-container a[title='${option}']:visible`).then(option$ => {
            option$.on('click', e => {
                e.preventDefault();
            });
        }).click({ force: true });
    }
});