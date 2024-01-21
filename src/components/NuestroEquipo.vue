<template>
  <!-- Services Start -->
  <section class="services">
    <template v-if="activo">
      <div class="title text-center">
        <h2
          class="title-blue"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          Equipo actual
        </h2>
      </div>
      <div class="row">
      <template v-for="team in equipo" :key="team.id">
        <div clasS="col-md-4 col-sm-6">
        <div class="cardequip" data-state="#about">
          <div class="card-header2">
            <div
              class="card-cover"
              :style="{'background-color': team.color}"
            ></div>
            <img class="card-avatar" :src="team.mini" alt="avatar" />
            <h2 class="card-fullname">{{ team.nombre }}</h2>
            <h3 class="card-jobtitle">{{ team.titulo }}</h3>
          </div>
          <div class="card-main">
            <div class="card-section is-active" id="about">
              <div class="card-content">
                <div class="card-subtitle">INFO</div>
                <p class="card-desc">{{ team.presentacion }}</p>
              </div>

              <template v-if="!team.whatsapp || !team.mail">
                <div class="card-social">
                  <a
                    v-if="team.whatsapp"
                    rel="nofollow noopener noreferrer"
                    :href="'https://wa.me/54' + team.whatsapp"
                    target="_blank"
                    ><i class="fab fa-whatsapp"></i
                  ></a>
                  <a
                    v-if="team.mail"
                    rel="nofollow noopener noreferrer"
                    :href="'mailto:' + team.mail"
                    target="_blank"
                    ><i class="fas fa-envelope"></i
                  ></a>
                </div>
              </template>
            </div>
            <div class="card-buttons">
              <a :href="team.slug" data-section="#about" target="_blank"
                >PORTFOLIO</a
              >
            </div>
          </div>
        </div>
        </div>
      </template>
      </div>
    </template>
    <template v-else>
      <div class="title text-center">
        <h2
          class="title-blue"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          Estamos actualizando los datos
        </h2>
        <svg width="205" height="120">
          <path
            class="path"
            d="M 100.16623,51.415329 C 106.74946,45.082085 113.08279,39.707091 119.16623,35.290329 C 125.24945,30.790433 130.37444,27.790436 134.54123,26.290329 C 138.70777,24.790439 143.24943,24.04044 148.16623,24.040329 C 158.49941,24.04044 166.83274,27.498769 173.16623,34.415329 C 179.58273,41.248756 182.79106,49.540414 182.79123,59.290329 C 182.79106,65.957064 181.37439,72.123725 178.54123,77.790329 C 175.70773,83.457047 171.66607,87.748709 166.41623,90.665329 C 161.24941,93.582037 155.29108,95.040369 148.54123,95.040329 C 139.7911,95.040369 132.12444,93.16537 125.54123,89.415329 C 119.04112,85.665378 110.58279,78.582052 100.16623,68.165329 C 89.332815,78.915385 80.707824,86.082044 74.291229,89.665329 C 67.874504,93.248704 60.416178,95.040369 51.916229,95.040329 C 41.082864,95.040369 32.624539,91.665372 26.541229,84.915329 C 20.541218,78.165385 17.541221,69.623727 17.541229,59.290329 C 17.541221,49.623747 20.707884,41.332089 27.041229,34.415329 C 33.457871,27.498769 41.832863,24.04044 52.166229,24.040329 C 57.166181,24.04044 61.74951,24.790439 65.916229,26.290329 C 70.082835,27.790436 75.166163,30.790433 81.166229,35.290329 C 87.249484,39.707091 93.582811,45.082085 100.16623,51.415329 M 108.29123,59.165329 C 117.12445,67.915396 124.37445,73.873723 130.04123,77.040329 C 135.7911,80.123717 141.49943,81.665382 147.16623,81.665329 C 154.24942,81.665382 159.79108,79.582051 163.79123,75.415329 C 167.79107,71.165392 169.79107,66.040398 169.79123,60.040329 C 169.79107,53.457077 167.79107,48.040416 163.79123,43.790329 C 159.87441,39.457091 154.66608,37.290426 148.16623,37.290329 C 144.49943,37.290426 140.95776,37.957092 137.54123,39.290329 C 134.12444,40.540423 130.04111,42.790421 125.29123,46.040329 C 120.54112,49.207081 114.87446,53.582077 108.29123,59.165329 M 92.041229,59.165329 C 86.041152,54.082076 80.666157,49.915414 75.916229,46.665329 C 71.166167,43.332087 66.999504,40.957089 63.416229,39.540329 C 59.832845,38.123759 55.916182,37.415426 51.666229,37.415329 C 45.582859,37.415426 40.541198,39.540424 36.541229,43.790329 C 32.541206,48.040416 30.541208,53.457077 30.541229,60.040329 C 30.541208,64.623732 31.582873,68.498728 33.666229,71.665329 C 35.749536,74.832055 38.2912,77.290386 41.291229,79.040329 C 44.374527,80.790383 48.207857,81.665382 52.791229,81.665329 C 58.791179,81.665382 64.624507,80.08205 70.291229,76.915329 C 75.957829,73.748723 83.207822,67.832062 92.041229,59.165329"
          />
        </svg>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      equipo: [],
      activo: false,
    };
  },
  async created() {
    // const isProd = import.meta.env.PROD;
    // if (isProd) {
      const response = await fetch(
        "https://manejoweb.com.ar/api.php?get_equipo=1"
      );
      const response2 = await fetch(
        "https://manejoweb.com.ar/api.php?get_equipo_activo=1"
      );
      this.equipo = await response.json();
      this.activo = await response2.json();
    // }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500|Jost:400,500,600&display=swap");
svg {
  display: inline-block;
  vertical-align: middle;
}

path {
  stroke: cyan;
  stroke-width: 6;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 193.904983521;
  fill: none;
  animation: load 4s linear infinite, color 3s linear infinite;
}

@keyframes load {
  from {
    stroke-dashoffset: 775.6199340820312;
  }
}

@keyframes color {
  33% {
    stroke: yellow;
  }
  66% {
    stroke: magenta;
  }
}

body {
  color: #2b2c48;
  font-family: "Jost", sans-serif;
  background-color: #f1f2f7;
  flex-wrap: wrap;
}

.cardequip {
  max-width: 340px;
  margin: auto;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  background-color: white;
  display: flex;
  transition: 0.3s;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.2);
}

