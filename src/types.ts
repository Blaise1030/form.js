// Form Field components
export interface IValidation {
  [id: string]: boolean | string | object | number;
}

export interface IComponent {
  type: string;
  id: string;
  label?: string;
  order?: number;
  halfSize?: boolean;
  isReadonly?: boolean;
  description?: string;
  validation?: IValidation;
  defaultValue?: any;
}

export interface IHeader extends IComponent {
  type: "Header";
}

export interface IHStack extends IComponent {
  type: "HStack";
  right: IComponent;
  left: IComponent;
}

export interface IRadioButton extends IComponent {
  type: "radio";
  selections: Array<{ label: string; value: string }>;
  allowMultiple: boolean;
  validation?: {
    required?: boolean;
  };
}

export interface ICheckbox extends IComponent {
  type: "checkbox";
  selections: Array<{ label: string; value: string }>;
  label: string;
  validation?: {
    required?: boolean;
  };
}

export interface ITextInput extends IComponent {
  type: "text";
  isTextArea?: boolean;
  validation?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    regex?: string | { regex: string; patternName: string };
  };
}

export interface IFileInput extends IComponent {
  type: "file";
  acceptableFiles?: string[];
  validation?: {
    required?: boolean;
    maximumFileSize?: number;
  };
}

export interface IDatePicker extends IComponent {
  type: "date";
  validation?: {
    required?: boolean;
    maxDate?: Date;
    minDate?: Date;
  };
}

export interface ISelectInput extends IComponent {
  type: "select";
  selections: Array<{ label: string; value: any }>;
  validation?: {
    required: boolean;
  };
}

//Updatetable Base Form Components,

export interface IBaseLoadingScreenProps {}

export interface IFormNoticeComponentProps {
  formNotice: string;
}
export interface IBaseAlertDialogProps {
  isOpen: boolean;
  submitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export interface IBaseSubmitButtonProps {
  onSubmit: () => void;
  submitting: boolean;
}
