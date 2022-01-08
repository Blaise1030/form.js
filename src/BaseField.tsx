import { GridItem } from "@chakra-ui/react";
import { IBaseComponent, IComponent } from "./types";
import { Field, FieldRenderProps } from "react-final-form";

export default function BaseField(
  payload: IComponent,
  _component: (
    props: FieldRenderProps<any>,
    payload: IComponent,
    name: string
  ) => React.ReactNode
): IBaseComponent {
  const { id, type, halfSize } = payload;
  const generateID = `${id}-${type}`;
  const component = (props: FieldRenderProps<any>) =>
    _component(props, payload, generateID);

  return {
    ...payload,
    validationFunction: (value: any) => {
      throw "Need implementation";
    },
    render: () => {
      return (
        <GridItem colSpan={[2, halfSize ? 1 : 2]} key={generateID}>
          <Field children={component} name={generateID} type="text" />
        </GridItem>
      );
    },
  };
}
