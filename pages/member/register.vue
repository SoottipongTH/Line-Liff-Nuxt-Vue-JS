<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-6 text-title text-center">สมัครสมาชิก</div>
        </v-col>
        <v-col cols="12" class="text-center mt-2">
          <v-avatar size="155">
            <img
              v-if="getLine.pictureUrl == ''"
              src="~/assets/profile.png"
              alt=""
            />
            <img v-else :src="getLine.pictureUrl" alt="" />
          </v-avatar>
        </v-col>
        <v-col cols="12" class="text-center mt-2 displayName">
          {{ getLine.displayName }}
        </v-col>
        <v-col cols="12">
          <v-form>
            <v-text-field
              v-model="form.firstname"
              dense
              :rules="nameRules"
              @keypress="onlyChar($event, 30)"
              label="First name"
              required
              class="mt-4"
            ></v-text-field>
            <v-text-field
              v-model="form.lastname"
              dense
              :rules="surRules"
              @keypress="onlyChar($event, 30)"
              label="Last name"
              required
              class="mt-4"
            ></v-text-field>
            <v-text-field
              v-model="form.phoneNumber"
              dense
              :rules="phoneRules"
              @keypress="onlyNumber($event, 10)"
              label="Phone Number"
              required
              class="mt-4"
            ></v-text-field>
            <div class="mt-8 text-center btn">
              <v-btn color="success" class="w-100" dark large @click="register">
                ยืนยัน
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const REGEX_PHONE = /^[0]([0-9]{9})*$/;
const REGEX_NUMBER = /^[0-9]*$/;
export default {
  // mounted() {
  //   liff
  //     .init({
  //       liffId: "1657446172-5aR2wRl8",
  //     })
  //     .then(() => {
  //       if (liff.isLoggedIn()) {
  //         liff.getProfile().then((profile) => {
  //           this.$store.dispatch("setLine", profile)
  //         });
  //       }
  //     });
  // },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    }
  },
  data() {
    return {
      form: {
        firstname: this.$store.getters.getUserInfo.firstname,
        lastname: this.$store.getters.getUserInfo.lastname,
        phoneNumber: this.$store.getters.getUserInfo.phoneNumber,
        points: this.$store.getters.getUserInfo.points
      },
      modal: false,
      phoneValidated: false,
      nameValidated: false,
      surValidated: false,
      nameRules: [(value) => this.nameValidator(value)],
      surRules: [(value) => this.surValidator(value)],
      phoneRules: [(value) => this.phoneValidator(value)],
    };
  },
  methods: {
    nameValidator(value) {
      this.nameValidated = false;
      if (value == "") {
        return "กรุณาใส่ชื่อ";
      } else {
        this.nameValidated = true;
        return true;
      }
    },
    surValidator(value) {
      this.surValidated = false;
      if (value == "") {
        return "กรุณาใส่นามสกุล";
      } else {
        this.surValidated = true;
        return true;
      }
    },
    phoneValidator(value) {
      this.phoneValidated = false;
      if (value == "") {
        return "กรุณาใส่หมายเลขโทรศัพท์";
      }
      if (REGEX_PHONE.test(value) && value.length == 10) {
        this.phoneValidated = true;
        return true;
      }
      return "ใส่หมายเลขให้ครบ 10 หลัก";
    },
    validate() {
      let validated = true;
      const validateField = ["firstname", "lastname", "phoneNumber"];
      validateField.forEach((field) => {
        if (this.form[field] == "") {
          validated = false;
        }
        if (!this.phoneValidated) {
          validated = false;
        }
        if (!this.nameValidated) {
          validated = false;
        }
        if (!this.surValidated) {
          validated = false;
        }
      });
      return validated;
    },
    onlyNumber(event, max) {
      if (event.target.value.length == 0) {
        if (event.key != 0) {
          return event.preventDefault();
        }
      } else {
        if (!REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
          return event.preventDefault();
        }
      }
    },
    onlyChar(event, max) {
      if (REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
        return event.preventDefault();
      }
    },
    register() {
      if (this.validate()) {
        this.$store.dispatch("setUserInfo", this.form);
        this.$axios
          .patch(
            `https://nuxt-vue-master-default-rtdb.asia-southeast1.firebasedatabase.app/members/${this.$store.getters.getLine.userId}/profile.json`,
            this.$store.getters.getUserInfo
          )
          .then((res) => {
            this.$router.push("/member/dash");
          }).catch(e => console.log(e))
      }
    },
  },
};
</script>

<style lang="css" scoped>
.v-form {
  padding: 0 40px;
}
.displayName {
  font-size: 25px;
  font-weight: bold;
}
</style>
