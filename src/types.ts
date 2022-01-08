import BaseField from "./BaseField";

export interface IValidationRules<T> {
  errorMessage?: string;
  type: T;
}

export interface IComponent {
  type: string;
  id: string;
  label?: string;
  order?: number;
  halfSize?: boolean;
  isReadonly?: boolean;
  description?: string;
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
    maximumSelection?: number;
    minimumSelection?: number;
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
    regex?: string;
  };
}

export interface IFileInput extends IComponent {
  type: "file";
  acceptableFiles?: string[];
  validation?: {
    required?: boolean;
  };
}

export interface IDatePicker extends IComponent {
  type: "DatePicker";
  validation?: {
    required?: boolean;
    maxDate?: Date;
    minDate?: Date;
  };
}

export interface IDateRange extends IComponent {
  type: "DateRange";
  validation: {
    required?: boolean;
    maxDate?: Date;
    minDate?: Date;
  };
}

export interface ISelection extends IComponent {
  type: "Selection";
  selections: Array<{ name: string; label: string }>;
  validation?: {
    required: boolean;
  };
}

export interface IFormFields {
  [key: string]: (payload: IComponent) => IBaseComponent;
}

export interface IBaseComponent extends IComponent {
  id: string;
  render: () => React.ReactNode;
  validationFunction: (value: any) => { [name: string]: string } | void;
}
