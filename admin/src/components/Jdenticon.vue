<template>
    <el-tooltip
      v-if="size === 'small'"
      class="item"
      effect="dark"
      :content="this.title"
      :placement="tipPlacement">
      <div class="identicon" v-html='identicon'></div>
    </el-tooltip>
    <div v-else class="identicon" v-html='identicon'></div>
</template>
<script>
import jdenticon from 'jdenticon'
export default {
  name: 'Jdenticon',
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      validator: (val) => ['small', 'medium', 'large'].includes(val)
    },
    tipPlacement: {
      validator: prop => typeof prop === 'string' || prop === null
    }
  },
  data () {
    return {
      sizeSvg: {
        small: 40,
        medium: 60,
        large: 100
      }
    }
  },
  computed: {
    identicon: function () {
      return jdenticon.toSvg(this.value, this.sizeSvg[`${this.size}`])
    }
  }
}
</script>

<style lang="scss">
.identicon {
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    background-color: var(--light-background);
    border: var(--base-border);
    border-radius:50%;
  }
}
</style>
