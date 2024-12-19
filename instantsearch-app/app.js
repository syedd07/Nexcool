/** @jsx h */
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { h } from 'preact';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch('HV7B11GGVN', '73e8a869d61667584cee5a2b79659fed');

autocomplete({
  container: '#autocomplete',
  placeholder: '',
  debug: true,
  getSources({ query }) {
    return [
      {
        sourceId: 'items',
        getItems() {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'instant_search',
                query,
              },
            ],
          });
        },
        templates: {
          item({ item, components }) {
            return (
              <div className="aa-ItemWrapper">
                <div className="aa-ItemContent">
                  <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                      <components.Highlight
                        hit={item}
                        attribute=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          },
          noResults() {
            return 'No matching items.';
          },
        },
      },
    ];
  },
});
