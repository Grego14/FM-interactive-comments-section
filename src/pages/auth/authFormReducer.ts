interface FormField {
  value: string,
  error: string
}

export interface FormState {
  username: FormField
  email: FormField
  password: FormField
}

type FormAction = 
    {type: 'update_value', field: keyof FormState, value: string} |
    {type: 'set_error', field: keyof FormState, error: string}

export default function formDataReducer(state?: FormState, action?: FormAction){
  if(!state || !action) return formDataInitialValue

  const field = action.field
  const fieldValue = state[field]

  switch(action.type){

    case 'update_value':
      return {
        ...state,
        [field]: {
          ...fieldValue,
          value: action.value
        }
      }

    case 'set_error':
      return {
        ...state,
        [field]: {
          ...fieldValue,
          error: action.error
        }
      }

    default: 
      return state
  }
}

export const formDataInitialValue = {
  username: { value: '', error: '' },
  email: { value: '', error: '' },
  password: { value: '', error: '' },
}
