export class KVGAnimator {
  constructor(trigger, time = 1000) {
    // Default time is now 1000ms (1 second)
    this.time = time;
    this.setOnHover(trigger, time);
  }

  /**
   * Add onhover function to triggers.
   *
   * @param {string} trigger
   * @param {number} time
   */
  setOnHover(trigger, time) {
    [trigger].forEach((elem) => {
      elem.onmouseenter = () => {
        const animate = new KVGAnimator(trigger, time);
        animate.play(elem);
      };
    });
  }

  /**
   * Initiate the animation.
   *
   * @param {element} trigger
   */
  play(svg) {
    if (
      !svg ||
      svg.tagName !== "svg" ||
      svg.querySelectorAll("path").length <= 0
    ) {
      return;
    }

    this.paths = svg.querySelectorAll("path");
    this.numbers = svg.querySelectorAll("text");
    this.pathCount = this.paths.length;

    this.hideAll();
    this.count = 0;

    const path = this.paths[this.count];
    const number = this.numbers[this.count];

    this.animatePath(path, number);
  }

  /**
   * Hide paths and numbers before animation.
   */
  hideAll() {
    this.paths.forEach((path, i) => {
      path.style.display = "none";
      if (this.numbers[i]) {
        this.numbers[i].style.display = "none";
      }
    });
  }

  /**
   * Prepare for animation and call animation function.
   *
   * @param {element} path
   * @param {element} number
   */
  animatePath(path, number) {
    this.length = path.getTotalLength();

    path.style.display = "block";
    if (number) {
      number.style.display = "block";
    }

    path.style.transition = path.style.WebkitTransition = "none";
    path.style.strokeDasharray = `${this.length} ${this.length}`;
    path.style.strokeDashoffset = this.length;

    path.getBoundingClientRect(); // Trigger layout

    this.interval = this.time / this.length; // Calculate the delay per frame

    this.doAnimation(path);
  }

  /**
   * Do the animation.
   *
   * @param {path} path
   */
  doAnimation(path) {
    const animate = () => {
      if (this.length >= 0) {
        path.style.strokeDashoffset = this.length;
        this.length--;
        setTimeout(animate, this.interval); // Use setTimeout with the calculated interval
      } else {
        this.count += 1;
        if (this.count < this.pathCount) {
          const newPath = this.paths[this.count];
          const newNumber = this.numbers[this.count];
          this.animatePath(newPath, newNumber);
        }
      }
    };

    animate(); // Start the animation
  }
}
