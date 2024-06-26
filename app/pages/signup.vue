<template>
  <div class="flex items-center justify-center h-screen dark:bg-gray-900">
    <div>
      <div class="relative mt-12 sm:mt-16">
        <h1 class="text-2xl font-medium tracking-tight text-center text-gray-900 dark:text-white">
          Create a new account
        </h1>
        <p class="mt-3 text-lg text-center text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink to="/login" class="text-cyan-600">
            Sign in
          </NuxtLink>
        </p>
      </div>
      <div class="flex-auto px-4 py-10 mt-10 -mx-4 bg-white shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24">
        <FormKit type="form" :actions="false" @submit="signup">
          <div class="grid grid-cols-2 gap-6 max-[420px]:grid-cols-1">
            <FormKit
              type="text"
              name="username"
              label="Username"
              validation="required"
              auto-complete="username"
              outer-class="col-span-full"
            />
            <FormKit
              type="text"
              name="firstName"
              label="First name"
              validation="required"
              auto-complete="firstName"
            />
            <FormKit
              type="text"
              name="lastName"
              label="Last name"
              validation="required"
              auto-complete="lastName"
            />
            <FormKit
              type="password"
              name="password"
              label="Password"
              validation="required|length:8"
              auto-complete="password"
            />
            <FormKit
              type="password"
              name="password_confirm"
              label="Confirm password"
              validation="required|confirm"
            />
            <FormKit type="submit" input-class="w-full">
              <span class="inline w-full text-center">Sign up</span>
            </FormKit>
            <FormKit type="button" input-class="w-full $remove:px-7 $remove:py-3">
              <NuxtLink to="/login" class="inline w-full py-3 text-center px-7">
                Sign in
              </NuxtLink>
            </FormKit>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { definePageMeta } from '#imports'

definePageMeta({
  auth: false,
  layout: false
})

async function signup (formData) {
  try {
    const res = await $fetch('/api/users/', {
      method: 'POST',
      body: {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      }
    })
    if (res.id) {
      toast.success('Welcome! You have signed up')
    }
  } catch (e) {
    let errorMessage
    switch (e.statusCode) {
      case 409:
        errorMessage = 'Username already exists'
        break
      default:
        errorMessage = 'Error occurred! Please try again'
    }
    toast.error(errorMessage)
  }
}
</script>
