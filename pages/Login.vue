<template>
  <div>
    <div :class="this.isSignin ? '_fade' : 'hide'">
      <img :src="this.logo.path" width="50px" :alt="this.logo.alt" />

      <p class="mt-3">{{ $t("LOGIN.MSG") }}</p>
      <div></div>
      <form action="" id="login-form" class="my-4" @submit.prevent="login">
        <ErrorMessage :message-content="errorMessage" :is-active="error" />
        <div class="my-2 _animation-fade">
          <input
            type="text"
            :placeholder="$t('LOGIN.EMAIL')"
            name="email"
            id="login-form-email"
            @input="resetError()"
            v-bind:class="
              this.validEmail === true
                ? 'border rounded px-3'
                : 'border rounded px-3 border-danger'
            "
            autocomplete="off"
            v-model="email"
          />
          <span
            style="
              margin-left: -35px;
              margin-right: 15px;
              z-index: 999;
              position: absulute;
            "
          >
            <i class="bi bi-people"></i>
          </span>
        </div>
        <div class="my-2 _animation-fade">
          <input
            type="password"
            :placeholder="$t('LOGIN.PASSWORD')"
            name="password"
            id="login-form-password"
            @input="resetError()"
            :data="this.password"
            :class="
              this.validPassword === true
                ? 'border rounded ps-3'
                : 'border rounded  ps-3 border-danger'
            "
            autocomplete="off"
            v-model="password"
          />
          <span
            style="
              margin-left: -35px;
              margin-right: 15px;
              z-index: 999;
              position: absulute;
            "
          >
            <i class="bi bi-lock"></i>
          </span>
        </div>
        <div class="my-2">
          <button
            type="submit"
            name="submit"
            class="text-white border-0 rounded _animation-fade"
          >
            <span v-if="loginLoading">
              <img src="dark-loader.gif" width="30px" style="opacity: 0.7" />
            </span>
            <span v-else>{{ $t("LOGIN.LOGIN") }}</span>
          </button>
        </div>
        <div class="my-2">
          <a href="#metamask" class="_meta-mask btn" @click="web3modal">
            <span class="d-flex justify-content-center align-items-center">
              <i class="bi bi-wallet2 mx-2 text-white"></i>
              <p>Connect wallet</p>
            </span>
          </a>
        </div>
        <div>
          <a href="#metamask" class="_meta-mask btn" @click="beaconTezosWallet">
            <span class="d-flex justify-content-center align-items-center">
              <i class="bi bi-wallet2 mx-2 text-white"></i>
              <p>Connect Tezos wallet</p>
            </span>
          </a>
        </div>
        <div class="my-2">
          <a href="#nearwallet" class="_meta-mask btn" @click="nearWallet">
            <span class="d-flex justify-content-center align-items-center">
              <i class="bi bi-wallet2 mx-2 text-white"></i>
              <p>Connect Near wallet</p>
            </span>
          </a>
        </div>

        <div class="my-2">
          <a href="#polkadot-wallet" class="_meta-mask btn" @click="polkadotjsWallet">
            <span class="d-flex justify-content-center align-items-center">
              <i class="bi bi-wallet2 mx-2 text-white"></i>
              <p>Connect Polkadot Wallet</p>
            </span>
          </a>
        </div>

        <div class="my-2">
          <a href="#flow-wallet" class="_meta-mask btn" @click="flowWallet">
            <span class="d-flex justify-content-center align-items-center">
              <i class="bi bi-wallet2 mx-2 text-white"></i>
              <p>Connect Flow Wallet</p>
            </span>
          </a>
        </div>

        <div class="my-3 d-flex mt-4 justify-content-center">
          <a @click="toSignup" class="px-3 py-0 fw-normal">{{
            $t("LOGIN.SIGN_UP")
          }}</a>
          <a
            @click="toResetPassword"
            class="px-3 py-0 border-start border-2 fw-normal"
            >{{ $t("LOGIN.FORGOT_PASSWORD") }}</a
          >
        </div>
        <a
          href="#"
          v-for="locale in availableLocales"
          :key="locale.code"
          @click.prevent.stop="$i18n.setLocale(locale.code)"
        >
          <img
            :src="locale.flag"
            width="20px"
            height="15px"
            :alt="locale.iso"
            class="me-2 border border-white"
          />
        </a>
      </form>
    </div>
    <div :class="this.isSignup ? '_fadehi' : 'hide'">
      <h2>Sign up</h2>
      <p class="mt-3">Create a new wallet account.</p>
      <form action="" id="signup-form" class="my-4" @submit.prevent="login">
        <div class="my-2">
          <input
            type="text"
            :placeholder="$t('LOGIN.EMAIL')"
            name="email"
            id="login-form-email"
            @input="resetError()"
            v-bind:class="
              this.validEmail === true
                ? 'border rounded px-3'
                : 'border rounded px-3 border-danger'
            "
            autocomplete="off"
            v-model="email"
          />
          <span
            style="margin-left: -35px;
              margin-right: 15px;
              z-index: 999;
              position: absulute;
            "
          >
            <i class="bi bi-people"></i>
          </span>
        </div>
        <div class="my-2">
          <input
            type="password"
            :placeholder="$t('LOGIN.PASSWORD')"
            name="password"
            id="login-form-password"
            @input="resetError()"
            :data="this.password"
            :class="
              this.validPassword === true
                ? 'border rounded px-3'
                : 'border rounded px-3 border-danger'
            "
            autocomplete="off"
            v-model="password"
          />
          <span
            style="
              margin-left: -35px;
              margin-right: 15px;
              z-index: 999;
              position: absulute;
            "
          >
            <i class="bi bi-lock"></i>
          </span>
        </div>
        <div class="my-2">
          <input
            type="password"
            :placeholder="$t('LOGIN.CONFIRM_PASSWORD')"
            name="password"
            id="signup-form-password-confirm"
            :class="
              this.confirmedPassword === false
                ? 'border border-danger rounded px-3'
                : 'border rounded px-3'
            "
            autocomplete="off"
            v-model="repassword"
            @input="confirmPassword()"
          />
          <span
            style="
              margin-left: -35px;
              margin-right: 15px;
              z-index: 999;
              position: absulute;
            "
          >
            <i class="bi bi-lock"></i>
          </span>
        </div>
        <div class="my-2">
          <button
            type="submit"
            name="submit"
            class="text-white border-0 rounded _animation-fade"
          >
            <span v-if="loginLoading">
              <img src="dark-loader.gif" width="30px" style="opacity: 0.7" />
            </span>
            <span v-else>{{ $t("LOGIN.CREATE_ACCOUNT") }}</span>
          </button>
        </div>
        <div class="my-2">
          <a @click="toSignIn">{{ $t("LOGIN.ALREADY_ACCOUNT_LOGIN") }}</a>
        </div>
      </form>
    </div>
    <div :class="this.isResetPassword ? '_fadehi' : 'hide'">
      <h2>Reset password</h2>
      <p class="mt-3">Reset your account password</p>
      <form action="" id="signup-form" class="my-4">
        <div class="my-2">
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            id="signup-form-email"
            class="border rounded px-3"
            autocomplete="off"
          />
        </div>
        <div class="my-2">
          <button
            type="submit"
            name="submit"
            class="text-white border-0 rounded"
          >
            Reset my password
          </button>
        </div>
        <div class="my-2">
          <a @click="toSignIn">Already know your account? Login</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "@/components/ErrorMessage.vue";
