import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";

const SuggestionList = React.memo(
  ({ suggestionList, clickSuggestionQuery }) => {
    return (
      <ListGroup className="suggestionList">
        {suggestionList.length > 0 &&
          suggestionList.map((list, i) => (
            <ListGroupItem
              className="suggestionQuery"
              key={i}
              onClick={() => {
                clickSuggestionQuery(list[0]);
              }}
            >
              {list[0]}
            </ListGroupItem>
          ))}
      </ListGroup>
    );
  }
);

SuggestionList.propTypes = {
  suggestionList: PropTypes.array,
};

export default SuggestionList;
