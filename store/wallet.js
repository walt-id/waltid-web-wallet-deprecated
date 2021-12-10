
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
    initialize(state, dids, currentDid) {
      state.initialized = true
      state.dids = dids
      state.currentDid = currentDid
    }
}

export const actions = {
  initialize({ commit }, didsPromise) {
    didsPromise.then(dids => 
      commit('initialize', dids, dids[0])
    )
  }
}