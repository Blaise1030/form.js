import createComponentMap, {
  IBaseComponentOutput,
} from "./BaseFieldComponents";
import {
  BaseAlertDialog,
  BaseFormNotice,
  BaseSubmitButton,
} from "./BaseFormComponents";
import createValidatorMap, { IValidatorOutput } from "./BaseValidator";
import { Box, Button, ChakraProvider, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-final-form";
import BaseWrapper from "./BaseWrapper";
import {
  IFormNoticeComponentProps,
  IBaseAlertDialogProps,
  IValidation,
  IComponent,
  IBaseSubmitButtonProps,
} from "./types";
import { ValidationErrors } from "final-form";

function BaseForm({
  payload,
  formNotice,
  componentPlugin = [],
  validationPlugin = [],
  showConfirmAlert = false,
  FormNoticeUI = BaseFormNotice,
  ConfirmationUI = BaseAlertDialog,
  SubmitButtonUI = BaseSubmitButton,
}: {
  formNotice?: string;
  payload: IComponent[];
  useChakraUI?: boolean;
  showConfirmAlert?: boolean;
  componentPlugin?: Array<IBaseComponentOutput>;
  ConfirmationUI?: React.FC<IBaseAlertDialogProps>;
  FormNoticeUI?: React.FC<IFormNoticeComponentProps>;
  SubmitButtonUI?: React.FC<IBaseSubmitButtonProps>;
  validationPlugin?: Array<IValidatorOutput<any, any>>;
}) {
  const comp = createComponentMap(componentPlugin);
  const vali = createValidatorMap(validationPlugin);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const validFields: Array<IComponent> = (payload || []).filter(
    ({ type }) => comp[type]
  );

  const onSubmit = (e: any) => {
    console.log(e);
    return {};
  };

  const validate = (data: any): ValidationErrors | Promise<ValidationErrors> =>
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
      if (!Boolean(validateFunc))
        throw `Validator function for ${key} is missing`;
      if (dataType.includes(typeof inputValue) || dataType[0] === "any")
        return validateFunc(inputValue, validationValue, id);
    }
  };

  return (
    <ChakraProvider>
      {formNotice && <FormNoticeUI formNotice={formNotice || ""} />}
      <br />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, valid, submitting }) => {
          const onSubmitButtonClick = () => {
            if (valid && showConfirmAlert) setShowConfirmation(true);
            else handleSubmit();
          };
          return (
            <Box>
              <ConfirmationUI
                onClose={() => setShowConfirmation(false)}
                isOpen={showConfirmation}
                onSubmit={handleSubmit}
              />
              <Grid
                gap={4}
                templateColumns="repeat(2, 1fr)"
                children={validFields?.map((payload: IComponent) => (
                  <BaseWrapper key={payload.id} payload={payload} comp={comp} />
                ))}
              />
              <SubmitButtonUI
                onSubmit={onSubmitButtonClick}
                submitting={submitting}
              />
            </Box>
          );
        }}
      />
    </ChakraProvider>
  );
}

export default BaseForm;
