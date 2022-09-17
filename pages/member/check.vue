<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-avatar size="155">
          <img src="~/assets/loading.gif" />
        </v-avatar>
      </v-col>
      <v-col cols="12" class="text text-center">
        กำลังตรวจสอบข้อมูลกรุณารอสักครู่
      </v-col>
    </v-row>
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
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            this.$store.dispatch("setLine", profile);
            this.isMember();
          });
        } else {
          liff.login();
        }
      });
  },
  computed: {
    getLine() {
      return this.$store.getters.getLine;
    },
  },
  methods: {
    isMember() {
      this.$axios
        .get(
          `https://nuxt-vue-master-default-rtdb.asia-southeast1.firebasedatabase.app/members/${this.$store.getters.getLine.userId}/profile.json`
        )
        .then((res) => {
          if (res.data != null) {
            this.$router.push("/member/dash");
          } else {
            this.$router.push("/member/register");
          }
        });
    },
  },
};
</script>

<style lang="css" scoped></style>
