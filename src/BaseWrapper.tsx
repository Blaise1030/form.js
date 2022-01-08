import { GridItem } from "@chakra-ui/react";
import { FieldRenderProps, Field } from "react-final-form";
import { IComponent } from "./types";

const BaseWrapper = ({
  payload,
  comp,
}: {
  payload: IComponent;
  comp: {
    [type: string]: (p: {
      props: FieldRenderProps<any, HTMLElement, any>;
      payload: IComponent;
      id: string;
    }) => React.ReactNode;
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