.cardequip[data-state="#about"] {
  height: 500px;
}
.cardequip[data-state="#about"] .card-main {
  padding-top: 0;
}

.cardequip[data-state="#contact"] {
  height: 430px;
}

.cardequip[data-state="#experience"] {
  height: 550px;
}

.cardequip.is-active .card-header2 {
  height: 80px;
}
.cardequip.is-active .card-cover {
  height: 100px;
  top: -50px;
}
.cardequip.is-active .card-avatar {
  transform: none;
  left: 20px;
  width: 50px;
  height: 50px;
  bottom: 10px;
}
.cardequip.is-active .card-fullname,
.cardequip.is-active .card-jobtitle {
  left: 86px;
  transform: none;
}
.cardequip.is-active .card-fullname {
  bottom: 18px;
  font-size: 19px;
}
.cardequip.is-active .card-jobtitle {
  bottom: 16px;
  letter-spacing: 1px;
  font-size: 10px;
}

.card-header2 {
  position: relative;
  display: flex;
  height: 200px;
  flex-shrink: 0;
  width: 100%;
  transition: 0.3s;
}
.card-header2 * {
  transition: 0.3s;
}

.card-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  height: 160px;
  top: -20%;
  left: 0;
  will-change: top;
  background-size: cover;
  background-position: center;
  filter: blur(30px);
  transform: scale(1.2);
  transition: 0.5s;
}

