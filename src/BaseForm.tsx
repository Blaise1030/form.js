import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Box,
  Button,
  ChakraProvider,
  Grid,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-final-form";
import createComponentMap, { IBaseComponentOutput } from "./BaseComponent";
import createValidatorMap, { IValidatorOutput } from "./BaseValidator";
import BaseWrapper from "./BaseWrapper";
import { IComponent, IValidation } from "./types";

function BaseForm({
  payload,
  componentPlugin = [],
  validationPlugin = [],
  buttonIsFullWidth = false,
  formNotice,
  confirmationUI = <></>,
}: {
  formNotice?: string;
  payload?: IComponent[];
  buttonIsFullWidth?: boolean;
  componentPlugin?: Array<IBaseComponentOutput>;
  validationPlugin?: Array<IValidatorOutput<any, any>>;
  confirmationUI?: React.ReactNode;
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
      if (!Boolean(validateFunc))
        throw `Validator function for ${key} is missing`;
      if (dataType.includes(typeof inputValue) || dataType[0] === "any")
        return validateFunc(inputValue, validationValue, id);
    }
  };

  return (
    <ChakraProvider>
      <BaseFormNotice formNotice={formNotice || ""} />
      <br />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => {
          return (
            <form>
              <BaseAlertDialog
                onClose={() => setShowConfirmation(false)}
                isOpen={showConfirmation}
                children={confirmationUI}
                onSubmit={handleSubmit}
              />
              <Grid
                gap={4}
                templateColumns="repeat(2, 1fr)"
                children={validFields?.map((payload: IComponent) => (
                  <BaseWrapper key={payload.id} payload={payload} comp={comp} />
                ))}
              />
              <Box pt={5}>
                <Button
                  isFullWidth={buttonIsFullWidth}
                  width={["100%", "min"]}
                  children={<>Submit</>}
                  onClick={() => {
                    if (confirmationUI) setShowConfirmation(true);
                    else handleSubmit();
                  }}
                />
              </Box>
            </form>
          );
        }}
      />
    </ChakraProvider>
  );
}

interface IFormNoticeComponentProps {
  formNotice: string;
}

const BaseFormNotice: React.FC<IFormNoticeComponentProps> = ({
  formNotice,
}) => {
  return (
    <>
      {formNotice && (
        <Tag
          colorScheme="cyan"
          variant="subtle"
          width={"100%"}
          size={"md"}
          mb={3}
          p={3}
        >
          {formNotice}
        </Tag>
      )}
    </>
  );
};

const BaseAlertDialog = ({ children, isOpen, onClose, onSubmit }: any) => {
  const cancelRef = React.useRef();
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {children}
            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button
                ml={3}
                colorScheme="blue"
                onClick={() => {
                  onSubmit();
                  onClose();
                }}
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BaseForm;
