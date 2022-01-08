import { createOpenForm } from '../../lib/createOpenForm.js'
import { navigateToForm } from './navigateToForm.js'

export const openForm = createOpenForm({
  navigateToForm,
})
