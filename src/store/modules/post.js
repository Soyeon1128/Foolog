const state = {
  post_empty: true,
  post_before_save: false,
  post_after_save: false
}

const getters = {
  postEmpty(state) {
    return state.post_empty;
  },
  postBeforeSave(state) {
    return state.post_before_save;
  },
  postAfterSave(state) {
    return state.post_after_save;
  },
}

const mutations = {
  openPostBefore(state) {
    if ( state.post_empty === true ) {
      state.post_empty = false
      state.post_before_save = true
    }
  },
  closeBeforeSaveList(state) {
    if (state.post_before_save === true ) {
      state.post_before_save = false
      state.post_empty = true
    }
  }
}

export default {
  state,
  getters,
  mutations
}