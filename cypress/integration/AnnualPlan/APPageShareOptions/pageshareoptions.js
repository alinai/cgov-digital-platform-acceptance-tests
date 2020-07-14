/// <reference types="Cypress" />

import { Given, And, Then } from "cypress-cucumber-preprocessor/steps";


Then('the page options should appear in a fixed position to the right of the main content area', () => {
    cy.get("#PageOptionsControl1").should("have.attr", "class", "page-options no-resize large-5 columns");

});

And('the following page options are displayed', dataTable => {
    cy.document().then((doc) => {
        const pageOption = doc.querySelectorAll('#PageOptionsControl1');
        for (const { pageOption } of dataTable.hashes()) {
            cy.get(`#PageOptionsControl1 a[title='${pageOption}']`).should('be.visible');
        }

    });

});

Then('the page options should appear under the bottom of the content area', () => {
    cy.get(".mobile-page-options #PageOptionsControl1").should("have.attr", "class", "page-options no-resize bottom-options large-5 columns");

});

And('{string} option is not displayed', (printOption) => {
cy.get('.mobile-page-options li.page-options--print').find('a[title="Print"]').should('not.be.visible');

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