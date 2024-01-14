<template>
  <div>
    <p class="c1" style="margin-bottom: 4px">Imagem</p>
    <div v-if="attachment" class="d-flex">
      <div class="selection-attachment filled" @click="openPreview">
        <img src="@/assets/icons/icon-image.svg" alt="icone image" />
        <p class="c2">{{ attachment.name }}</p>
      </div>
      <custom-button
        type="button"
        size="small"
        radius="0 6px 6px 0"
        style="padding: 6px 12px"
        @click="removeAttachment"
      >
        <img src="@/assets/icons/icon-delete.svg" alt="icone remover" />
      </custom-button>
    </div>
    <div v-else class="selection-attachment" @click="input?.click()">
      <img src="@/assets/icons/icon-upload.svg" alt="icone upload" />
      <p class="c2">Selecionar anexo</p>
    </div>
    <input :ref="inputRef" class="d-none" type="file" @change="changeFile" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateUUID } from '@/helpers/uuid/uuid.helper'
import CustomButton from '@/components/geral/custom-button/CustomButton.vue'

export type AttachmentType = {
  name: string
  base64: string
  linkPreview: string
}

export default defineComponent({
  name: 'FileField',
  components: {
    CustomButton
  },
  setup() {
    return {
      inputRef: generateUUID()
    }
  },
  data() {
    return {
      attachment: null as null | AttachmentType
    }
  },
  computed: {
    input() {
      return this.$refs[this.inputRef] as HTMLInputElement
    }
  },
  methods: {
    openPreview() {
      const { linkPreview } = this.attachment ?? {}
      if (linkPreview) {
        window.open(linkPreview, '_blank')
      }
    },
    removeAttachment() {
      this.attachment = null
    },
    changeFile(event: Event) {
      const target = event.target as HTMLInputElement
      const file = target.files?.item(0)

      if (file) {
        this.toBase64(file)
          .then((data) => {
            this.attachment = {
              name: file.name,
              base64: data as string,
              linkPreview: URL.createObjectURL(file)
            }
          })
          .finally(() => (this.input.value = ''))
      }
    },
    toBase64(file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
      })
    }
  }
})
</script>

<style scoped>
.selection-attachment {
  width: 100%;
  gap: 0.5rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  justify-content: flex-start;
  background-color: var(--c9);
  border: 2px solid transparent;
  transition: 0.3s;
}

.selection-attachment:hover {
  border-color: var(--cp2);
}

.selection-attachment.filled {
  border-radius: 6px 0 0 6px;
}
</style>
