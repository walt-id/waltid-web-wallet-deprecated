
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
        localStorage.setItem('default_did', did)
    },
    initialize(state, dids) {
      state.initialized = true
      state.dids = dids
      let default_did = localStorage.getItem("default_did")
      if(dids.findIndex(i => i == default_did) < 0)
        state.currentDid = dids[0]
      else
        state.currentDid = default_did
      console.log("wallet initialized with ", state.currentDid)
    }
}

export const actions = {
  initialize({ commit }, dids) {
    commit('initialize', dids)
  }
}