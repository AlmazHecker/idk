export class KVGAnimator {
  static currentAnimation = null; // Store reference to the ongoing animation

  constructor(trigger, time = 1000) {
    this.time = time;
    this.setOnHover(trigger, time);
  }

  setOnHover(trigger, time) {
    [trigger].forEach((elem) => {
      elem.onmouseenter = () => {
        if (KVGAnimator.currentAnimation) {
          KVGAnimator.currentAnimation.cancel(); // Stop previous animation
        }
        const animate = new KVGAnimator(trigger, time);
        KVGAnimator.currentAnimation = animate; // Store new animation reference
        animate.play(elem);
      };
    });
  }

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

  hideAll() {
    this.paths.forEach((path, i) => {
      path.style.display = "none";
      if (this.numbers[i]) {
        this.numbers[i].style.display = "none";
      }
    });
  }

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

    this.interval = this.time / this.length;
    this.cancelled = false; // Add a cancellation flag

    this.doAnimation(path);
  }

  doAnimation(path) {
    const animate = () => {
      if (this.cancelled) return; // Stop animation if canceled
      if (this.length >= 0) {
        path.style.strokeDashoffset = this.length;
        this.length--;
        setTimeout(animate, this.interval);
      } else {
        this.count += 1;
        if (this.count < this.pathCount) {
          const newPath = this.paths[this.count];
          const newNumber = this.numbers[this.count];
          this.animatePath(newPath, newNumber);
        }
      }
    };

    animate();
  }

  cancel() {
    this.cancelled = true; // Set flag to stop animation
  }
}
