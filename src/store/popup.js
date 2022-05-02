import {action, makeObservable, observable} from "mobx";
import {makeLoggable} from "mobx-log";

export default class Popup {
  type = ''
  show = false

  constructor(store) {
    this.store = store
    makeObservable(this, {
      type: observable,
      show: observable,
      setPopup: action,
      unsetPopup: action
    })
    makeLoggable(this)
  }


  setPopup = (value) => {
    this.type = value
    this.show = true
  }

  unsetPopup = () => {
    this.type = ''
    this.show = false
  }

}
