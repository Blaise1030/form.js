import { Field, FieldRenderProps } from "react-final-form";
import { IComponent } from "./types";

abstract class BaseField {
  static id = 0;
  id: string;
  type?: string;
  payload: IComponent;

  constructor(id: string, type: string, payload: IComponent) {
    this.id = id || `${BaseField.id}-${type}-${Date.now()}`;
    this.payload = payload;
    BaseField.id += 1;
    this.type = type;
  }

  abstract _component(
    props: FieldRenderProps<any>,
    payload: IComponent
  ): (props: FieldRenderProps<any, HTMLElement, any>) => React.ReactNode;

  component(props: FieldRenderProps<any>) {
    return this._component(props, this.payload);
  }

  render() {
    return <Field children={this.component} name={`${this.type}-${this.id}`} />;
  }
}

export default BaseField;
