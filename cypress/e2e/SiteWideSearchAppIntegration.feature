Feature: Site Wide Search app is integrated within CGOV platform

    Scenario:  Site Wide Search results display with Definition and Best Bet on English site.
        Given user is navigating to "/search/results?swKeyword=mantle+cell+lymphoma"
        And screen breakpoint is set to "desktop"
        Then the system returns the results page for "mantle cell lymphoma"
        And the "H1" title is "NCI Search Results"
        And the "H3" title is "Results for: mantle cell lymphoma"
        And the best bet box is displayed
        And the "H2" title is "Best Bets for Mantle Cell Lymphoma"
        And the best bets title is a link
        And the dictionary definition box is displayed
        And the "More information on dictionary page" button is displayed within the dictionary definition
        Then the "Show full definition" button within the dictionary definition is displayed
        And the "H4" title is "Results XXXXX-XXXXX of XXXXX for: mantle cell lymphoma"
        And the results are displayed with each title containing a link
        And the system defaults to '20' results per page
        Then the drop down box to show results per page is displayed

    Scenario:  Site Wide Search results display with Definition box on Spanish site.
        Given user is navigating to "/espanol/buscar/resultados?swKeyword=cancer"
        And screen breakpoint is set to "tablet"
        Then the system returns the results page for "cancer"
        And the "H1" title is "Resultados"
        And the "H3" title is "Resultados para: cancer"
        And the dictionary definition box is displayed
        And the "H2" title is "Definición:"
        And the "Más información" button is displayed within the dictionary definition
        And the "Mostrar toda la definición" button within the dictionary definition is displayed
        And the "H4" title is "Resultados XXXXX-XXXXX de XXXXX para: cancer"
        And the results are displayed with each title containing a link

    Scenario:  Site Wide Search results display with Best Bet box at mobile breakpoint on English site.
        Given user is navigating to "/search/results?swKeyword=pact"
        And screen breakpoint is set to "mobile"
        Then the system returns the results page for "pact"
        And the "H1" title is "NCI Search Results"
        And the "H3" title is "Results for: pact"
        And the best bet box is displayed
        And the "H2" title is "Best Bets for Partnership for Accelerating Cancer Therapies (PACT)"
        And the best bets title is a link
        And the "H4" title is "Results XXXXX-XXXXX of XXXXX for: pact"
        And the results are displayed with each title containing a link

    Scenario: Negative test:  No search results page
        Given user is navigating to "/search/results?swKeyword=waowao"
        And screen breakpoint is set to "desktop"
        And the "H1" title is "NCI Search Results"
        And the "H3" title is "0 results found for: waowao"
        Then the "H3" text is "Please check your spelling or try another search using a different word."

    Scenario Outline: Edge case: search results with 2/3 and bin on English Desktop and Spanish mobile sites.
        Given user is navigating to "<url>"
        And screen breakpoint is set to "<breakpoint>"
        And the "<titleTag>" title is "<title>"
        And the results are displayed with each title containing a link

        Examples:
            | breakpoint | url                                      | titleTag | title                |
            | desktop    | /search/results?swKeyword=bin            | H3       | Results for: bin     |
            | mobile     | /espanol/buscar/resultados?swKeyword=2/3 | H3       | Resultados para: 2/3 |

    # Scenario: Edge case: Fetching more than 30000 results on English site.
    #     Given user is navigating to "/search/results?swKeyword=cancer"
    #     And the user clicks the last page link in the pager
    #     And screen breakpoint is set to "desktop"
    #     Then the system returns the results page for "cancer"
    #     And the "H1" title is "NCI Search Results"
    #     And the "H3" title is "Results for: cancer"
    #     And the "H4" title is "Results XXXXX-XXXXX of XXXXX for: cancer"
    #     And the results are displayed with each title containing a link

    Scenario: Edge case:Display less than 20 results does not show the pager.
        Given user is navigating to "/search/results?swKeyword=retch"
        And screen breakpoint is set to "desktop"
        Then the system returns the results page for "retch"
        And the "H1" title is "NCI Search Results"
        And the "H3" title is "Results for: retch"
        And the dictionary definition box is displayed
        And the "H2" title is "Definition:"
        Then the "Show full definition" button within the dictionary definition is displayed
        And the "H4" title is "Results XXXXX-XXXXX of XXXXX for: retch"
        And the results are displayed with each title containing a link

    #################### Site Wide Search Analytics#####################

    Scenario: Click Events for Best Bets title link
        Given user is navigating to "/search/results?swKeyword=tumor"
        When user is clicking on a BestBets title link at position 1
        And page click request is sent
        Then the following parameters should be captured
            | parameter | value                                                   |
            | prop4     | D=pev1                                                  |
            | prop8     | english                                                 |
            | prop12    | best_bets                                               |
            | prop13    | 1                                                       |
            | prop67    | D=pageName                                              |
            | evar2     | D=c8                                                    |
            | evar12    | D=c12                                                   |
            | link      | What Is Cancer?                                         |
            | pageURL   | {PROTOCOL}://{CANONICAL_HOST}/search/results?swKeyword=tumor |
            | pageName  | {CANONICAL_HOST}/search/results                         |


    Scenario: Click Events for More Information glossary term link
        Given user is navigating to "/search/results?swKeyword=tumor"
        When user is clicking on a glossary term link "More information on dictionary page"
        And page click request is sent
        Then the following parameters should be captured
            | parameter | value                                                   |
            | prop4     | D=pev1                                                  |
            | prop8     | english                                                 |
            | prop45    | Glossified Term                                         |
            | prop50    | tumor                                                   |
            | prop67    | D=pageName                                              |
            | evar2     | D=c8                                                    |
            | link      | More information on dictionary page                     |
            | pageURL   | {PROTOCOL}://{CANONICAL_HOST}/search/results?swKeyword=tumor |
            | pageName  | {CANONICAL_HOST}/search/results                         |

    Scenario: Click Events for result link
        Given user is navigating to "/search/results?swKeyword=tumor"
        When user is clicking on a search result item at position 2
        And page click request is sent
        Then the following parameters should be captured
            | parameter | value                                                   |
            | prop4     | D=pev1                                                  |
            | prop8     | english                                                 |
            | prop12    | generic                                                 |
            | prop13    | 2                                                       |
            | prop67    | D=pageName                                              |
            | pageURL   | {PROTOCOL}://{CANONICAL_HOST}/search/results?swKeyword=tumor |
            | pageName  | {CANONICAL_HOST}/search/results                         |


    Scenario: Click Events for site search box when user selects a term from dropdown
        Given user is navigating to "/"
        When user types "can" in the site search box
        And browser waits for 500
        And user selects "breast cancer" from the autosuggest dropdown
        And browser waits for 500
        And user clicks Search button
        Then page click request is sent right before page unload
        And the following parameters should be captured
            | parameter | value                                  |
            | prop11    | D=v11                                  |
            | prop14    | D=v14                                  |
            | prop23    | D=v23                                  |
            | prop68    | D=v68                                  |
            | evar11    | SitewideSearch                         |
            | evar13    | +1                                     |
            | evar14    | breast cancer                          |
            | evar23    | Selected\|10\|1\|3\|can\|breast cancer |
            | evar68    | Header                                 |
            | event2    |                                        |
            | pageURL   | {PROTOCOL}://{CANONICAL_HOST}/              |
            | pageName  | {CANONICAL_HOST}/                      |
            | link      | Search                                 |
            | pev2      | HeaderSearch:Submit                    |

    Scenario: Click Events for site search box when user doesn't select a term from dropdown
        Given user is navigating to "/"
        When user types "cancer" in the site search box
        And browser waits for 500
        And user clicks Search button
        Then page click request is sent right before page unload
        And the following parameters should be captured
            | parameter | value                                 |
            | prop11    | D=v11                                 |
            | prop14    | D=v14                                 |
            | prop23    | D=v23                                 |
            | prop68    | D=v68                                 |
            | evar11    | SitewideSearch                        |
            | evar13    | +1                                    |
            | evar14    | cancer                                |
            | evar23    | Offered\|10\|null\|null\|null\|cancer |
            | evar68    | Header                                |
            | event2    |                                       |
            | pageURL   | {PROTOCOL}://{CANONICAL_HOST}/             |
            | pageName  | {CANONICAL_HOST}/                     |
            | link      | Search                                |
            | pev2      | HeaderSearch:Submit                   |

    Scenario: Click Events for site search box when there is no suggestion
        Given user is navigating to "/"
        When user types "chickensoup" in the site search box
        And browser waits for 500
        And user clicks Search button
        Then page click request is sent right before page unload
        And the following parameters should be captured
            | parameter | value                                  |
            | prop11    | D=v11                                  |
            | prop14    | D=v14                                  |
            | prop23    | D=v23                                  |
            | prop68    | D=v68                                  |
            | evar11    | SitewideSearch                         |
            | evar13    | +1                                     |
            | evar14    | chickensoup                            |
            | evar23    | None\|0\|null\|null\|null\|chickensoup |
            | evar68    | Header                                 |
            | event2    |                                        |
            | pageURL   | {PROTOCOL}://{CANONICAL_HOST}/              |
            | pageName  | {CANONICAL_HOST}/                      |
            | link      | Search                                 |
            | pev2      | HeaderSearch:Submit                    |

