<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const nameRules = [(v) => !!v || "Name is required"];

const form = ref(null);
const valid = ref(true);
const selectedFriend = ref({
  firstName: "",
  lastName: "",
  gender: "male",
  fav: false,
});
const router = useRouter();

const genders = {
  male: "male",
  female: "female",
  undisclosed: "undisclosed",
};

const submit = async () => {
  const submission = {
    ...selectedFriend.value,
  };
  await axios.post("http://localhost:3000/friends", submission);
  router.push({ name: "people" });
};

const reset = () => {
  form.value.reset();
};
</script>

<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="selectedFriend.firstName"
        :rules="nameRules"
        label="First name*"
        validate-on="blur"
        required
      ></v-text-field>

      <v-text-field
        v-model="selectedFriend.lastName"
        :rules="nameRules"
        label="Last name*"
        validate-on="blur"
        required
      ></v-text-field>

      <v-checkbox
        v-model="selectedFriend.fav"
        label="Fav?"
        id="fav"
        required
      ></v-checkbox>

      <v-radio-group v-model="selectedFriend.gender" row>
        <v-radio label="Male" :value="genders.male"></v-radio>
        <v-radio label="Female" :value="genders.female"></v-radio>
        <v-radio label="Undisclosed" :value="genders.undisclosed"></v-radio>
      </v-radio-group>

      <v-btn color="success" class="mr-4" :disabled="!valid" @click="submit">
        Submit
      </v-btn>
      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      <v-btn color="warning" :to="{ name: 'people' }"> Cancel </v-btn>
    </v-form>
  </v-container>
</template>
