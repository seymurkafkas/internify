import * as React from "react";

import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";

/** Top 100 elems as rated by IMDb users. http://www.imdb.com/chart/top */
export const TopRequirements: string[] = ["Python", "Javascript", "Golang", "Ruby"];

export const renderElem: ItemRenderer<string> = (elem, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = elem;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={elem}
      key={elem}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  );
};

export const renderCreateElemOption = (
  query: string,
  active: boolean,
  handleClick: React.MouseEventHandler<HTMLElement>
) => (
  <MenuItem icon="add" text={`Create "${query}"`} active={active} onClick={handleClick} shouldDismissPopover={false} />
);

export const filterElem: ItemPredicate<string> = (query, elem, _index, exactMatch) => {
  const normalizedTitle = elem.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${elem}. ${normalizedTitle} ${elem}`.indexOf(normalizedQuery) >= 0;
  }
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export const elemSelectProps = {
  itemPredicate: filterElem,
  itemRenderer: renderElem,
  items: TopRequirements,
};

export function createElem(title: string): string {
  return title;
}

export function areElemsEqual(elemA: string, elemB: string) {
  // Compare only the titles (ignoring case) just for simplicity.
  return elemA.toLowerCase() === elemB.toLowerCase();
}

export function doesElemEqualQuery(elem: string, query: string) {
  return elem.toLowerCase() === query.toLowerCase();
}

export function arrayContainsElem(elems: string[], elemToFind: string): boolean {
  return elems.some((elem: string) => elem === elemToFind);
}

export function addElemToArray(elems: string[], elemToAdd: string) {
  return [...elems, elemToAdd];
}

export function deleteElemFromArray(elems: string[], elemToDelete: string) {
  return elems.filter((elem) => elem !== elemToDelete);
}

export function maybeAddCreatedElemToArrays(
  items: string[],
  createdItems: string[],
  elem: string
): { createdItems: string[]; items: string[] } {
  const isNewlyCreatedItem = !arrayContainsElem(items, elem);
  return {
    createdItems: isNewlyCreatedItem ? addElemToArray(createdItems, elem) : createdItems,
    // Add a created elem to `items` so that the elem can be deselected.
    items: isNewlyCreatedItem ? addElemToArray(items, elem) : items,
  };
}

export function maybeDeleteCreatedElemFromArrays(
  items: string[],
  createdItems: string[],
  elem: string
): { createdItems: string[]; items: string[] } {
  const wasItemCreatedByUser = arrayContainsElem(createdItems, elem);

  // Delete the item if the user manually created it.
  return {
    createdItems: wasItemCreatedByUser ? deleteElemFromArray(createdItems, elem) : createdItems,
    items: wasItemCreatedByUser ? deleteElemFromArray(items, elem) : items,
  };
}
