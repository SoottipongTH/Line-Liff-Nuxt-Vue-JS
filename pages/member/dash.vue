<template>
  <v-container class="pt-0 pb-0">
    <v-row>
      <v-col cols="12">
        <div class="mt-6 text-title text-center">MEMBER</div>
      </v-col>
      <v-col class="text-center">
        <v-avatar size="130">
          <img :src="getLine.pictureUrl" alt="" />
        </v-avatar>
      </v-col>
      <v-col class="text-sub">
        <div class="mt-5">
          <v-icon> mdi-account-box </v-icon>
          {{ getUserInfo.firstname }}
        </div>
        <div class="mt-5">
          <v-icon> mdi-cellphone </v-icon>
          {{ getUserInfo.phoneNumber }}
        </div>
        <div class="mt-5">
          <v-icon> mdi-alpha-p-circle-outline</v-icon>
          {{ getUserInfo.points }} แต้ม
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <h1 class="text-center text-title">THIS IS NEW ROLE</h1>
    </v-row>
    <v-bottom-navigation color="primary" class="mt-5">
      <v-btn @click="reward">
        <span>Reward</span>
        <v-icon>mdi-gift-open</v-icon>
      </v-btn>
      <v-btn @click="scan">
        <span>SCAN</span>
        <v-icon>mdi-barcode-scan</v-icon>
      </v-btn>
      <v-btn @click="facebook">
        <span>FB</span>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- <v-footer padless class="mt-8">
      <v-row justify="center" no-gutters>
        <v-btn color="black" text class="my-2" @click="facebook">
          <v-icon> mdi-facebook </v-icon>
          {{ index.facebook }}
        </v-btn>
        <v-col class="text-center black--text" cols="12">
          THE PREMIUM @KU — <strong>EST. 2022</strong>
        </v-col>
      </v-row>
    </v-footer> -->
  </v-container>
</template>

<script>
export default {
  mounted() {
    liff
      .init({
        liffId: "1657446172-5aR2wRl8",
      })
      .then(() => {
        liff.getProfile().then((profile) => {
          this.$store.dispatch("setLine", profile);
          this.getData();
        });
      });
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  methods: {
    scan(){

    },
    reward(){
      return

    },
    facebook() {
      this.$router.push(`https://web.facebook.com/ThePremiumKU`)
    },
    getData() {
      this.$axios
        .get(
          `https://nuxt-vue-master-default-rtdb.asia-southeast1.firebasedatabase.app/members/${this.$store.getters.getLine.userId}/profile.json`
        )
        .then((res) => {
          if (res.data != null) {
            this.$store.dispatch("setUserInfo", res.data);
          }
        });
    },
  },
};
</script>

<style lang="css" scoped>
.footer {
  margin-buttom: auto;
}
</style>
