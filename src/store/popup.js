import {types} from "mobx-state-tree";

const Popup = types.model('Popup', {
  show: false,
  type: types.maybe(types.string),
}).actions(self => {
  return {
    setPopup(value) {
      self.type = value
      self.show = true
    },
    unsetPopup() {
      self.type = ''
      self.show = false
    },
  }
})

export default Popup;
