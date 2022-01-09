import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Tag,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import {
  IFormNoticeComponentProps,
  IBaseSubmitButtonProps,
  IBaseAlertDialogProps,
} from "./types";

export const BaseSubmitButton: React.FC<IBaseSubmitButtonProps> = ({
  onSubmit,
  submitting,
}) => {
  return (
    <Box pt={5}>
      <Button
        width={["100%", "min"]}
        isLoading={submitting}
        children={<>Submit</>}
        onClick={onSubmit}
      />
    </Box>
  );
};

export const BaseFormNotice: React.FC<IFormNoticeComponentProps> = ({
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

export const BaseLoadingScreen = () => {
  return (
    <Box
      position={"absolute"}
      bgColor={"white"}
      height={"100%"}
      width={"100%"}
      opacity={0.5}
      zIndex={2}
      left={0}
      top={0}
    />
  );
};

export const BaseAlertDialog: React.FC<IBaseAlertDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  submitting,
}) => {
  const [isLargerThan420] = useMediaQuery("(min-width: 420px)");
  const cancelRef = React.useRef();
  const submitData = () => {
    onSubmit();
    onClose();
  };

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
        size={isLargerThan420 ? "md" : "full"}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Submit Form
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to submit the form ?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={submitting}
                onClick={submitData}
                colorScheme="blue"
                ml={3}
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
