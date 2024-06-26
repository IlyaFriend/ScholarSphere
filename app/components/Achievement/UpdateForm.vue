<template>
  <DynamicForm
    submit-label="Update"
    class="mt-4"
    :fields="fields"
    @on-submit="data => handleUpdateAchievement(data)"
  />
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { updateAchievement } from '~/composables/achievements'
import { keys as nonPublicFields } from '~/utils/nonPublicKeys'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['on-update'])

const { data: user } = useAuth()

const achievementFields = { ...props.item }
const fieldsArray = []

nonPublicFields.forEach((field) => {
  delete achievementFields[field]
})
delete achievementFields?.score

for (const [key, value] of Object.entries(achievementFields)) {
  if (key === 'details') {
    for (const [keyD, valueD] of Object.entries(value)) {
      fieldsArray.push({
        name: keyD,
        value: valueD
      })
    }
  } else {
    let fieldType
    switch (key) {
      case 'users':
        fieldType = 'users'
        break
      case 'type':
        fieldType = 'achievementType'
        break
      case 'year':
        fieldType = 'number'
        break
      default:
        fieldType = 'text'
    }

    const field: any = {
      name: key,
      value,
      type: fieldType,
      immutable: true
    }

    if (fieldType === 'users') {
      field.usersToSkip = user.value.id === props.item.createdBy ? [] : [props.item.createdBy]
    }
    fieldsArray.push(field)
  }
}

const fields = fieldsArray.reduce((acc, item, index) => {
  acc[index] = item
  return acc
}, {})

async function handleUpdateAchievement (data) {
  const { title, type, users, year, department_id, scopus_id, ...details } = data
  const achievementData = {
    title,
    type,
    year,
    department_id,
    scopus_id,
    users: user.value.id === props.item.createdBy ? users : [props.item.createdBy, ...users],
    details
  }

  try {
    const updatedAchievement = await updateAchievement(props.item._id, achievementData)
    toast.success('Achievement updated successfully')
    emits('on-update', updatedAchievement)
  } catch (error) {
    toast.error('Error occurred while updating achievement')
  }
}
</script>
