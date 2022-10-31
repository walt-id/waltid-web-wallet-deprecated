export const state = () => ({
  fullPageModal: false,
})

export const mutations = {
  toggleFullPageModal(state){
    state.fullPageModal = !state.fullPageModal
  }
}