import * as React from "react";

import {
  Button, //H5,
  Intent,
  ITagProps,
  MenuItem,
  // Switch,
} from "@blueprintjs/core";
import {
  Example,
  //IExampleProps
} from "@blueprintjs/docs-theme";
import { ItemRenderer, MultiSelect } from "@blueprintjs/select";

import {
  areElemsEqual,
  arrayContainsElem,
  createElem,
  elemSelectProps,
  maybeAddCreatedElemToArrays,
  maybeDeleteCreatedElemFromArrays,
  renderCreateElemOption,
  TopRequirements,
} from "./RequirementElems";

const ElemMultiSelect = MultiSelect.ofType<string>();

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

export interface IMultiSelectExampleState {
  allowCreate: boolean;
  createdItems: string[];
  fill: boolean;
  elems: string[];
  hasInitialContent: boolean;
  intent: boolean;
  items: string[];
  openOnKeyDown: boolean;
  popoverMinimal: boolean;
  resetOnSelect: boolean;
  tagMinimal: boolean;
}

class MultiSelectTag extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      allowCreate: true,
      createdItems: [],
      fill: true,
      elems: [],
      hasInitialContent: false,
      intent: false,
      items: elemSelectProps.items,
      openOnKeyDown: false,
      popoverMinimal: true,
      resetOnSelect: true,
      tagMinimal: true,
    };
  }

  public render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { allowCreate, elems, hasInitialContent, tagMinimal, popoverMinimal, ...flags } = this.state;
    const getTagProps = (_value: React.ReactNode, index: number): ITagProps => ({
      intent: this.state.intent ? INTENTS[index % INTENTS.length] : Intent.NONE,
      minimal: tagMinimal,
    });

    const initialContent = this.state.hasInitialContent ? (
      <MenuItem disabled={true} text={`${TopRequirements.length} items loaded.`} />
    ) : // explicit undefined (not null) for default behavior (show full list)
    undefined;
    const maybeCreateNewItemFromQuery = allowCreate ? createElem : undefined;
    const maybeCreateNewItemRenderer = allowCreate ? renderCreateElemOption : null;

    const clearButton =
      elems.length > 0 ? <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;

    return (
      <Example {...this.props}>
        <ElemMultiSelect
          {...elemSelectProps}
          {...flags}
          createNewItemFromQuery={maybeCreateNewItemFromQuery}
          createNewItemRenderer={maybeCreateNewItemRenderer}
          initialContent={initialContent}
          itemRenderer={this.renderElem}
          itemsEqual={areElemsEqual}
          // we may customize the default elemSelectProps.items by
          // adding newly created items to the list, so pass our own
          items={this.state.items}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleElemSelect}
          onItemsPaste={this.handleElemsPaste}
          popoverProps={{ minimal: popoverMinimal }}
          tagRenderer={this.renderTag}
          tagInputProps={{
            onRemove: this.handleTagRemove,
            rightElement: clearButton,
            tagProps: getTagProps,
          }}
          selectedItems={this.state.elems}
        />
      </Example>
    );
  }

  private renderTag = (elem: string) => elem;

  // NOTE: not using Elems.itemRenderer here so we can set icons.
  private renderElem: ItemRenderer<string> = (elem, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isElemSelected(elem) ? "tick" : "blank"}
        key={elem}
        onClick={handleClick}
        text={elem}
        shouldDismissPopover={false}
      />
    );
  };

  private handleTagRemove = (_tag: React.ReactNode, index: number) => {
    this.deselectElem(index);
  };

  private getSelectedElemIndex(elem: string) {
    console.log("selecting: ", elem);
    return this.state.elems.indexOf(elem);
  }

  private isElemSelected(elem: string) {
    return this.getSelectedElemIndex(elem) !== -1;
  }

  private selectElem(elem: string) {
    this.selectElems([elem]);
  }

  private selectElems(elemsToSelect: string[]) {
    const { createdItems, elems, items } = this.state;

    let nextCreatedItems = createdItems.slice();
    let nextElems = elems.slice();
    let nextItems = items.slice();

    elemsToSelect.forEach((elem) => {
      const results = maybeAddCreatedElemToArrays(nextItems, nextCreatedItems, elem);
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create
      // Item" option will be shown even if it matches an already selected
      // item).
      nextElems = !arrayContainsElem(nextElems, elem) ? [...nextElems, elem] : nextElems;
    });

    this.setState({
      createdItems: nextCreatedItems,
      elems: nextElems,
      items: nextItems,
    });

    this.props.onReqUpdate(nextElems);
  }

  private deselectElem(index: number) {
    const { elems } = this.state;

    const elem = elems[index];

    const { createdItems: nextCreatedItems, items: nextItems } = maybeDeleteCreatedElemFromArrays(
      this.state.items,
      this.state.createdItems,
      elem
    );

    // Delete the item if the user manually created it.
    const nextElems = elems.filter((_elem, i) => i !== index);
    this.setState({
      createdItems: nextCreatedItems,
      elems: nextElems,
      items: nextItems,
    });
    this.props.onReqUpdate(nextElems);
  }

  private handleElemSelect = (elem: string) => {
    if (!this.isElemSelected(elem)) {
      this.selectElem(elem);
    } else {
      this.deselectElem(this.getSelectedElemIndex(elem));
    }
  };

  private handleElemsPaste = (elems: string[]) => {
    // On paste, don't bother with deselecting already selected values, just
    // add the new ones.
    this.selectElems(elems);
  };

  private handleClear = () => this.setState({ elems: [] });
}

export default MultiSelectTag;
