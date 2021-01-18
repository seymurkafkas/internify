import { Intent, Spinner } from "@blueprintjs/core";
import React from "react";

interface Props {
  size: number;
}
export default function LoadingSpinner(props: Props) {
  return (
    <div className="mt-48">
      <Spinner intent={Intent.PRIMARY} size={props.size} />
    </div>
  );
}
