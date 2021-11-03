<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-4 p-lg-5 p-md-5 p-sm-1">
        <div id="widget" class="_form d-grid align-items-center bg-white shadow-lg text-center">
            <div>
                <h2>Sign up</h2>
                <p class="mt-3">Create a new wallet account.</p>
                <form action="" id="signup-form" class="my-4 _animation-fade">
                    <div class="my-2">
                        <input type="email" placeholder="E-mail" name="email" id="signup-form-email" class="border rounded px-3" autocomplete="off">
                    </div>
                    <div class="my-2">
                        <input type="password" placeholder="Password" name="password" id="signup-form-password" class="border rounded px-3" autocomplete="off">
                    </div>
                    <div class="my-2">
                        <button type="submit" name="submit" class="text-white border-0 rounded">Create Account</button>
                    </div>
                    <div class="my-2">
                        <a href="/login.html">Already have account? Login</a>
                    </div>
                </form>
                <a id="copyright" class="_animation-fade" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
        </div>
    </section>
</template>

<script>

export default {
  name: 'Signup',
}
</script>
