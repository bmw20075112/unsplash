<template>
    <div class="">
		<section class=" identity-wrapper">
			<header class="identity-header">
				<!-- 按鈕切換 -->
				<button :class="[isTrue? use: die]" @click="isTrue=!isTrue"
				:disabled='isTrue'>Login</button>

				<button :class="[!isTrue? use: die]" @click="isTrue=!isTrue"
				:disabled='!isTrue'>Signup</button>
			</header>

			<main class="identity-body">
                <!-- 登入表單 -->
                <form class="form" v-if="isTrue" key="login">
                    <div class="form-group">
                        <label for="email" class="label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="login.email" autocomplete='username'>
                    </div>

                    <div class="form-group">
                        <label for="pwd" class="label">Password</label>
                        <input type="password" class="form-control" id="pwd" autocomplete="current-password" 
                        v-model="login.pwd">
                    </div>

                    <input type="checkbox" name="agree" id="">
                    <label for="">Remember me</label>
                </form>

                    <!-- 註冊表單 -->
                <form class="form" v-if="!isTrue" key="signup">
                    <div class="form-group">
                        <label for="email2" class="label">Email</label>
                        <input type="email" class="form-control" id="email2" v-model="signup.email">
                    </div>

                    <div class="form-group">
                        <label for="userID2" class="label">Name</label>
                        <input type="text" class="form-control" id="userID2" v-model.lazy="signup.userID">
                        <small v-if="this.signup.userID" class="text-danger form-text">{{this.userFeedback}}</small>
                    </div>

                    <div class="form-group">
                        <label for="pwd2" class="label">Password</label>
                        <input type="password" class="form-control" id="pwd2" autocomplete="off"
                        v-model="signup.pwd">
                    </div>

                    <div class="form-group">
                        <label for="pwd-check" class="label">Password Again</label>
                        <input type="password" class="form-control" id="pwd-check" autocomplete="off"
                        v-model="signup.pwd2">
                        <small v-if="pwdCheck" class="text-danger form-text">{{pwdCheck}}</small>
                    </div>
                </form>
			</main>

            <small v-if='firebaseFeedback'>{{firebaseFeedback}}</small>

            <!-- <button @click="current()">click</button>
            <button @click="signout()">signout</button> -->

			<footer class="identity-footer">
                <button class="submit" 
                v-if="isTrue" key="login"
                @click="loginSend">Login</button>
                <button class="submit" 
                v-else key="signup"
                @click="signupSend">Signup</button>
            </footer>
		</section>
    </div>
</template>

<script>
import db from '../fetch/firebase.js'
import firebase from 'firebase';
export default {
	data() {
		return {
			isTrue:true,
			use:'btnUse',
			die:'btnDie',
			login:{
				email:'',
				pwd:''
			},
			signup:{
				userID:'',
				pwd:'',
				pwd2:'',
				email:''
			},
			feedback: null,
			pwdFeedback: false,
			userIDCheck:false,
			userIDRes:null,
			firebaseFeedback:null,
		}
	},
	methods: {
		signupSend(){
			if(this.userIDCheck && this.pwdFeedback && this.signup.email){
				firebase.auth().createUserWithEmailAndPassword(this.signup.email,this.signup.pwd2)
					.then(cred=>{
						this.userIDChange.set({
							userID: this.signup.userID,
                            user_id: cred.user.uid,
                            likeList:[]
						})
					})
					.then(()=>{
                        this.$router.push(decodeURI(this.$route.query.redirect) || '/');
                        // this.$router.push({name:'Gmap'})
                        console.log('ok');
					})
					.catch(err=>{
						console.log(err);
						this.firebaseFeedback=err.message;
					});
			}else{
				alert('請修正錯誤');
			}
        },

        current(){
            firebase.auth().onAuthStateChanged(user=>{
                if(user){
                    console.log(user);
                }
            });
        },

        signout(){
            firebase.auth().signOut().then(()=>console.log('done'));
        },
        
		loginSend(){
			if(this.login.email && this.login.pwd){
				firebase.auth().signInWithEmailAndPassword(this.login.email, this.login.pwd)
				.then(cred=>{
                    // this.$router.push({name:'Gmap'});
                    if(this.$route.query.redirect){
                        this.$router.push(decodeURI(this.$route.query.redirect));
                    }else{
                        this.$router.push('/');
                    }
                    console.log('ok');
				})
				.catch(err=>{
					alert(err.message);
				})
				
			}else{
				alert('帳號密碼皆須輸入');
			}
		}
	},
	computed: {
		userFeedback(){
			if(this.userIDChange){	
				this.userIDChange.get().then(doc=>{
					if(doc.exists){
						this.feedback= '此帳號已存在';
						this.userIDCheck=false;
					}else{
						this.feedback=null;
						this.userIDCheck=true;
					}
				});
			}
			return this.feedback;
		},
		userIDChange(){
			if(this.signup.userID){
				let convert=this.signup.userID.replace(/[$*_+~.()'"!\-:@^#{} ]/g,'-');
				let res = convert.toLowerCase();
				let ref= db.collection('users').doc(res);
				return ref;
			}
		},
		pwdCheck(){
			if(this.signup.pwd && this.signup.pwd2){
				if(this.signup.pwd===this.signup.pwd2){
					this.pwdFeedback= true;
				}else{
					this.pwdFeedback= false;
					return '密碼不一致';
				}
				
				return null;
			}
		}
	},
}
</script>

<style lang="scss">
@import '../styles/modal.scss';
$pc-width: 40vw;
.identity-wrapper{ 
    max-width: $pc-width;
    background-color: $first;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.identity-body{
    display: flex;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    background-color: $second;
    color: $background;
}

.form{
    width: 90%;
    margin: 0 auto;
    color: black;
}

.form-group{
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: $first;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 2rem;
}

.form-control{
    flex-grow: 1;
}

.label{
    flex-grow: 0;
    padding-right: 1rem;
}

.identity-footer{
    height: 10%;
}

.identity-header{
    height: 10%;
    background-color: lightblue;
}

.btnUse, .btnDie{
    width: $pc-width / 2;
    background-color: $second;
    color: $background;
    border: none;
    height: 100%;
    padding: 0.5rem;
    font-size: 2rem;
}

.btnUse{
    border-top: 2px solid $contrast;
}

.btnDie{
    background-color: darken($second, 10%);
    border-top: 2px solid darken($second, 10%);
    cursor: pointer;
}

.submit{
    width: 100%;
    height: 100%;
    background-color: $contrast;
    border: none;
    color: $background;
    padding: 1rem 2rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        font-size: 1.8rem;
    }
}

@media only screen and (max-width: $medium){
    .identity-wrapper{
        max-width: none;
        width: 100vw;
        height: calc(100vh - 50px);
    }

    .btnUse, .btnDie{
        width: 50vw;
        height: 100%;
        padding: 0.5rem;
        font-size: 2rem;
    }
}
</style>
