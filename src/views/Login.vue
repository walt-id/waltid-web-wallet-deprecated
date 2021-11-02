<template>
  <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center">
        <div id="widget" class="_form d-grid align-items-center bg-white shadow-lg text-center">
            <div>
                <h2>Login</h2>
                <p class="mt-3">Access to your wallet.</p>
                <form action="" id="login-form" class="my-4">
                    <div class="my-2">
                        <input type="email" placeholder="E-mail" name="email" id="login-form-email" class="border rounded px-3" autocomplete="off">
                    </div>
                    <div class="my-2">
                        <input type="password" placeholder="Password" name="password" id="login-form-password" class="border rounded px-3" autocomplete="off">
                    </div>
                    <div class="my-2">
                        <button type="submit" name="submit" class="text-white border-0 rounded">Login</button>
                       <br> <router-link to="/credential-request">should go to => Credential Request</router-link>
                    </div>
                    <div class="my-2 d-flex mt-4 justify-content-center">
                        <a href="/signup.html" class="px-3 py-0">Sign up</a>
                        <a href="/forgot-password.html" class="px-3 py-0 border-start border-2 ">Forgot password?</a>
                    </div>
                </form>
                <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
        </div>
    </section>
</template>

<script>

export default {
  name: 'Login',
}
</script>
