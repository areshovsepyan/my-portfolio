<template>
  <section class="hobbies-section">
    <ul>
      <li>
        <p>Javascript</p>
      </li>
      <li>
        <p>Vue</p>
      </li>
      <li>
        <p>Coffee</p>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.hobbies-section {
  display: flex;
  justify-content: center;

  ul {
    display: flex;
    flex-direction: column;
    gap: 5rem;

    @media (min-width: 1024px) {
      gap: 7rem;
    }

    li {
      text-align: center;

      &:nth-child(1) {
        color: var(--vt-c-purple-300);
      }
      &:nth-child(2) {
        color: var(--vt-c-purple-600);
      }
      &:nth-child(3) {
        color: var(--vt-c-purple-800);
      }

      p {
        font-size: 60px;
        font-weight: 600;

        @media (min-width: 1024px) {
          font-size: 100px;
        }
      }
    }
  }
}
</style>
