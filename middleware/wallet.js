import {config} from '/config.js'
export default function (context) {
    if(context.store.state.auth.loggedIn && !context.store.state.wallet.initialized) {
        console.log('Loading wallet...')
        // TODO: fetch default chain ??
        const defaultChain = config.defaultChain
        return context.$axios.$get('/api/wallet/did/list').then(dids => context.store.dispatch('wallet/initialize', {dids, defaultChain}))
    }
}
  