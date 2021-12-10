
export const state = () => ({
    initialized: false,
    dids: [],
    currentDid: ''
  })
  
export const mutations = {
    addDid(state, did) {
        state.dids.push(did)
    },
    removeDid(state, did) {
        state.list.splice(state.dids.indexOf(did), 1)
    },
    setCurrentDid(state, did) {
        state.currentDid = did
    },
    initialize(state, dids) {
      state.initialized = true
      state.dids = dids
      state.currentDid = dids[0]
    }
}

export const actions = {
  initialize({ commit }, didsPromise) {
    didsPromise.then(dids => 
      commit('initialize', dids)
    )
  }
}