.card-avatar {
  width: 100px;
  height: 100px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  -o-object-position: center;
  object-position: center;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-64px);
}

.card-fullname {
  position: absolute;
  bottom: 0;
  font-family: "Jost", sans-serif;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  transform: translateY(-10px) translateX(-50%);
  left: 50%;
}

.card-jobtitle {
  position: absolute;
  bottom: -15px;
  font-family: "Jost", sans-serif;
  font-size: 11px;
  white-space: nowrap;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-7px);
}

.card-main {
  position: relative;
  flex: 1;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
}

.card-subtitle {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
}

.card-content {
  padding: 20px;
}

.card-desc {
  line-height: 1.6;
  color: #636b6f;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  font-family: "DM Sans", sans-serif;
}

.card-social {
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px;
}
.card-social svg {
  fill: #a5b5ce;
  width: 16px;
  display: block;
  transition: 0.3s;
}
.card-social a {
  color: #8797a1;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  background-color: rgba(93, 133, 193, 0.05);
  border-radius: 50%;
  margin-right: 10px;
}
.card-social a:hover svg {
  fill: #637faa;
}
.card-social a:last-child {
  margin-right: 0;
}

.card-buttons {
  display: flex;
  background-color: #fff;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  left: 0;
}
.card-buttons a {
  flex: 1 1 auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: 0;
  font-size: 13px;
  border: 0;
  padding: 15px 5px;
  cursor: pointer;
  color: #5c5c6d;
  transition: 0.3s;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  outline: 0;
  border-bottom: 3px solid transparent;
  text-align: center;
}
.card-buttons a.is-active,
.card-buttons a:hover {
  color: #2b2c48;
  border-bottom: 3px solid #8a84ff;
  background: linear-gradient(
    to bottom,
    rgba(127, 199, 231, 0) 0%,
    rgba(207, 204, 255, 0.2) 44%,
    rgba(211, 226, 255, 0.4) 100%
  );
}

.card-section {
  display: none;
}
.card-section.is-active {
  margin-top: 15px;
  display: block;
  -webkit-animation: fadeIn 0.6s both;
  animation: fadeIn 0.6s both;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translatey(40px);
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translatey(40px);
  }
  100% {
    opacity: 1;
  }
}
.card-timeline {
  margin-top: 30px;
  position: relative;
}
.card-timeline:after {
  background: linear-gradient(to top, rgba(134, 214, 243, 0) 0%, #516acc 100%);
  content: "";
  left: 42px;
  width: 2px;
  top: 0;
  height: 100%;
  position: absolute;
  content: "";
}

.card-item {
  position: relative;
  padding-left: 60px;
  padding-right: 20px;
  padding-bottom: 30px;
  z-index: 1;
}
.card-item:last-child {
  padding-bottom: 5px;
}
.card-item:after {
  content: attr(data-year);
  width: 10px;
  position: absolute;
  top: 0;
  left: 37px;
  width: 8px;
  height: 8px;
  line-height: 0.6;
  border: 2px solid #fff;
  font-size: 11px;
  text-indent: -35px;
  border-radius: 50%;
  color: rgba(134, 134, 134, 0.7);
  background: linear-gradient(to bottom, #a0aee3 0%, #516acc 100%);
}

.card-item-title {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
}

.card-item-desc {
  font-size: 13px;
  color: #6f6f7b;
  line-height: 1.5;
  font-family: "DM Sans", sans-serif;
}

.card-contact-wrapper {
  margin-top: 20px;
}

.card-contact {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #6f6f7b;
  font-family: "DM Sans", sans-serif;
  line-height: 1.6;
  cursor: pointer;
}
.card-contact + .card-contact {
  margin-top: 16px;
}
.card-contact svg {
  flex-shrink: 0;
  width: 30px;
  min-height: 34px;
  margin-right: 12px;
  transition: 0.3s;
  padding-right: 12px;
  border-right: 1px solid #dfe2ec;
}

.contact-me {
  border: 0;
  outline: none;
  background: linear-gradient(
    to right,
    rgba(83, 200, 239, 0.8) 0%,
    rgba(81, 106, 204, 0.8) 96%
  );
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  color: #fff;
  padding: 12px 16px;
  width: 100%;
  border-radius: 5px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: "Jost", sans-serif;
  transition: 0.3s;
}

/* Color Selector */
.color-select-container {
  display: block;
  overflow: auto;
}

.color-select-left {
  width: 25%;
  overflow: auto;
}

.color-select-right {
  width: 72%;
  overflow: auto;
}

@media only screen and (max-width: 768px) {
  .color-select-left {
    width: 100%;
    overflow: auto;
    padding-bottom: 15px;
  }

  .color-select-right {
    width: 100%;
    overflow: auto;
  }
}

.color-block-container {
  overflow: auto;
}

.color-block {
  width: 11.1%;
  padding-top: 11.1%;
  display: block;
  float: left;
  cursor: pointer;
}

.block-clear {
  clear: both;
}

.color-block-select-container {
  width: 100%;
  display: block;
  overflow: hidden;
  margin-bottom: 20px;
}

@media only screen and (max-width: 768px) {
  .color-block-select-container {
    width: 130px;
    display: block;
    overflow: auto;
    margin-bottom: 10px;
    float: left;
  }
}

.color-block-select {
  width: 42px;
  height: 42px;
  display: block;
  cursor: pointer;
  border-radius: 60px;
}

.color-select-label {
  color: rgba(0, 0, 0, 0.3);
  font-family: "Rubik", sans-serif;
  font-size: 80%;
  font-weight: 500;
  left: 50px;
  top: 12px;
  position: relative;
}

#primaryselect {
  border: 2px solid #b2b2b2;
  background-color: #e5e5e5;
}
#primaryselect_e {
  border: 2px solid #b2b2b2;
  background-color: #e5e5e5;
}
#primarygrid {
  display: block;
}

