import { GridItem } from "@chakra-ui/react";
import React from "react";
import { FieldRenderProps, Field } from "react-final-form";
import { IBaseComponentProps } from "./BaseComponent";
import { IComponent } from "./types";

const BaseWrapper = ({
  payload,
  comp,
}: {
  payload: IComponent;
  comp: {
    [type: string]: React.FC<IBaseComponentProps>;
  };
}) => (
  <GridItem
    colSpan={[2, payload.halfSize ? 1 : 2]}
    key={payload.id}
    children={
      <Field
        type={payload.type}
        name={payload.id}
        children={(props) =>
          comp[payload.type]({
            id: payload.id,
            payload,
            props,
          })
        }
      />
    }
  />
);

export default BaseWrapper;
