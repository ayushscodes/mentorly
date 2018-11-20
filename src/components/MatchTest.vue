<template>
  <form class='component'>
    <h3>Find Match</h3>

    <div class='form-group'>
      <label for='skill'>Desired Skill:</label>
      <textarea id='skill' v-model.trim='skill' type='text' name='content'></textarea>
    </div>

    <p>Welcome kacie@mit.edu!</p>

    <input type='submit' value='Find Match' v-on:click.prevent='findMatch' method="get">

    <div v-if='success' class="success-message">
      {{ success }}
    </div>

    <div v-if='errors.length' class="error-message">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </form>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "CreateFreet",

  data() {
    return {
      errors: [],
      success: "",
      skill: ""
    };
  },

  methods: {
    resetForm: function() {
      this.skill = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.success = "";
      }, 5000);
    },

    findMatch: function() {
      // TODO: Include data validation

      axios.get('/api/circles/' + this.skill)
        .then((res) => {
          this.success = res.data;
        })
        .catch((response) => {
          this.errors.push(response.response.data);
        }).then(() => {
          this.resetForm();
          this.clearMessages();
        });
    }
  }
};
</script>