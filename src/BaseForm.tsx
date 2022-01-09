import createValidatorMap from "./BaseValidator";
import { Box, ChakraProvider, Grid } from "@chakra-ui/react";
import createComponentMap from "./BaseFieldComponents";
import { ValidationErrors } from "final-form";
import React, { useState } from "react";
import { Form } from "react-final-form";
import BaseWrapper from "./BaseWrapper";
import {
  IFormNoticeComponentProps,
  IBaseAlertDialogProps,
  IValidation,
  IComponent,
  IBaseSubmitButtonProps,
  IBaseLoadingScreenProps,
  IBaseComponentOutput,
  IValidatorOutput,
} from "./types";
import {
  BaseAlertDialog,
  BaseFormNotice,
  BaseLoadingScreen,
  BaseSubmitButton,
} from "./BaseFormComponents";

function BaseForm({
  payload,
  onSubmit,
  formNotice,
  componentPlugin = [],
  validationPlugin = [],
  showConfirmAlert = false,
  FormNoticeUI = BaseFormNotice,
  ConfirmationUI = BaseAlertDialog,
  SubmitButtonUI = BaseSubmitButton,
  LoadingScreenUI = BaseLoadingScreen,
  showLoadingScreenOnSubmit = true,
}: {
  formNotice?: string;
  payload: IComponent[];
  useChakraUI?: boolean;
  showConfirmAlert?: boolean;
  showLoadingScreenOnSubmit?: boolean;
  componentPlugin?: Array<IBaseComponentOutput>;
  ConfirmationUI?: React.FC<IBaseAlertDialogProps>;
  FormNoticeUI?: React.FC<IFormNoticeComponentProps>;
  SubmitButtonUI?: React.FC<IBaseSubmitButtonProps>;
  LoadingScreenUI?: React.FC<IBaseLoadingScreenProps>;
  validationPlugin?: Array<IValidatorOutput<any, any>>;
  onSubmit: (values: { [key: string]: any }) => any | Promise<any>;
}) {
  const comp = createComponentMap(componentPlugin);
  const vali = createValidatorMap(validationPlugin);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const validFields: Array<IComponent> = (payload || []).filter(
    ({ type }) => comp[type]
  );

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
            <Box width={"100%"} position="relative">
              {submitting && showLoadingScreenOnSubmit && <LoadingScreenUI />}
              <ConfirmationUI
                onClose={() => setShowConfirmation(false)}
                isOpen={showConfirmation}
                onSubmit={handleSubmit}
                submitting={submitting}
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
