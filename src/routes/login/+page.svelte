<script lang="ts">
  import { Label, Input, Button, Alert } from "flowbite-svelte";
  import { login } from "$lib/api/auth";
  import { goto } from "$app/navigation";
  import axios from "axios";
  let mode = "login";
  let username = "";
  let password = "";
  let error: null | string = null;

  function onLogin() {
    error = null;
    login(username, password)
      .then((res) => {
        console.log(res);
        goto("/");
      })
      .catch((err) => {
        error = err;
        console.log(err);
      });
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 h-screen">
  <div class="bg-primary-700 flex items-center justify-center min-h-[150px]">
    <h1
      class="text-white font-bold lg:text-7xl md:text-5xl text-2xl bold text-center"
    >
      Dream, Create & Collabortate
    </h1>
  </div>
  <div class=" items-center w-full mt-9 flex items-center">
    <div class="w-full">
     

      {#if mode === "login"}
        <h1
          class="text-primary-900 font-bold lg:text-4xl md:text-5xl text-2xl bold text-center"
        >
          Login
        </h1>
        <div class="m-9 space-y-4">
            {#if error}
            <Alert color="red">Error logging in, retry or <a href="#">Reset Password?</a> </Alert>
          {/if}
          <Input
            id="large-input"
            size="lg"
            placeholder="Username"
            bind:value={username}
          />
          <Input
            id="large-input"
            size="lg"
            placeholder="Password"
            bind:value={password}
          />
          <div class="flex flex-row justify-center text-center">
            <div>
              <Button
                class="bg-primary-600 hover:bg-primary-600"
                on:click={onLogin}
              >
                <i class="fas fa-sign-in-alt mr-4" />
                Login
              </Button>

              <p class="mt-4 text-xs">
                <a href="#">Forgot Password?</a> | <a href="#">Register</a>
              </p>
            </div>
          </div>
        </div>
      {:else}
        <h1
          class="text-primary-900 font-bold lg:text-4xl md:text-5xl text-2xl bold text-center"
        >
          Register
        </h1>
        <div class="m-9 space-y-4">
          <Input id="large-input" size="lg" placeholder="Firstname" />
          <Input id="large-input" size="lg" placeholder="Lastname" />
          <Input id="large-input" size="lg" placeholder="Username" />
          <Input id="large-input" size="lg" placeholder="Password" />
          <Input id="large-input" size="lg" placeholder="Repeat Password" />
          <div class="flex flex-row justify-end">
            <Button class="bg-primary-600 hover:bg-primary-600">
              <i class="fas fa-user-plus mr-4" />
              Register</Button
            >
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
