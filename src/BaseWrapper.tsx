import { GridItem } from "@chakra-ui/react";
import React from "react";
import { Field } from "react-final-form";
import { IBaseComponentProps } from "./BaseFieldComponents";
import { IComponent } from "./types";

const BaseWrapper = React.memo(
  ({
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
  )
);

export default BaseWrapper;