import { config } from "/config.js";
import Web3Modal from "web3modal";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNarwallets } from "@near-wallet-selector/narwallets";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupOptoWallet } from "@near-wallet-selector/opto-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
// import * as nearAPI from "near-api-js";

// imports for Unique Parachain (Polkadot)
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
// ====== END Unique Parachains imports ======

// imports for Flow
import { send as httpSend } from "@onflow/transport-http";
import * as fcl from "@onflow/fcl"


      // config flow connect screen
      fcl.config()
        .put("app.detail.title", "Walt.id Sign In Solution")
        .put("app.detail.icon", "https://images.squarespace-cdn.com/content/v1/609c0ddf94bcc0278a7cbdb4/4d493ccf-c893-4882-925f-fda3256c38f4/Walt.id_Logo_transparent.png?format=1500w")

      // config flow to use HTTP
      fcl
        .config()
        .put("accessNode.api", "https://rest-testnet.onflow.org")
        .put("sdk.transport", httpSend)

      // config discovery endpoint
      fcl.config({
        // Testnet
        "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
        // Mainnet
        // "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
      })

// ====== END Flow imports ======

const wallet = new BeaconWallet({ name: "Walt.id" });

export default {
  name: "Login",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      copyright: config.copyright,
      logo: config.logo,
      email: "",
      validEmail: true,
      password: "",
      repassword: "",
      confirmedPassword: null,
      validPassword: true,
      error: false,
      errorMessage: "",
      isSignin: true,
      isSignup: false,
      isResetPassword: false,
      loginLoading: false,
      eth_account: null,
      tezos_account: null,
      near_account: null,
      polkadot_account: null,
      flow_account: null,
    };
  },
  computed: {
    availableLocales() {
      console.log("locales", this.$i18n.locales);
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  watch : {
    nearWallet : function (val) {
     console.log("near", val);
   }
  },
  methods: {
    //We included all pages in each condition for reset whole routing states for no UX errors
    toSignIn() {
      this.isSignup = false;
      this.isResetPassword = false;
      this.isSignin = true;
    },
    toSignup() {
      this.isSignin = false;
      this.isResetPassword = false;
      this.isSignup = true;
    },
    toResetPassword() {
      this.isSignup = false;
      this.isSignin = false;
      this.isResetPassword = true;
    },
    // validate email if a domain name typed after @
    emailValidation(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async hashWithSalt(message) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(message + this.$config.SALT);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""); // convert bytes to hex string

        return hashHex;
      } catch (e) {
        console.error(e);
      }
    },
    async login() {
      this.loginLoading = true;
      this.resetError();
      // check if  email && pw not empty === login
      if (this.emailValidation(this.email) && this.password.length > 0) {
        try {
          const loginResponse = await this.$auth.loginWith("local", {
            data: {
              id: this.email,
              password: this.password,
            },
          });
          this.$auth.setUser(loginResponse.data);
          this.$router.push("/");
          //this.loginLoading=false
        } catch (e) {
          this.loginLoading = false;
          console.log(e.response.data);
          this.error = true;
          this.errorMessage = e.response.data;
        }
      }
      // check if both wrong: email && pw not empty
      else if (
        this.emailValidation(this.email) === false &&
        this.password.length === 0
      ) {
        this.validEmail = false;
        this.validPassword = false;
        this.error = true;
        this.errorMessage = "Please verify your credentials!";
        this.loginLoading = false;
      }
      // check if just email is not validate
      else if (this.emailValidation(this.email) === false) {
        this.validEmail = false;
        this.error = true;
        this.errorMessage = "Please verify your email!";
        this.loginLoading = false;
      }
      // check just the pw is empty
      else if (this.password.length === 0) {
        this.validPassword = false;
        this.error = true;
        this.errorMessage = "Please fill your password!";
        this.loginLoading = false;
      }
    },
    async metamask() {
      const ethereum = window.ethereum;
      if (typeof ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        this.eth_account = account;
        try {
          const loginResponse = await this.$auth.loginWith("local", {
            data: {
              id: `eth##${this.eth_account}`,
            },
          });
          this.$auth.options.redirect = false;
          this.$auth.setUser(loginResponse.data);
          this.$store.commit("wallet/setDefaultChain", config.evmDefaultChain);
          this.$router.push("/nfts");
        } catch (e) {
          console.log(e.response.data);
          this.error = true;
          this.errorMessage = e.response.data.title;
        }
      } else {
        this.error = true;
        this.errorMessage = "Please install MetaMask!";
      }
    },
    async web3modal() {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions: undefined, // required
      });
      const provider = await web3Modal.connect();
      console.log("provider", provider);
      if (provider.isMetaMask) {
        this.eth_account = provider.selectedAddress;
      } else {
        this.eth_account = provider.accounts[0];
        provider.disconnect();
      }

      try {
        const loginResponse = await this.$auth.loginWith("local", {
          data: {
            id: `${this.eth_account}`,
          },
        });
        console.log(loginResponse.data);
        this.$auth.options.redirect = false;
        this.$auth.setUser(loginResponse.data);
        this.$store.commit("wallet/setDefaultChain", config.evmDefaultChain);
        this.$router.push("/nfts");
      } catch (e) {
        console.log(e.response.data);
        this.error = true;
        this.errorMessage = e.response.data.title;
      }
    },
    async beaconTezosWallet() {
      try {
        const permissions = await wallet.client.requestPermissions();
        this.tezos_account = permissions.address;
        const loginResponse = await this.$auth.loginWith("local", {
          data: {
            id: `${this.tezos_account}`,
          },
        });
        this.$auth.options.redirect = false;
        this.$store.commit("wallet/setDefaultChain", config.tezosdefaultChain);
        this.$auth.setUser(loginResponse.data);
        this.$router.push("/nfts");
      } catch (error) {
        console.log("Got error:", error);
      }
    },

    async nearWallet() {
      try {
        const selector = await setupWalletSelector({
          network: "testnet",
          modules: [
            ...(await setupDefaultWallets()),
            setupNearWallet(),
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupMathWallet(),
            setupNightly(),
            setupMeteorWallet(),
            setupNarwallets(),
            setupWelldoneWallet(),
            setupLedger(),
            setupNearFi(),
            setupCoin98Wallet(),
            setupOptoWallet(),
            setupNeth(),
            setupXDEFI(),

            setupNightlyConnect({
              url: "wss://relay.nightly.app/app",
              appMetadata: {
                additionalInfo: "",
                application: "NEAR Wallet Selector",
                description: "Example dApp used by NEAR Wallet Selector",
                icon: "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png",
              },
            }),
          ],
        });
        const modal = setupModal(selector, {
          title: "Select a wallet",
          description: "Select a wallet to connect to this dApp",
        });

        modal.show();

        const wallet = await selector.wallet("my-near-wallet");
        await wallet.signOut();
        const accounts = await wallet.getAccounts();
        if(accounts.length > 0 && accounts[0].accountId){
          let accountId = accounts[0].accountId
          this.loginWithNearAccount(accountId)
        }
      } catch (error) {
        console.log("Got error:", error);
      }
    },
    async loginWithNearAccount(accountId = this.$route.query.account_id){
      if (accountId) {
        this.near_account = accountId;
        const loginResponse = await this.$auth.loginWith("local", {
          data: {
            id: `${this.near_account}`,
          },
        });
        this.$auth.options.redirect = false;
        this.$store.commit("wallet/setDefaultChain", config.neardefaultChain);
        this.$auth.setUser(loginResponse.data);
        await this.$router.push("/nfts");
      }
    },
    // Connect polkadot-related ecosystems
    async polkadotjsWallet() {
      // Request permission to access accounts
      const extensions = await web3Enable('Walt.id | Wallet');
      if (extensions.length === 0) {
        // No extension installed, or the user did not accept the authorization
        return;
      }

      // Get all the accounts
      const allAccounts = await web3Accounts();
      if (allAccounts.length === 0) {
        // No account has been found
        return;
      }

      // Use the first account
      const account = allAccounts[0];
      this.polkadot_account = account.address;

      const loginResponse = await this.$auth.loginWith("local", {
          data: {
            id: `pol##${this.polkadot_account}`,
          },
        });

      this.$auth.options.redirect = false;
      this.$store.commit("wallet/setDefaultChain", config.polkadotdefaultChain);
      this.$auth.setUser(loginResponse.data);
      this.$router.push("/nfts");
    },
    async flowWallet() {
      fcl.authenticate()
      fcl.currentUser.subscribe(async (currentUser) => {
        console.log("The Current User", currentUser);

        this.flow_account = currentUser.addr;

        const loginResponse = await this.$auth.loginWith("local", {
          data: {
            id: `${this.flow_account}`,
          },
        });
        this.$auth.options.redirect = false;
        this.$store.commit("wallet/setDefaultChain", config.flowdefaultChain);
        this.$auth.setUser(loginResponse.data);
        this.$router.push("/nfts");
      })
    },
    // is a use Experience method to reset error state in retyping
    resetError() {
      this.validEmail = true;
      this.validPassword = true;
      this.error = false;
    },
    //confirm the password
    confirmPassword() {
      if (this.password.length > 0 && this.repassword.length > 0) {
        this.password === this.repassword
          ? (this.confirmedPassword = true)
          : (this.confirmedPassword = false);
      }
    },
  },
  created(){
    if(this.$route.hash === '#nearwallet'){
      this.loginWithNearAccount()
    }
  },
};
</script>
