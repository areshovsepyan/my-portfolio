<template>
  <section class="introduction-section">
    <img src="/images/developer.png" alt="Smiling developer in front of the laptop." />
    <div class="text-box">
      <h3>Hi, I'm Ara</h3>
      <p>
        During these <strong>4 years</strong> as a <strong>Front-End Developer</strong>, my role has
        extended beyond coding to effective communication with various departments, to define new
        features, and spearhead the development of new apps.
      </p>
      <div class="actions">
        <button>Download CV</button>
        <RouterLink to="/experience"> See experiences </RouterLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.introduction-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .text-box {
    text-align: center;

    h3 {
      color: var(--vt-c-white);
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 2rem;
      @media (min-width: 1024px) {
        font-size: 75px;
      }
    }
    p {
      text-align: center;
      line-height: 30px;

      @media (min-width: 1024px) {
        text-align: start;
        line-height: 48px;
      }
    }
    strong {
      color: var(--vt-c-white);
    }

    .actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 3rem 0;

      @media (min-width: 1024px) {
        flex-direction: row;
        gap: 4rem;
      }
    }

    @media (min-width: 1024px) {
      text-align: start;
      width: 50%;
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 125px;

    @media (min-width: 1024px) {
      width: 360px;
      align-self: flex-start;
    }
  }
}
</style>
