<template>
  <div class="">
    <section class=" identity-wrapper">
      <header class="identity-header">
        <!-- 按鈕切換 -->
        <button
          :class="[isModeLogin? use: die]"
          @click="isModeLogin=!isModeLogin"
          :disabled='isModeLogin'
        >
          Login
        </button>

        <button
          :class="[!isModeLogin? use: die]"
          @click="isModeLogin=!isModeLogin"
          :disabled='!isModeLogin'
        >
          Signup
        </button>
      </header>

      <main class="identity-body">
        <!-- 登入表單 -->
        <form
          class="pure-form pure-form-aligned form-align"
          v-if="isModeLogin"
          key="login"
        >
          <fieldset>
            <div class="pure-control-group">
              <label for="aligned-email">Email</label>
              <input
                type="email"
                id="aligned-email"
                placeholder="Email"
                v-model="login.email"
                autocomplete='username'
              >
            </div>

            <div class="pure-control-group">
              <label for="aligned-password">Password</label>
              <input
                type="password"
                id="aligned-password"
                placeholder="Password"
                v-model="login.pwd"
                autocomplete="current-password"
              >
            </div>
          </fieldset>

          <!-- 警告 -->
          <span
            class=""
            v-if="loginFeedback"
          >{{ loginFeedback }}</span>
        </form>

        <!-- 註冊表單 -->
        <form
          class="pure-form pure-form-aligned form-align"
          v-if="!isModeLogin"
          key="signup"
        >
          <fieldset>
            <div class="pure-control-group">
              <label for="aligned-email2">Email</label>
              <input
                type="email"
                id="aligned-email2"
                placeholder="Each email register once"
                v-model="signup.email"
              >
            </div>

            <div class="pure-control-group">
              <label for="aligned-name">User Name</label>
              <input
                type="text"
                id="aligned-name"
                placeholder="Jack"
                v-model.lazy="signup.userID"
              >
              <!-- 帳號是否存在? -->
              <small>
                <span
                  class="warning"
                  v-if="idFeedback"
                >
                  {{ idFeedback }}
                </span>
              </small>
            </div>

            <div class="pure-control-group">
              <label for="aligned-password2">Password</label>
              <input
                type="password"
                id="aligned-password2"
                placeholder="At least 6 charcode"
                v-model="signup.pwd"
                autocomplete="off"
              >
            </div>

            <div class="pure-control-group">
              <label for="pwd-check">Repeat Password</label>
              <input
                type="password"
                id="pwd-check"
                placeholder="Confirm your password"
                v-model="signup.pwd2"
                autocomplete="off"
              >
            </div>
          </fieldset>

          <!-- 密碼是否一致? -->
          <span
            class=""
            v-if="pwdCheck"
          >{{ pwdCheck }}</span>
          <!-- Firebase 回傳的問題 -->
          <span
            class=""
            v-if='firebaseFeedback'
          >{{ firebaseFeedback }}</span>
        </form>
      </main>

      <footer class="identity-footer">
        <button
          class="submit-button"
          v-if="isModeLogin"
          key="login"
          @click="loginSend"
        >
          Login
        </button>
        <button
          class="submit-button"
          v-else
          key="signup"
          @click="signupSend"
        >
          Signup
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth, db } from '../fetch/firebase.js'
export default {
  data () {
    return {
      die: 'btnDie', // Button not in use
      firebaseFeedback: null, // Signup error message from firebase
      isModeLogin: true, // Identity Mode
      login: {
        email: '',
        pwd: ''
      },
      loginFeedback: null, // Login has some error
      pwdCheckPass: false, // Password pass?
      use: 'btnUse', // Button in use
      signup: {
        userID: '',
        pwd: '',
        pwd2: '',
        email: ''
      }
    }
  },
  methods: {
    pwdRes (val) {
      if (val) {
        this.pwdCheckPass = true;
      } else {
        this.pwdCheckPass = false;
      }
    },

    signupSend () {
      if (this.userIDCheck && this.pwdCheckPass && this.signup.email) {
        auth.createUserWithEmailAndPassword(this.signup.email, this.signup.pwd2)
          .then(cred => {
            this.userIDChange.set({
              userName: this.signup.userID,
              userID: cred.user.uid,
              likeList: []
            })
            this.$store.commit('userMutate', { type: 'id', value: this.signup.userID });
            this.$store.commit('userMutate', { type: 'name', value: cred.user.uid });
            this.$store.commit('likeListMutate', []);
          })
          .then(() => {
            this.$router.go(-1);
            this.signup.userID = '';
            this.signup.pwd = '';
            this.signup.pwd2 = '';
            this.signup.email = '';
          })
          .catch(err => {
            // console.log(err);
            this.firebaseFeedback = err.message;
          });
      } else {
        alert('Make sure you fill every form correctly');
      }
    },

    loginSend () {
      if (this.login.email && this.login.pwd) {
        auth.signInWithEmailAndPassword(this.login.email, this.login.pwd)
          .then(cred => {
            this.$router.go(-1);
            db.collection('users').where('userID', '==', cred.user.uid)
              .get().then(snapshots => {
                snapshots.docs.forEach(snapshot => {
                  this.$store.commit('userMutate', { type: 'id', value: snapshot.data().userID });
                  this.$store.commit('userMutate', { type: 'name', value: snapshot.id });
                  this.$store.commit('likeListMutate', snapshot.data().likeList);
                })
              })
              .then(() => {
                this.login.email = '';
                this.login.pwd = '';
              })
          })
          .catch(err => {
            this.loginFeedback = err.message;
          })
      } else {
        this.loginFeedback = 'Email or Password is Wrong.';
      }
    }
  },
  computed: {
    ...mapState([
      'idFeedback',
      'userIDCheck'
    ]),

    userIDChange () {
      if (this.signup.userID) {
        let convert = this.signup.userID.replace(/[$*_+~.()'"!\-:@^#{} ]/g, '-');
        let name = convert.toLowerCase();
        this.$store.dispatch('checkUniqueName', name);
        return name;
      } else {
        return null;
      }
    },

    pwdCheck () {
      if (this.signup.pwd && this.signup.pwd2) {
        if (this.signup.pwd === this.signup.pwd2) {
          this.pwdRes(true);
        } else {
          this.pwdRes(false);
          return 'Check the difference in your password';
        }
        return null;
      } else {
        return null;
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/form.css';
@import '../styles/modal.scss';
.btnUse, .btnDie{
  width: 50%;
  background-color: $second;
  color: $background;
  border: none;
  height: 100%;
  padding: 0.5rem;
  font-size: 2rem;
  user-select: none;
}

.btnUse:focus,.btnDie:focus{
  outline: none;
}

.btnUse{
  border-top: 3px solid $contrast;
}

.btnDie{
  background-color: darken($second, 10%);
  border-top: 3px solid darken($second, 10%);
  cursor: pointer;
}

.form-align{
  padding-top: 0.5rem;
}

.identity-body{
  background-color: $second;
  color: $background;
  flex-grow: 1;
}

.identity-footer{
  height: 10%;
}

.identity-header{
  height: 10%;
}

.identity-wrapper{
  max-width: $mobile;
  height: 100%;
  background-color: $first;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.submit-button{
  width: 100%;
  height: 100%;
  background-color: $contrast;
  border: none;
  color: $background;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  outline: none;
  cursor: pointer;
  &:hover{
    font-size: 1.8rem;
  }
}

.warning{
  display: block;
  margin: 1rem 0;
}

@media only screen and (max-width: $medium){
  .btnUse, .btnDie{
    width: 50vw;
    height: 100%;
    padding: 0.5rem;
    font-size: 2rem;
  }

  .form-align{
    padding-top: unset;
  }

  .identity-wrapper{
    max-width: none;
    width: 100vw;
    height: calc(100vh - 50px);
  }

  .pure-control-group input{
    width: 96%;
    margin: 0 2%;
  }

  .submit-button{
    padding: unset;
  }
}
</style>
