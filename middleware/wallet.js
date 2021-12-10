export default function (context) {
    if(context.store.state.auth.loggedIn && !context.store.state.wallet.initialized) {
        console.log('Loading wallet...')
        let dids = context.$axios.$get('/api/wallet/did/list')
        context.store.dispatch('wallet/initialize', dids)
    }
}
  