import { Grid } from "@chakra-ui/react";
import { Form } from "react-final-form";
import createComponentMap, { IBaseComponentOutput } from "./BaseComponent";
import createValidatorMap, { IValidatorOutput } from "./BaseValidator";
import BaseWrapper from "./BaseWrapper";
import { IComponent, IValidation } from "./types";

function BaseForm({
  payload,
  validationPlugin = [],
  componentPlugin = [],
}: {
  payload?: IComponent[];
  validationPlugin?: Array<IValidatorOutput<any, any>>;
  componentPlugin?: Array<IBaseComponentOutput>;
}) {
  const comp = createComponentMap(componentPlugin);
  const vali = createValidatorMap(validationPlugin);
  const validFields: Array<IComponent> = (payload || []).filter(
    ({ type }) => comp[type]
  );

  const onSubmit = (e: any) => {
    console.log(e);
    return {};
  };

  const validate = (data: any) =>
    validFields.reduce(
      (prev: { [type: string]: string }, comp: IComponent) => ({
        ..._checkFieldValidation(comp?.validation, data, comp.id),
        ...prev,
      }),
      {}
    );

  const _checkFieldValidation = (
    validation: IValidation | undefined,
    data: any,
    id: string
  ) => {
    if (!validation) return {};
    for (let key in validation) {
      const inputValue = data[id];
      const validationValue = validation[key];
      const { validateFunc, dataType } = vali[key];
      if (!dataType || dataType.length <= 0)
        throw "Validator data type is missing";
      if (dataType.includes(typeof inputValue) || dataType[0] === "any")
        return validateFunc(inputValue, validationValue, id);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid
            gap={4}
            templateColumns="repeat(2, 1fr)"
            children={validFields?.map((payload: IComponent) => (
              <BaseWrapper payload={payload} comp={comp} />
            ))}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
}

export default BaseForm;