.toggle-btn {
  width: 80px;
  height: 40px;
  margin: 10px;
  border-radius: 50px;
  display: inline-block;
  position: relative;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4T42TaxHCQAyENw5wAhLACVUAUkABOCkSwEkdhNmbpHNckzv689L98toIAKjqGcAFwElEFr5ln6ruAMwA7iLyFBM/TPDuQSrxwf6fCKBoX2UMIYGYkg8BLOnVg2RiAEexGaQQq4w9e9klcxGLLAUwgDAcihlYAR1IvZA1sz/+AAaQjXhTQQVoe2Yo3E7UQiT2ijeQdojRtClOfVKvMVyVpU594kZK9zzySWTlcNqZY9tjCsUds00+A57z1e35xzlzJjee8xf0HYp+cOZQUQAAAABJRU5ErkJggg==")
    no-repeat 50px center #e74c3c;
  cursor: pointer;
  -webkit-transition: background-color 0.4s ease-in-out;
  -moz-transition: background-color 0.4s ease-in-out;
  -o-transition: background-color 0.4s ease-in-out;
  transition: background-color 0.4s ease-in-out;
  cursor: pointer;
}
.toggle-btn.active {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4T6WT0RWDMAhFeZs4ipu0mawZpaO4yevBc6hUIWLNd+4NeQDk5sE/PMkZwFvZywKSTxF5iUgH0C4JHGyF97IggFVSqyCFga0CvQSg70Mdwd8QSSr4sGBMcgavAgdvwQCtApvA2uKr1x7Pu++06ItrF5LXPB/CP4M0kKTwYRIDyRAOR9lJTuF0F0hOAJbKopVHOZN9ACS0UgowIx8ZAAAAAElFTkSuQmCC")
    no-repeat 10px center #2ecc71;
}
.toggle-btn.active .round-btn {
  left: 45px;
}
.toggle-btn .round-btn {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -15px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.toggle-btn .cb-value {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 9;
  cursor: pointer;
}
</style>