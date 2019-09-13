import React, { Component } from "react";
import "./ScreenNames.scss";
//import data from "../data.json";
import $ from "jquery";
import WorldMap from "./WorldMap";
import { getNeighbor } from "../Backend/GetJson";

export class ScreenNames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showText: true });
    }, 5000);

    getNeighbor().then(data => {
      data = data[0];

      // Neighborhood Name List

      var nameArray = [];
      for (let i = 0; i < data.children.length; i++) {
        for (let j = 0; j < data.children[i].children.length; j++) {
          for (let k = 0; k < data.children[i].children[j].names.length; k++) {
            nameArray.push(data.children[i].children[j].names[k]);
          }
        }
      }

      var attendeeArr = [];
      for (let i = 0; i < data.children.length; i++) {
        for (let j = 0; j < data.children[i].children.length; j++) {
          attendeeArr.push(data.children[i].children[j].attendee);
        }
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      // "use strict";
      $(document).ready(function() {
        const bod = document.getElementById("AttendeeNames");

        let dimx, dimy;
        let xGauche, xDroite, axe;
        let lstAnim = [];
        let present;
        let baseLine;
        let resettable; // to disable reset by click during animation

        // pour éviter de toujours écrire Math.
        const mrandom = Math.random;
        const mfloor = Math.floor;
        const mround = Math.round;
        const mabs = Math.abs;
        const mmin = Math.min;
        const mmax = Math.max;

        const mPI = Math.PI;
        const mPIS2 = Math.PI / 2;
        const m2PI = Math.PI * 2;
        const msin = Math.sin;
        const mcos = Math.cos;
        const matan2 = Math.atan2;

        const mhypot = Math.hypot;
        const msqrt = Math.sqrt;

        //----------------------------------------------------------------------------
        //----------------------------------------------------------------------------

        function Animable(texte, value, index) {
          var col = [
            "#1072ba",
            "white",
            "#642e92",
            "#93298e",
            "#1e1e1e",
            "cyan",
            "#1072ba",
            "white",
            "#642e92",
            "#93298e",
            "#1e1e1e",
            "cyan",
            "#1072ba",
            "white",
            "#642e92",
            "#93298e",
            "#1e1e1e",
            "cyan"
          ];

          let lediv = document.createElement("div");
          lediv.style.position = "absolute";
          // lediv.style.color = `#ffffff`;
          lediv.style.color = col[index];
          lediv.appendChild(document.createTextNode(texte));
          this.div = lediv;
          this.sty = lediv.style;
          //this.sty.fontWeight = "bold";
          this.sty.fontFamily = 'Georgia, "Times New Roman", Times, serif';
          this.sty.fontSize = "3em";
          this.sty.visibility = "hidden";
          this.sty.left = "-1000px"; // out of display window
          bod.appendChild(lediv);

          let st = window.getComputedStyle(lediv);
          this.largeur = parseFloat(st.width);
          this.demiLargeur = this.largeur / 2;
          this.hauteur = parseFloat(st.height);
          this.lBase = baseLine - this.hauteur;
          this.finalX = axe - this.demiLargeur; // suppose largeur constante
          this.value = value;
          this.texte = texte;
          this.lancerAnimation();
        } // Animable

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        Animable.prototype.lancerAnimation = function() {
          this.etatAnimation = 0;
          this.typeAnimation = alea(0, 3, true);
          if (this.texte === "Respectable Compromises") this.typeAnimation = 3;
          this.debut = present;

          switch (this.typeAnimation) {
            case 0:
              this.posXInit = mrandom() > 0.5 ? xGauche : xDroite;
              this.posXInit -= this.demiLargeur;
              this.posYInit = this.lBase;
              this.nRebond = alea(4, 10, true); // nb de rebonds
              this.hRebond = mmin(200 - 8 * this.nRebond, dimy / 5);
              this.lRebond = (this.finalX - this.posx) / this.nRebond;
              this.duree = alea(3000, 5000); // durée totale de l'animation
              this.animFunction = rebondir;
              break;
            case 1:
              this.posXInit = mrandom() > 0.5 ? xGauche : xDroite;
              this.posXInit -= this.demiLargeur;
              this.posYInit = this.lBase;
              this.nRadians = alea(4, 20, true); // angle de rotation total
              this.duree = alea(3000, 5000); // durée totale de l'animation
              this.sty.top = this.posYInit + "px";
              this.animFunction = rebondir;
              break;
            case 2:
              this.posXInit = mrandom() > 0.5 ? xGauche : xDroite;
              this.posXInit -= this.demiLargeur;
              this.posYInit = this.lBase;
              this.duree = alea(3000, 5000); // durée totale de l'animation
              this.hChute = this.posYInit;
              this.animFunction = tomber;
              break;
            case 3:
              this.posXInit = mrandom() > 0.5 ? xGauche : xDroite;
              this.posXInit -= this.demiLargeur;
              this.posYInit = this.lBase;
              this.duree = alea(1000, 3000); // durée totale de l'animation
              this.sty.top = this.posYInit + "px";
              // fills a table with positions of succesive bouncings

              this.billard = []; // positions des rebonds
              this.billard.unshift([axe - this.demiLargeur, this.posYInit, 0]); //
              let cote = 2; // final side
              let sens = alea(0, 2, true);
              let nbPoints = alea(3, 10, true);
              let ltotale = 0; // total length of path

              for (let k = 1; k < nbPoints; ++k) {
                //
                let xpos = alea(0, dimx - this.largeur);
                let ypos = alea(0, dimy - this.hauteur - 5);
                switch (cote) {
                  case 0:
                    ypos = 0;
                    break;
                  case 1:
                    xpos = dimx - this.tomber;
                    break;
                  case 2:
                    ypos = dimy - this.hauteur - 5;
                    break;
                  case 3:
                    xpos = 0;
                    break;
                } // switch (cote)
                ltotale += mhypot(
                  xpos - this.billard[0][0],
                  ypos - this.billard[0][1]
                );
                this.billard.unshift([xpos, ypos, ltotale]); // previous point
                cote += sens == 0 ? 1 : 3; // previous side
                cote %= 4; // to stay in 0..3
              }
              this.ltotale = ltotale;
              this.animFunction = billard;
              break;
          } // switch
        }; //

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        Animable.prototype.animer = function() {
          let ecoule = present - this.tStart;
          let y;
          switch (this.etatAnimation) {
            case 0: // attente
              if (present < this.tStart) return;
              ++this.etatAnimation;
              this.animFunction(this, ecoule);
              this.sty.visibility = "visible";
              break;

            case 1: // animation particulière
              this.animFunction(this, ecoule);
              break;

            case 2: // remontée finale
              y = this.posYInit - 0.08 * ecoule;
              if (this.value == nameArray.length && y < this.posYInit / 2) {
                y = this.posYInit / 2; // maintien message final
              }
              this.sty.top = y + "px";
              if (y < -this.hauteur - 5) {
                // fini : suicide
                bod.removeChild(this.div);
                ++this.etatAnimation; // on ne fait plus rien
                if (this.value == 100) resettable = true;
              }
          } // switch (this.etatAnimation)
        }; //

        // fin de la classe Animable

        //----------------------------------------------------------------------------

        function rebondir(anim, ecoule) {
          /*  fonction qui gère un déplacement horizontal avec rebondissement
           */
          let x, y;
          let alpha = ecoule / anim.duree;
          if (alpha >= 1) {
            ++anim.etatAnimation;
            anim.tStart += anim.duree;
            anim.sty.left = anim.finalX + "px";
            return;
          }
          x = (1 - alpha) * anim.posXInit + alpha * anim.finalX;
          anim.sty.left = x + "px";

          alpha *= anim.nRebond;
          alpha -= mfloor(alpha);
          y = alpha * (1 - alpha) * 4 * anim.hRebond;
          anim.sty.top = anim.posYInit - y + "px";
        } // rebondir

        //----------------------------------------------------------------------------

        function tournoyer(anim, ecoule) {
          /*  fonction qui gère un déplacement horizontal avec tournoiement
           */
          let x, y;
          let alpha = ecoule / anim.duree;
          if (alpha >= 1) {
            ++anim.etatAnimation;
            anim.tStart += anim.duree;
            anim.sty.transform = "";
            anim.sty.left = anim.finalX + "px";
            return;
          }

          x = (1 - alpha) * anim.posXInit + alpha * anim.finalX;
          anim.sty.left = x + "px";

          anim.sty.transform = `scaleX(${Math.cos(
            (1 - alpha) * anim.nRadians
          )})`;
        } // tournoyer

        //----------------------------------------------------------------------------

        function tomber(anim, ecoule) {
          /*  fonction qui gère un déplacement horizontal avec chute
           */
          let x, y;
          let alpha = ecoule / anim.duree;
          if (alpha >= 1) {
            ++anim.etatAnimation;
            anim.tStart += anim.duree;
            anim.sty.left = anim.finalX + "px";
            return;
          }
          x = (1 - alpha) * anim.posXInit + alpha * anim.finalX;
          anim.sty.left = x + "px";

          y = anim.posYInit - (1 - alpha * alpha) * anim.hChute;
          anim.sty.top = y + "px";
        } // tomber

        //----------------------------------------------------------------------------

        function billard(anim, ecoule) {
          /*  fonction qui gère un déplacement avec 'rebonds' sur les bords
           */
          let x, y;
          let alpha = ecoule / anim.duree;
          if (alpha >= 1) {
            ++anim.etatAnimation;
            anim.tStart += anim.duree;
            anim.sty.left = anim.finalX + "px";
            return;
          }

          let posit = (1 - alpha) * this.ltotale;
          // find out in which interval we are in this.billard
          let k = 1;
          while (anim.billard[k][2] > posit) ++k;
          // interpolate between anim.billard[k-1] and anim.billard[k]
          let a1 = posit - anim.billard[k - 1][2];
          let a2 = anim.billard[k][2] - posit;
          let a = a1 + a2;

          x = (a2 * anim.billard[k - 1][0] + a1 * anim.billard[k][0]) / a;
          anim.sty.left = x + "px";

          y = (a2 * anim.billard[k - 1][1] + a1 * anim.billard[k][1]) / a;
          anim.sty.top = y + "px";
        } // billard

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        function alea(mini, maxi, entier) {
          // entrée : mini et maxi nombres, avec maxi > mini (non vérifié)
          // rend un nombre théoriquement entre mini inclus et maxi exclus
          // si 'entier' absent ou == false :
          //   rend un flottant
          // si 'entier' == true
          //   mini et maxi doivent être des entiers
          //   la valeur rendue est entière
          let x = mini + mrandom() * (maxi - mini);
          if (entier) return mfloor(x);
          return x;
        }

        //----------------------------------------------------------------------------
        //----------------------------------------------------------------------------
        function dimensionner() {
          dimx = window.innerWidth;
          dimy = window.innerHeight;
          axe = dimx / 2;
          xGauche = -100;
          xDroite = dimx + 100;
          baseLine = dimy - 40;
        } // dimensionner

        //----------------------------------------------------------------------------
        function enchainerAnim() {
          let deltat;
          present = performance.now();
          if (lstAnim.length > 0) {
            lstAnim.forEach((animable, idx) => {
              animable.animer();
              if (animable.etatAnimation > 2) {
                lstAnim.splice(idx, 1);
              }
            }); //
          }
          deltat = performance.now() - present;
          setTimeout(enchainerAnim, 1);
        } // enchainerAnim
        //----------------------------------------------------------------------------
        //----------------------------------------------------------------------------
        function relancer() {
          let texte;
          let tRef;
          let tStart1;
          let anim;
          let intervalle = 800; // ms entre 2 nombres

          // on efface les div à l'écran
          if (lstAnim.length > 0) {
            lstAnim.forEach(anim => {
              bod.removeChild(anim.div);
            });
            lstAnim = [];
          }

          //  bod.innerHTML = ''; // nettoyage rapide;
          dimensionner();

          var num = 1;
          var index = 0;

          for (let i = 0; i < attendeeArr.length; i++) {
            for (let k = num; k < num + attendeeArr[i]; k++) {
              texte = nameArray[k - 1];
              if (k == nameArray.length) texte = "Respectable Compromises";
              anim = new Animable(texte, k, index);
              lstAnim.push(anim);
              if (k == 1) {
                tStart1 = performance.now();
                tRef = tStart1 + anim.duree;
                anim.tStart = tStart1;
              } else {
                anim.tStart = tRef + (k - 1) * intervalle - anim.duree;
              }
            }

            // if (i == attendeeArr.length - 1) break;

            num += attendeeArr[i];
            index++;
          }
        } //

        //----------------------------------------------------------------------------
        function clickCanvas() {
          if (!resettable) return;
          dimensionner();
          relancer();
          resettable = false;
        }
        //----------------------------------------------------------------------------

        bod.addEventListener("click", clickCanvas);
        lstAnim = [];
        enchainerAnim();
        dimensionner();
        relancer();
      });
    }); // window load listener
  }

  render() {
    return (
      <div>
        <div id="AttendeeNames" />
        <WorldMap />
      </div>
    );
  }
}

export default ScreenNames;
