<script lang="ts">
  import { Input, Button, Alert } from "flowbite-svelte";
  import { login, register } from "$lib/api/auth";
  import { goto } from "$app/navigation";
  let mode = "login";
  let username = "";
  let password = "";
  let error: null | string = null;
  let registration = {
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    last_name: "",
  };

  function registerMode() {
    error = null;
    mode = "register";
  }

  function onLogin() {
    error = null;
    login(username, password)
      .then((res) => {
        goto("/");
      })
      .catch((err) => {
        error = err;
      });
  }

  function onRegister() {
    error = null;
    register(registration)
      .then((res) => {
        goto("/");
      })
      .catch((err) => {
        error = err;
      });
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 h-screen">
  <div class="bg-primary-700 flex items-center justify-center min-h-[150px]">
    <h1
      class="text-white font-bold lg:text-7xl md:text-5xl text-2xl bold text-center"
    >
      Dream, Create & <br />Collabortate
    </h1>
  </div>

  <div class=" items-center w-full mt-9 flex items-center">
    <div class="w-full">
      {#if error}
        <div class="m-9">
          <Alert color="red"
            >{@html error}
          </Alert>
        </div>
      {/if}
      {#if mode === "login"}
        <h1
          class="text-primary-900 font-bold lg:text-4xl md:text-5xl text-2xl bold text-center"
        >
          Login
        </h1>
        <div class="m-9 space-y-4">
          <Input
            id="large-input"
            size="lg"
            placeholder="Email"
            bind:value={username}
          />
          <Input
            id="large-input"
            size="lg"
            type="password"
            placeholder="Password"
            bind:value={password}
          />
          <div class="flex flex-row justify-center text-center">
            <div class="w-full">
              <Button
                class="bg-primary-600 hover:bg-primary-600 w-full"
                on:click={onLogin}
              >
                <i class="fas fa-sign-in-alt mr-4" />
                Login
              </Button>

              <p class="mt-9 text-xl font-bold">
                <a href="#" class="hover:text-primary-900">Forgot Password</a> |
                <a class="hover:text-primary-900" on:click={registerMode}
                  >Register</a
                >
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
          <Input
            size="lg"
            placeholder="Firstname"
            bind:value={registration.name}
          />
          <Input
            size="lg"
            placeholder="Lastname"
            bind:value={registration.last_name}
          />
          <Input
            size="lg"
            placeholder="Email"
            bind:value={registration.email}
          />
          <Input
            type="password"
            size="lg"
            placeholder="Password"
            bind:value={registration.password}
          />
          <Input
            type="password"
            size="lg"
            placeholder="Repeat Password"
            bind:value={registration.passwordConfirm}
          />
          <div class="flex flex-row justify-end">
            <Button
              class="bg-primary-600 hover:bg-primary-600 w-full"
              on:click={onRegister}
            >
              <i class="fas fa-user-plus mr-4" />
              Register</Button
            >
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
