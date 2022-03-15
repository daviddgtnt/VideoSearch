import React from "react";
import ReactDOM from "react-dom";
import { InstantSearch, SearchBox, Hits, Highlight } from "react-instantsearch-dom";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import "./main.css";

const searchClient = instantMeiliSearch("https://meili.daviddgtntshouse.ml", "pjfEF2Ez5e21f3013b59a7bc7a2a606ab2f7417f234a95fc3a52a3fd7646b9e8110bd2b3", {
  paginationTotalHits: 50
});

const testMode = true;

var index = "videos";

if (testMode) {
  index = "exVids";
}

function TestMode() {
  if (testMode) {
    return (
      <p>(test mode)</p>
    )
  } else {
    return null;
  }
}

function App() {
  return (
    <div className="App">
      <h1>DGTNT Studios VideoSearch</h1><TestMode />
      <InstantSearch
        indexName={index}
        searchClient = {searchClient}
      >
        <SearchBox className="searchbox" />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

function Checkmark(props) {
  if (props.checked) {
    return (
      <a href={props.checked} className="material-icons-round onPlatform">check_box</a>
    )
  } else {
    return (
      <span className="material-icons-round offPlatform">indeterminate_check_box</span>
    )
  }
}

const Hit = ({ hit }) => <>
  <Highlight attribute="name" hit={hit} /><br />
  <span>{hit.channel}</span><br />
  <span>YouTube: </span><Checkmark checked={hit.youtube} /><br />
  <span>Odysee: </span><Checkmark checked={hit.odysee} /><br />
  <span>TikTok: </span><Checkmark checked={hit.tiktok} /><br />
</>;

export default App;