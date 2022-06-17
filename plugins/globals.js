export default (context, inject) => {
    const globals = {
        thumbnail(credential) {
            if (credential.type[credential.type.length - 1] == "OpenBadgeCredential") {
                return credential.credentialSubject.achievement.image
            }
        },
    }
    // Inject $convertUrl(url) in Vue, context and store.
    inject('globals', globals)
    // For Nuxt <= 2.12, also add 👇
    context.$globals = globals
}