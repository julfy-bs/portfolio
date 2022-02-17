export default {
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    inputPlaceholder: {
      type: String,
      required: true
    },
    inputRequired: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    }
  }
}
