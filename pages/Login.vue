<template>
  <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center">
        <div id="widget" class="_form d-grid align-items-center bg-white shadow-lg text-center">
            <div>
                <h2>Login</h2>
                <p class="mt-3">Access to your wallet.</p>
                <form action="" id="login-form" class="my-4">
                    <div class="my-2 _animation-fade">
                        <input type="email" placeholder="E-mail" name="email" id="login-form-email" class="border rounded px-3" autocomplete="off">
                    </div>
                    <div class="my-2 _animation-fade">
                        <input type="password" placeholder="Password" name="password" id="login-form-password" class="border rounded px-3" autocomplete="off">
                    </div>
                    <div class="my-2">
                       <NuxtLink to="/credential-request">
                         <button class="text-white border-0 rounded _animation-fade">Login</button>
                       </NuxtLink>
                    </div>
                    <div class="my-2 d-flex mt-4 justify-content-center">
                        <a href="/signup" class="px-3 py-0">Sign up</a>
                        <a href="/forgot-password" class="px-3 py-0 border-start border-2 ">Forgot password?</a>
                    </div>
                </form>
                <a id="copyright" class="_animation-fade" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
        </div>
    </section>
</template>

<script>

export default {
  name: 'Login',
}
</script>
