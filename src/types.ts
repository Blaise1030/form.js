export interface IValidationRules<T> {
  errorMessage?: string;
  type: T;
}

export interface IValidation {
  required?: IValidationRules<boolean>;
  minLength?: IValidationRules<number>;
  maxLength?: IValidationRules<number>;
  regex?: IValidationRules<string>;
  fileType?: IValidationRules<Array<string>>;
  minDate?: IValidationRules<Date>;
  maxDate?: IValidationRules<Date>;
}

export interface IComponent {
  label: string;
  order?: number;
  halfSize?: boolean;
  isReadonly?: boolean;
  description: string;
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
  type: "RadioButton";
  selections: Array<{ label: string; value: string }>;
  allowMultiple: boolean;
  validation?: {
    required?: boolean;
    maximumSelection?: number;
    minimumSelection?: number;
  };
}

export interface ICheckbox extends IComponent {
  type: "Checkbox";
  selections: Array<{ label: string; value: string }>;
  validation?: {
    required?: boolean;
  };
}

export interface ITextInput extends IComponent {
  type: "TextInput";
  isTextArea?: boolean;
  validation?: {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    regex?: string;
  };
}

export interface IFileInput extends IComponent {
  type: "FileInput";
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
