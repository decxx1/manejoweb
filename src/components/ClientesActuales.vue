<template>
  <section class="services">
    <div class="title text-center">
      <h2
        class="title-blue"
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        Clientes Actuales
      </h2>
    </div>

    <template v-if="clientes">
      <div class="display">
        <template v-for="cliente in clientes" :key="cliente.id">
          <div class="display-item">
            <div class="profile-card js-profile-card">
              <div class="profile-card__img">
                <img :src="cliente.imagen" alt="profile card" />
              </div>

              <div class="profile-card__cnt js-profile-cnt">
                <div class="profile-card__name">{{ cliente.titulo }}</div>
                <div class="profile-card__txt">{{ cliente.subtitulo }}</div>
                <div class="profile-card-loc">
                  <span class="profile-card-loc__icon">
                    <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                  </span>

                  <span class="profile-card-loc__txt">
                    {{ cliente.direccion }} <br />{{ cliente.provincia }}
                  </span>
                </div>

                <div class="profile-card-social">
                  <a
                    v-if="cliente.facebook"
                    rel="nofollow noopener noreferrer"
                    :href="cliente.facebook"
                    class="profile-card-social__item facebook"
                    target="_blank"
                  >
                    <span class="icon-font">
                      <i class="fab fa-facebook-f" aria-hidden="true"></i>
                    </span>
                  </a>

                  <a
                    v-if="cliente.instagram"
                    rel="nofollow noopener noreferrer"
                    :href="cliente.instagram"
                    class="profile-card-social__item instagram"
                    target="_blank"
                  >
                    <span class="icon-font">
                      <i class="fab fa-instagram" aria-hidden="true"></i>
                    </span>
                  </a>

                  <a
                    v-if="cliente.whatsapp"
                    rel="nofollow noopener noreferrer"
                    :href="'https://wa.me/54' + cliente.whatsapp"
                    class="profile-card-social__item whatsapp"
                    target="_blank"
                  >
                    <span class="icon-font">
                      <i class="fab fa-whatsapp" aria-hidden="true"></i>
                    </span>
                  </a>
                  <a
                    v-if="cliente.mail"
                    rel="nofollow noopener noreferrer"
                    :href="'mailto:' + cliente.mail"
                    class="profile-card-social__item link"
                    target="_blank"
                  >
                    <span class="icon-font">
                      <i class="fas fa-envelope" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>

                <div v-if="cliente.web" class="profile-card-ctr">
                  <a
                    rel="nofollow noopener noreferrer"
                    :href="'//' + cliente.web"
                    class="profile-card__button button--blue js-message-btn"
                    target="_blank"
                    >{{ cliente.web }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  data() {
      return {
          clientes:[] 
      }
  },
  async created() {
    // const isProd = import.meta.env.PROD;
    // if (isProd) {
    const response = await fetch(
      "https://manejoweb.com.ar/api.php?get_clientes=1"
    );
    this.clientes = await response.json();
    
    // }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,700&subset=latin-ext");



* {
  box-sizing: border-box;
}

.icon22 {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: #fff;
  fill: #fff;
}

.containercard {
  width: 1600px;
  max-width: 100%;
  margin: auto;
}
@media screen and (max-width: 768px) {
  .wrapper22 {
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
  }
}
.display {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top:100px;
}
.display .display-item {
  flex-grow: 1;
  flex-basis: 1px;
  display: flex;
  justify-content: space-around;
  padding: 15px;
  max-width: 100%;
  margin-top: 70px;
}
.profile-card {
  width: 400px;
  max-width: 100%;
  min-height: 460px;
  margin: auto 25px;
  box-shadow: 0px 8px 60px -10px rgba(13, 28, 39, 0.6);
  background: #fff;
  border-radius: 12px;
  position: relative;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
}
.profile-card.active .profile-card__cnt {
  filter: blur(6px);
}
.profile-card.active .profile-card-message,
.profile-card.active .profile-card__overlay {
  opacity: 1;
  pointer-events: auto;
  transition-delay: 0.1s;
}
.profile-card.active .profile-card-form {
  transform: none;
  transition-delay: 0.1s;
}
.profile-card__img {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  transform: translateY(-50%);
  overflow: hidden;
  position: relative;
  z-index: 4;
}
@media screen and (max-width: 576px) {
  .profile-card__img {
    width: 250px;
  }
}
.profile-card__img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-card__cnt {
  margin-top: -35px;
  text-align: center;
  padding: 0 20px;
  padding-bottom: 40px;
  transition: all 0.3s;
}
.profile-card__name {
  font-weight: 700;
  font-size: 24px;
  color: var(--my-color);
  margin-bottom: 15px;
}
.profile-card__txt {
  font-size: 18px;
  font-weight: 500;
  color: #324e63;
  margin-bottom: 15px;
}
.profile-card__txt strong {
  font-weight: 700;
}
.profile-card-loc {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}
.profile-card-loc__icon {
  display: inline-flex;
  font-size: 27px;
  margin-right: 10px;
}
.profile-card-inf {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 35px;
}
.profile-card-inf__item {
  padding: 10px 35px;
  min-width: 150px;
}
@media screen and (max-width: 768px) {
  .profile-card-inf__item {
    padding: 10px 20px;
    min-width: 120px;
  }
}
.profile-card-inf__title {
  font-weight: 700;
  font-size: 27px;
  color: #324e63;
}
.profile-card-inf__txt {
  font-weight: 500;
  margin-top: 7px;
}
.profile-card-social {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.profile-card-social__item {
  display: inline-flex;
  width: 55px;
  height: 55px;
  margin: 15px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #405de6;
  box-shadow: 0px 7px 30px rgba(43, 98, 169, 0.5);
  position: relative;
  font-size: 21px;
  flex-shrink: 0;
  transition: all 0.3s;
}
.profile-card-social a, .profile-card-social a:hover {
  text-decoration: none;
  color:#fff;
}
.icon-font i:hover {
	color:#fff;
}
@media screen and (max-width: 768px) {
  .profile-card-social__item {
    width: 50px;
    height: 50px;
    margin: 10px;
  }
}
@media screen and (min-width: 768px) {
  .profile-card-social__item:hover {
    transform: scale(1.2);
  }
}
.profile-card-social__item.facebook {
  background: linear-gradient(45deg, #3b5998, #0078d7);
  box-shadow: 0px 4px 30px rgba(43, 98, 169, 0.5);
}
.profile-card-social__item.twitter {
  background: linear-gradient(45deg, #1da1f2, #0e71c8);
  box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.7);
}
.profile-card-social__item.instagram {
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  box-shadow: 0px 4px 30px rgba(120, 64, 190, 0.6);
}
.profile-card-social__item.whatsapp {
  background: linear-gradient(0deg, #00B100, #09db09);
  box-shadow: 0px 4px 30px rgba(55, 75, 90, 0.6);
}
.profile-card-social__item.link {
  background: linear-gradient(45deg, #d5135a, #f05924);
  box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.6);
}
.profile-card-social .icon-font {
  display: inline-flex;
}
.profile-card-ctr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
@media screen and (max-width: 576px) {
  .profile-card-ctr {
    flex-wrap: wrap;
  }
}
.profile-card__button {
  background: none;
  border: none;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 14px;
  margin: 15px 35px;
  padding: 15px 5px;
  width: 100%;
  border-radius: 50px;
  min-height: 55px;
  color: #fff;
  cursor: pointer;
  backface-visibility: hidden;
  transition: all 0.3s;
  word-wrap: break-word;
}
.profile-card__button:hover {
	text-decoration: none;
	color:#fff;
}
@media screen and (max-width: 768px) {
  .profile-card__button {
    min-width: 170px;
    margin: 15px 25px;
  }
}
@media screen and (max-width: 576px) {
  .profile-card__button {
    min-width: inherit;
    margin: 0;
    margin-bottom: 16px;
    width: 100%;
    max-width: 300px;
  }
  .profile-card__button:last-child {
    margin-bottom: 0;
  }
}
.profile-card__button:focus {
  outline: none !important;
}
@media screen and (min-width: 768px) {
  .profile-card__button:hover {
    transform: translateY(-5px);
  }
}
.profile-card__button:first-child {
  margin-left: 0;
}
.profile-card__button:last-child {
  margin-right: 0;
}
.profile-card__button.button--blue {
  background: linear-gradient(45deg, #1da1f2, #0e71c8);
  box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.4);
}
.profile-card__button.button--blue:hover {
  box-shadow: 0px 7px 30px rgba(19, 127, 212, 0.75);
}
.profile-card__button.button--orange {
  background: linear-gradient(45deg, #d5135a, #f05924);
  box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.35);
}
.profile-card__button.button--orange:hover {
  box-shadow: 0px 7px 30px rgba(223, 45, 70, 0.75);
}
.profile-card__button.button--gray {
  box-shadow: none;
  background: #dcdcdc;
  color: #142029;
}
.profile-card-message {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 130px;
  padding-bottom: 100px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
.profile-card-form {
  box-shadow: 0 4px 30px rgba(15, 22, 56, 0.35);
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 35px;
  transform: scale(0.8);
  position: relative;
  z-index: 3;
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  .profile-card-form {
    max-width: 90%;
    height: auto;
  }
}
@media screen and (max-width: 576px) {
  .profile-card-form {
    padding: 20px;
  }
}
.profile-card-form__bottom {
  justify-content: space-between;
  display: flex;
}
@media screen and (max-width: 576px) {
  .profile-card-form__bottom {
    flex-wrap: wrap;
  }
}
.profile-card textarea {
  width: 100%;
  resize: none;
  height: 210px;
  margin-bottom: 20px;
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  padding: 15px 20px;
  color: #324e63;
  font-weight: 500;
  font-family: "Quicksand", sans-serif;
  outline: none;
  transition: all 0.3s;
}
.profile-card textarea:focus {
  outline: none;
  border-color: #8a979e;
}
.profile-card__overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  background: rgba(22, 33, 72, 0.35);
  border-radius: 12px;
  transition: all 0.3s;
}
.profile-card-loc__txt {
  white-space: nowrap;
}
</style>