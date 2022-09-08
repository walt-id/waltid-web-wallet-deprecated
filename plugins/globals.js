export default (context, inject) => {
    const globals = {
        thumbnail(credential) {
            if (credential.type[credential.type.length - 1] == "OpenBadgeCredential") {
                return credential.credentialSubject.achievement.image
            }
        },
        convertUrl(url) {
            let result = url
            if (url) {
                let matches = url.match("^(ipfs://)([1-9A-Za-z]{59})$");
                if (matches != null && matches.length > 2) {
                    result = "https://ipfs.io/ipfs/" + matches[2]
                }
            }
            return result
        },
        isVideo(data) {
            let result = true
            if(data != null){
                result = data.mediaType!=null && data.mediaType == "video"
            }
            return result
        },
        isNotNullOrEmpty(value) {
            return value != null && value !== "";
        },
        mediaUrl(token){
            let url = this.convertUrl(token.imageUrl)
            if (!this.isNotNullOrEmpty(url)) {
                url = "/NoImageAvailable.jpg"
            }
            return url
        },
        getTokenName(token){
            let name = "Missing Name"
            if(token != null){
                name = token.name + " #" + token.tokenId
            }
            return name
        }
    }
    // Inject $convertUrl(url) in Vue, context and store.
    inject('globals', globals)
    // For Nuxt <= 2.12, also add 👇
    context.$globals = globals
}