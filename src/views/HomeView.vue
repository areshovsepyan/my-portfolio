<template>
  <IntroductionSection />
  <ExperienceSection />
  <HobbiesSection />
  <TechnologiesSection />
</template>

<script>
import IntroductionSection from '@/components/IntroductionSection.vue'
import HobbiesSection from '@/components/HobbiesSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import TechnologiesSection from '@/components/TechnologiesSection.vue'

export default {
  components: {
    IntroductionSection,
    HobbiesSection,
    ExperienceSection,
    TechnologiesSection,
  },
  data: () => {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
